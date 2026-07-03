import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout, contents } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-purple-100">
      <nav className="border-b border-purple-900 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center border border-purple-500">
              <span className="text-purple-200 font-bold text-xl">★</span>
            </div>
            <span className="text-xl font-serif text-purple-200 tracking-widest">ÁREA INTERNA</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-purple-300">Bem-vindo, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-purple-500 text-purple-200 hover:bg-purple-800 transition-all duration-300"
            >
              SAIR
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-serif text-purple-200 mb-8 tracking-widest">CONTEÚDOS SAGRADOS</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {contents.map((content) => (
            <div key={content.id} className="bg-slate-800/50 border border-purple-900 p-8 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-serif text-purple-200 mb-4">{content.title}</h3>
              <p className="text-purple-300 mb-6 leading-relaxed">{content.body}</p>
              <div className="text-sm text-purple-500">
                {new Date(content.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-4 sm:grid-cols-2 w-full">
            <Link
              to="/introducao-nivel-1"
              className="inline-flex justify-center px-6 py-3 bg-purple-800 text-purple-100 font-semibold tracking-wider hover:bg-purple-700 transition-all duration-300 border border-purple-500"
            >
              Entrar em Introdução Nível 1
            </Link>
            <Link
              to="/introducao-nivel-2"
              className="inline-flex justify-center px-6 py-3 bg-slate-900 text-purple-100 font-semibold tracking-wider hover:bg-slate-800 transition-all duration-300 border border-purple-500"
            >
              Entrar em Introdução Nível 2
            </Link>
          </div>
          <Link
            to="/"
            className="inline-block px-6 py-3 border border-purple-500 text-purple-200 hover:bg-purple-800 transition-all duration-300"
          >
            ← Voltar à página inicial
          </Link>
        </div>
      </main>

      <footer className="border-t border-purple-900 bg-slate-900 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-purple-400">
          <p>© 2026 Ordem da Estrela Azul. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
