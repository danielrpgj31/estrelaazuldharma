import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const successReg = await register(username, password, email);
    if (successReg) {
      setSuccess('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Usuário já existe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/90 border border-purple-800 p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-800 flex items-center justify-center border-2 border-purple-500 mb-4">
            <span className="text-purple-200 font-bold text-3xl">★</span>
          </div>
          <h1 className="text-3xl font-serif text-purple-200 tracking-widest">REGISTRAR</h1>
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
            <label className="block text-purple-300 mb-2 tracking-wider">E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {success && <p className="text-green-400 text-center">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-purple-800 text-purple-100 font-semibold tracking-wider hover:bg-purple-700 transition-all duration-300 border border-purple-500"
          >
            CRIAR CONTA
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-purple-400">Já tem conta?</p>
          <Link to="/login" className="text-purple-300 underline hover:text-purple-200">
            ENTRAR
          </Link>
          <div className="pt-4 border-t border-purple-900">
            <Link to="/" className="text-purple-400 hover:text-purple-200">
              ← Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
