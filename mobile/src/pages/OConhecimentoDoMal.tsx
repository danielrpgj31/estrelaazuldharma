import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import knowledgeOfEvil from '../../imagens/o_conhecimento_do_mal.png';

const OConhecimentoDoMal: React.FC = () => {
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
            <span className="text-xl font-serif text-purple-200 tracking-widest">O CONHECIMENTO DO MAL</span>
          </div>
          <div className="text-purple-300">Conteúdo exclusivo para membros autenticados</div>
        </div>
      </nav>

      <header className="relative overflow-hidden">
        <img
          src={knowledgeOfEvil}
          alt="O conhecimento do mal"
          className="w-full h-96 object-cover object-[50%_30%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/20 to-slate-950/90" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-serif text-purple-100 mb-4">O conhecimento do Mal</h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed">
              Neste capítulo, abordaremos os conhecimentos para iluminar e seguir em frente, ou melhor, para baixo, para as profundezas de nossa mente, nosso inconsciente, nosso abismo.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-slate-800/70 border border-purple-900 p-10 rounded-xl shadow-xl shadow-purple-950/20">
          <h2 className="text-3xl font-serif text-purple-100 mb-6">Explorando as profundezas</h2>
          <p className="text-lg text-purple-200 leading-relaxed mb-6">
            Este capítulo convida você a mergulhar nos terrenos sombrios do inconsciente e a descobrir como a luz também nasce do confronto com o abismo interior.
          </p>
          <div className="space-y-4 text-purple-300 text-lg leading-relaxed">
            <p>
              A jornada para baixo não é derrota, é coragem. Ao conhecer o mal, aprendemos a iluminá-lo sem medo e a transmutar o que antes parecia apenas obscuro.
            </p>
            <p>
              Use estas páginas como guias que ajudam a trazer consciência para as camadas profundas da mente, onde residem os símbolos, os traumas e as forças que moldam nossa realidade.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-serif text-purple-200">Vídeos recomendados</h3>
              <p className="text-purple-400 mt-2">Veja os vídeos que auxiliam nesta travessia do consciente para o inconsciente.</p>
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
            <p className="text-purple-400">Permaneça atento às profundezas e permita que a cura ocorra quando o conhecimento do mal é trazido à luz.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-purple-900 bg-slate-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-slate-800/80 border border-purple-900 p-10 shadow-xl shadow-purple-950/10">
            <h4 className="text-2xl font-serif text-purple-100 mb-4">Reflexão final</h4>
            <p className="text-purple-300 leading-relaxed mb-4">
              O conhecimento do mal revela não apenas as sombras, mas o caminho para integrá-las e transcender o medo. Ele é o portal para a verdadeira transformação.
            </p>
            <p className="text-purple-400">© 2026 Instituto Estrela Azul de Dharma. Área interna protegida.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OConhecimentoDoMal;
