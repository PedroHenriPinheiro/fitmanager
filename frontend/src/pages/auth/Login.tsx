import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import type { LoginCredentials } from "../../types/auth.types";

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuth, dashboardPath } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (isAuth) {
    return <Navigate to={dashboardPath} replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const { redirectTo } = await login(credentials);
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>FitManager</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={credentials.senha}
          onChange={handleChange}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}