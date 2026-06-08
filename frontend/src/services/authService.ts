import { jwtDecode } from "jwt-decode";
import { API_URL } from "../services/api";
import type { JwtPayload, LoginApiResponse, LoginCredentials, LoginResult, RoleId } from "../types/auth.types";
import { ROLES, ROLE_MAP } from "../types/auth.types";

export const TOKEN_KEY = "fitmanager_token" as const;
const NOME_KEY = "fitmanager_nome" as const;

export const DASHBOARD_BY_ROLE: Record<RoleId, string> = {
  [ROLES.ADMIN]: "/admin-dashboard",
  [ROLES.INSTRUTOR]: "/instrutor-dashboard",
  [ROLES.ALUNO]: "/aluno-dashboard",
};

export { ROLES };

function notifyTokenChange(): void {
  window.dispatchEvent(new Event("fitmanager_token_changed"));
}

export function saveToken(token: string, nome: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NOME_KEY, nome);  // persiste o nome junto
  notifyTokenChange();
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NOME_KEY);
  notifyTokenChange();
}

export function getCurrentUser(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<Record<string, unknown>>(token);

    const now = Date.now() / 1000;
    if (decoded.exp && (decoded.exp as number) < now) {
      removeToken();
      return null;
    }

    const perfil = decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] as keyof typeof ROLE_MAP;

    const email = decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ] as string;

    const id = Number(
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );

    const nome = localStorage.getItem(NOME_KEY) ?? "";

    return {
      id,
      nome,
      email,
      perfil,
      id_cargo: ROLE_MAP[perfil],
      exp: decoded.exp as number | undefined,
      iat: decoded.iat as number | undefined,
    };
  } catch {
    removeToken();
    return null;
  }
}

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(error.message ?? "Credenciais inválidas.");
  }

  const data = (await response.json()) as LoginApiResponse;

  saveToken(data.token, data.nomeCompleto);

  const user: JwtPayload = {
    id: data.id,
    nome: data.nomeCompleto,
    email: (jwtDecode<Record<string, unknown>>(data.token))[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ] as string,
    perfil: data.perfil,
    id_cargo: ROLE_MAP[data.perfil],
  };

  const redirectTo = DASHBOARD_BY_ROLE[user.id_cargo] ?? "/";

  return { user, redirectTo };
}


export function logout(): void {
  removeToken();
  window.location.href = "/login";
}