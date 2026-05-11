import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Login from './pages/auth/Login.tsx';
import AlunoDashboard from './pages/aluno/Dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/aluno-dashboard" element={<AlunoDashboard />} />
    </Routes>
  </BrowserRouter>
)
