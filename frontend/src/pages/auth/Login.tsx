import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
     const navigate = useNavigate();
     const [usuario, setUsuario] = useState('');
     const [senha, setSenha] = useState('');

     const enviarPara = () => {
          if (usuario == 'aluno') navigate('/aluno-dashboard');
          if (usuario == 'instrutor') navigate('/instrutor-dashboard');
          if (usuario == 'gestor') navigate('/gestor-dashboard');
     };

     return (
          <>
               <div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Unifor_logo.svg/3840px-Unifor_logo.svg.png' width={100}>
                    </img>
                    <h1>Sistema de gerenciamento</h1>
               </div>

               <div>
                    <label htmlFor='usuario'>Usuário</label>

                    <input
                         type='text'
                         value={usuario}
                         onChange={(e) => setUsuario(e.target.value)}
                         required />

                    <label htmlFor='senha'>Senha</label>

                    <input type='password' required />

                    <button onClick={enviarPara}>Entrar</button>

                    <a href='/redefinir-senha'>Esqueci a senha</a>
               </div>

          </>
     )
}

export default Login
