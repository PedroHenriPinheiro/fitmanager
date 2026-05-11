import { useEffect, useState } from 'react'

function AlunoDashboard() {
     const [nome, setNome] = useState('');

     useEffect(() => {
          setNome('Aluno')
     }, [nome]);

     return (
          <>
               <div>
                    Bem-vindo, {nome}!
               </div>
          </>
     )
}

export default AlunoDashboard
