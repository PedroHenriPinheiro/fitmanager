import { useEffect, useState } from 'react'
import treinos from './treinos';
import iconePerfil from './iconePerfil.png';

function AlunoDashboard() {
     return (
          <>
               <div>
                    <div>
                         <h1>UNIFOR GYM</h1>
                         <p>Bem-vindo, aluno</p>
                    </div>

                    <div>
                         <img src={iconePerfil} alt="Ícone do perfil" />
                    </div>
               </div>

               <div>
                    <div>
                         <h1>Meu treino</h1>
                         <p>Visualizar ficha de treinos</p>

                         <div>
                              {Object.entries(treinos).map(([key, treino]) => {
                                   console.log(key)

                                   return (
                                        <p key={key}>{treino.nome}</p>
                                   )
                              })}
                         </div>
                    </div>

                    <div>

                    </div>
               </div>
          </>
     )
}

export default AlunoDashboard
