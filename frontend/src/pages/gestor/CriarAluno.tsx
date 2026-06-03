import { useState } from 'react';
import axios from 'axios';
import "./styles.css"

const cliente = axios.create({
     baseURL: 'https://fitmanagerapi-production.up.railway.app/api/v1/',
     timeout: 10000,
});

function CriarAluno({ setIsOpen }) {
     const token = localStorage.getItem('token');

     const [payload, setPayload] = useState({
          nomeCompleto: '',
          cpf: '',
          dataNascimento: '',
          email: '',
          telefone: '',
          matricula: '',
          idCargo: 3,
          senha: '',
     });

     const handleChange = (e) => {
          const { name, value } = e.target;

          setPayload((prev) => ({
               ...prev,
               [name]: name === 'idCargo' ? Number(value) : value,
          }));
     };

     const submitData = async () => {
          try {
               const response = await cliente.post('/alunos', payload, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               console.log('Aluno cadastrado com sucesso:', response.data);
          } catch (error) {
               console.error('Erro ao cadastrar aluno:', error);
          }
     };

     return (
          <div className='modal'>
               <div>
                    <h1>Novo Cadastro</h1>
                    <h2>Cadastrar novo aluno</h2>
               </div>

               <div className='modal-formulario'>

                    <h1>Informações Pessoais</h1>
                    <div className='informacoes-pessoais'>
                         <div className='dado'>
                              <p>Nome Completo</p>
                              <input
                                   type="text"
                                   name="nomeCompleto"
                                   placeholder="Digite o nome completo"
                                   value={payload.nomeCompleto}
                                   onChange={handleChange}
                              />
                         </div>

                         <div className='dado'>
                              <p>CPF</p>
                              <input
                                   type="text"
                                   name="cpf"
                                   placeholder="000.000.000-00"
                                   value={payload.cpf}
                                   onChange={handleChange}
                              />
                         </div>

                         <div className='dado'>
                              <p>Data de Nascimento</p>
                              <input
                                   type="date"
                                   name="dataNascimento"
                                   value={payload.dataNascimento}
                                   onChange={handleChange}
                              />
                         </div>
                    </div>

                    <h1>Contato</h1>
                    <div className='contato'>
                         <div className='dado'>
                              <p>E-mail</p>
                              <input
                                   type="email"
                                   name="email"
                                   placeholder="E-mail"
                                   value={payload.email}
                                   onChange={handleChange}
                              />
                         </div>

                         <div className='dado'>
                              <p>Telefone</p>
                              <input
                                   type="text"
                                   name="telefone"
                                   placeholder="Telefone"
                                   value={payload.telefone}
                                   onChange={handleChange}
                              />
                         </div>
                    </div>

                    <h1>Dados Institucionais</h1>
                    <div className='dados-institucionais'>
                         <div className='dado'>
                              <p>Matrícula</p>
                              <input
                                   type="text"
                                   name="matricula"
                                   placeholder="Matrícula"
                                   value={payload.matricula}
                                   onChange={handleChange}
                              />
                         </div>
                         <div className='dado'>
                              <p>Tipo de Usuário</p>
                              <select
                                   name="idCargo"
                                   value={payload.idCargo}
                                   onChange={handleChange}
                              >
                                   <option value={1}>Admin</option>
                                   <option value={2}>Instrutor</option>
                                   <option value={3}>Aluno</option>
                              </select>
                         </div>
                    </div>

                    <h1>Senha de Acesso</h1>
                    <div className='senha-de-acesso'>
                         <div className='dado'>
                              <p>Senha</p>
                              <input
                                   type="password"
                                   name="senha"
                                   placeholder="Senha"
                                   value={payload.senha}
                                   onChange={handleChange}
                              />
                         </div>
                    </div>
               </div>

               <div className='botoes-acao'>
                    <button onClick={() => setIsOpen(false)}>
                         Cancelar
                    </button>

                    <button onClick={submitData}>
                         Cadastrar aluno
                    </button>
               </div>

               {/* preview */}
               <pre>{JSON.stringify(payload, null, 2)}</pre>
          </div>
     );
}

export default CriarAluno;