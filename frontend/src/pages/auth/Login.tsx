import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import type { LoginCredentials } from "../../types/auth.types";
import "../auth/Login.css";

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
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>FIT</h1>
          <span>MANAGER</span>
        </div>

        <h2 className="login-title">Sistema de Gerenciamento</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Usuário</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={credentials.senha}
              onChange={handleChange}
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}