import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

import Login from './pages/auth/Login.tsx';
import AlunoDashboard from './pages/aluno/Dashboard.tsx';
import GestorDashboard from './pages/gestor/Dashboard.tsx';
import InstrutorDashboard from './pages/instrutor/Dashboard.tsx';
import MeuTreino from './pages/aluno/MeuTreino.tsx';
import Alunos from './pages/gestor/Alunos.tsx';
import Treinos from './pages/instrutor/Treinos.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/aluno-dashboard" element={<AlunoDashboard />} />
      <Route path="/meu-treino" element={<MeuTreino />} />

      <Route path="/instrutor-dashboard" element={<InstrutorDashboard />} />
      <Route path="/instrutor-treinos" element={<Treinos />} />

      <Route path="/gestor-dashboard" element={<GestorDashboard />} />
      <Route path="/alunos" element={<Alunos />} />
    </Routes>
  </BrowserRouter>
)
