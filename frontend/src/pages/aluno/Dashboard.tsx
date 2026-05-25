import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './AlunoDashboard.css'

import barbell from './icons/barbell.svg';
import time from './icons/time.svg';
import user from './icons/user.svg';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function AlunoDashboard() {
     const navigate = useNavigate()
     const [data, setData] = useState({})
     const [treinos, setTreinos] = useState([])

     useEffect(() => {
          getData();
     }, []);

     useEffect(() => {
          if (Object.keys(data).length > 0) {
               const treinos = data.usuario_treino.map((usuario_treino) => usuario_treino.treino);
               setTreinos(treinos);
          }
     }, [data]);

     async function getData() {
          const { data, error } = await supabase
               .from('usuario')
               .select(`
                    nome_completo,
                    usuario_treino!usuario_treino_id_aluno_fkey (
                         id_treino,
                         status,
                         treino (
                              id_treino,
                              nome_treino,
                              data_criacao
                         )
                    )
                    `)
               .eq('id_usuario', 1); // hard-coded para fins de teste

          if (error) {
               console.error(error);
               return;
          }

          setData(data[0]);
     }

     if (!(Object.keys(data).length > 0) && !(treinos.length > 0)) {
          return <p className='carregando'>Carregando suas informações...</p>;
     }


     return (
          <>
               <div className='cabecalho'>
                    <div>
                         <h1>UNIFOR GYM</h1>
                         <p>Bem-vindo, {data.nome_completo}</p>
                    </div>

                    <div>
                         <img src={user} className='user' alt="Ícone do perfil" />
                    </div>
               </div>

               <div className='principal'>
                    <div className='acessoMeuTreino' onClick={() => navigate('/meu-treino')}>
                         <img src={barbell} className='barbell' />
                         <h1>Meu treino</h1>
                         <p>Visualizar ficha de treinos</p>

                         <div className='treinoItens'>
                              {treinos.map((treino) => (
                                   <p className='treinoItem' key={treino.id_treino}>{treino.nome_treino}</p>
                              ))}
                         </div>
                    </div>

                    <div className='acessoHorarios'>
                         <img src={time} className='time' />
                         <h1>Horários</h1>
                         <p>Visualizar ficha de treinos</p>
                         <p>Seg. - Sex.: 6h às 22h</p>
                    </div>

                    <div className='acessoHistorico'>
                         <h1>Histórico recente</h1>
                         {treinos.map((treino) => (
                              <div className='historicoItem' key={treino.id_treino}>
                                   <p>{treino.nome_treino}</p>
                                   <p>{treino.data_criacao}</p>
                              </div>
                         ))}
                    </div>
               </div>
          </>
     )
}

export default AlunoDashboard
