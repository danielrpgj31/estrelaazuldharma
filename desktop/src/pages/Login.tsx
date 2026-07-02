import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/90 border border-purple-800 p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-800 flex items-center justify-center border-2 border-purple-500 mb-4">
            <span className="text-purple-200 font-bold text-3xl">★</span>
          </div>
          <h1 className="text-3xl font-serif text-purple-200 tracking-widest">ENTRAR</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-300 mb-2 tracking-wider">NOME DE USUÁRIO</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-purple-700 text-purple-100 focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-purple-300 mb-2 tracking-wider">SENHA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-purple-700 text-purple-100 focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          {error && <p className="text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-purple-800 text-purple-100 font-semibold tracking-wider hover:bg-purple-700 transition-all duration-300 border border-purple-500"
          >
            ACESSAR
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-purple-400">Não tem conta?</p>
          <Link to="/register" className="text-purple-300 underline hover:text-purple-200">
            CRIAR CONTA
          </Link>
          <div className="pt-4 border-t border-purple-900">
            <Link to="/" className="text-purple-400 hover:text-purple-200">
              ← Voltar à página inicial
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-purple-500 text-center">
          <p>Demo: usuário admin / senha admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
