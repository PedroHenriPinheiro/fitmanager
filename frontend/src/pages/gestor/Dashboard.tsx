import { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles.css"
import CriarAluno from './CriarAluno';

const cliente = axios.create({
     baseURL: 'https://fitmanagerapi-production.up.railway.app/api/v1/',
     timeout: 10000
});

function GestorDashboard() {
     const token = localStorage.getItem('token');

     const [alunos, setAlunos] = useState({
          total: 0,
          page: 0,
          items: []
     })
     const [professores, setProfessores] = useState({
          total: 0,
          page: 0,
          items: []
     })

     const [pesquisaAluno, setPesquisaAluno] = useState('')
     const [pesquisaProfessor, setPesquisaProfessor] = useState('')

     useEffect(() => {
          cliente
               .get('alunos/', {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               })
               .then((response) => {
                    setAlunos(response.data)
               })
               .catch((error) => {
                    console.log(error.message)
               })

          cliente
               .get('instrutores/',
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               )
               .then((response) => {
                    setProfessores(response.data)
               })
               .catch((error) => {
                    console.error(error);
               })
     }, []);

     {/* useEffect(() => {
          if (alunos.items.length != 0) console.log(alunos);
     }, [alunos]) */}

     {/*useEffect(() => {
          if (professores.items.length != 0) console.log(professores);
     }, [professores])*/}

     const [isOpen, setIsOpen] = useState(false)
     const [tipo, setTipo] = useState('')

     return (
          <>
               {isOpen && <div className='modal-overlay'><CriarAluno setIsOpen={setIsOpen} tipoUsuario={tipo} /></div>}

               <div>
                    <h1>UNIFOR GYM - Gerenciamento</h1>
                    <h2>Painel Administrativo</h2>
               </div>

               <div>
                    <p>{alunos.items.length}</p>
                    <p>Alunos Ativos</p>
               </div>

               <div>
                    <h1>Ações Rápidas</h1>
                    <button onClick={() => {
                         setTipo("aluno");
                         setIsOpen(true);
                    }}>Novo Aluno</button>
                    <button onClick={() => {
                         setTipo("professor");
                         setIsOpen(true);
                    }}>Novo Professor</button>
               </div>

               <div>
                    <h1>Alunos Ativos</h1>
                    <a href='#'>Ver todos</a>
                    <input
                         type="search"
                         value={pesquisaAluno}
                         onChange={(e) => setPesquisaAluno(e.target.value)}
                         placeholder="Buscar aluno por nome ou matrícula..."
                         inputMode="search"
                    />

                    <div className="table" role="table">
                         <div className="table-header" role="row">
                              <div role="columnheader">Nome</div>
                              <div role="columnheader">Matrícula</div>
                              <div role="columnheader">Ações</div>
                         </div>
                         {alunos.items.map((item) => (
                              <div className="table-row" role="row" key={item.id}>
                                   <div role="cell">{item.nomeCompleto}</div>
                                   <div role="cell">{item.matricula}</div>
                                   <div role="cell"><a href='#'>Editar</a></div>
                              </div>
                         ))}
                    </div>
               </div>

               <div>
                    <h1>Alunos Ativos</h1>
                    <a href='#'>Ver todos</a>
                    <input
                         type="search"
                         value={pesquisaProfessor}
                         onChange={(e) => setPesquisaProfessor(e.target.value)}
                         placeholder="Buscar professor por nome ou matrícula..."
                         inputMode="search"
                    />

                    <div className="table" role="table">
                         <div className="table-header" role="row">
                              <div role="columnheader">Nome</div>
                              <div role="columnheader">Matrícula</div>
                              <div role="columnheader">Ações</div>
                         </div>
                         {professores.items.map((item) => (
                              <div className="table-row" role="row" key={item.id}>
                                   <div role="cell">{item.nomeCompleto}</div>
                                   <div role="cell">{item.matricula}</div>
                                   <div role="cell"><a href='#'>Editar</a></div>
                              </div>
                         ))}
                    </div>
               </div>
          </>
     )
}

export default GestorDashboard
