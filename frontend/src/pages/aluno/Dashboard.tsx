import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './AlunoDashboard.css'
import treinos from './treinos';
import iconePerfil from './iconePerfil.png';

import barbell from './icons/barbell.svg';
import time from './icons/time.svg';
import user from './icons/user.svg';

function AlunoDashboard() {
     const navigate = useNavigate();

     return (
          <>
               <div className='cabecalho'>
                    <div>
                         <h1>UNIFOR GYM</h1>
                         <p>Bem-vindo, aluno</p>
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
                              {Object.entries(treinos).map(([key, treino]) => {
                                   return (
                                        <p className='treinoItem' key={key}>{treino.nome}</p>
                                   )
                              })}
                         </div>
                    </div>

                    <div className='acessoHorarios'>
                         <img src={time} className='time'/>
                         <h1>Horários</h1>
                         <p>Visualizar ficha de treinos</p>
                         <p>Seg. - Sex.: 6h às 22h</p>
                    </div>

                    <div className='acessoHistorico'>
                         <h1>Histórico recente</h1>
                              {Object.entries(treinos).map(([key, treino]) => {
                                   return (
                                        <div className='historicoItem'>
                                             <p key={key}>{treino.nome}</p>
                                             <p>05/05/2026</p>
                                        </div>
                                   )
                              })}
                    </div>
               </div>
          </>
     )
}

export default AlunoDashboard
