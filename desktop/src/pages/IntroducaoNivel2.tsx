import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import healingPotion from '../../imagens/a_pocao_da_cura.png';

const IntroducaoNivel2: React.FC = () => {
  const { user, contents } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const videos = contents.filter((content) => content.youtubeUrl);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-purple-100">
      <nav className="border-b border-purple-900 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center border border-purple-500">
              <span className="text-purple-200 font-bold text-xl">★</span>
            </div>
            <span className="text-xl font-serif text-purple-200 tracking-widest">INTRODUÇÃO NÍVEL 2</span>
          </div>
          <div className="text-purple-300">Conteúdo exclusivo para membros autenticados</div>
        </div>
      </nav>

      <header className="relative overflow-hidden">
        <img
          src={healingPotion}
          alt="A poção da cura"
          className="w-full h-96 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/20 to-slate-950/90" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-serif text-purple-100 mb-4">Bem-vindo à Introdução do Nível 2 - O Abismo -</h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed">
              Este módulo aprofunda os ensinamentos sobre o inconsciente Individual e Coletivo, 
              com direcionamento de estudo e práticas que fortalecam o poder de análise, de acolhimento,
              e de escuta interna. 
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-slate-800/70 border border-purple-900 p-10 rounded-xl shadow-xl shadow-purple-950/20">
          <h2 className="text-3xl font-serif text-purple-100 mb-6">A jornada continua</h2>
          <p className="text-lg text-purple-200 leading-relaxed mb-6">
            Nesta fase inicial do Nível 2, você encontrará reflexões e vídeos que fortalecem sua prática e abrem espaço para novas orientações internas.
          </p>
          <div className="space-y-4 text-purple-300 text-lg leading-relaxed">
            <p>
              Os materiais apresentados aqui estão alinhados com o espírito do Nível 1, mas oferecem uma nova profundidade. Permita que a intuição conduza sua atenção e observe como o aprendizado se expande.
            </p>
            <p>
              Acompanhe os vídeos enquanto integra cada reflexão e mantenha a respiração consciente. A cura acontece quando o corpo, a mente e o coração são convidados a acolher a experiência.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-serif text-purple-200">Vídeos recomendados</h3>
              <p className="text-purple-400 mt-2">Acompanhe os mesmos thumbnails e vídeos da Introdução Nível 1 para manter a continuidade do estudo.</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {videos.length > 0 ? (
              videos.map((video) => (
                <article key={video.id} className="bg-slate-900/90 border border-purple-900 rounded-3xl overflow-hidden shadow-xl shadow-purple-950/20">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-56 object-cover" />
                  ) : null}
                  <div className="p-6">
                    <h4 className="text-2xl font-serif text-purple-100 mb-3">{video.title}</h4>
                    <p className="text-purple-300 mb-5 leading-relaxed">{video.body}</p>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-5 py-3 bg-purple-800 text-purple-100 rounded-lg border border-purple-500 hover:bg-purple-700 transition-all duration-300"
                    >
                      Assistir no YouTube
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-purple-900 bg-slate-900/80 p-8 text-purple-300">
                Nenhum vídeo cadastrado ainda. Você pode adicionar thumbnails e links do YouTube aos conteúdos internos.
              </div>
            )}
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 border border-purple-500 text-purple-100 hover:bg-purple-800 transition-all duration-300"
          >
            Voltar à área interna
          </Link>
          <div className="rounded-xl bg-purple-950/20 border border-purple-700 p-5">
            <p className="text-purple-300 font-semibold">Próximo passo:</p>
            <p className="text-purple-400">Continue com atenção plena, observe as sensações e acolha a sabedoria que surge a cada prática.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-purple-900 bg-slate-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-slate-800/80 border border-purple-900 p-10 shadow-xl shadow-purple-950/10">
            <h4 className="text-2xl font-serif text-purple-100 mb-4">Reflexão final</h4>
            <p className="text-purple-300 leading-relaxed mb-4">
              O Nível 2 se inicia com o convite para aprofundar a presença. Use este momento para internalizar os ensinamentos e permitir que a prática se fortaleça.
            </p>
            <p className="text-purple-400">
              © 2026 Instituto Estrela Azul de Dharma. Área interna protegida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroducaoNivel2;
