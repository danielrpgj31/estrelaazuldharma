import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const IntroducaoNivel1: React.FC = () => {
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
            <span className="text-xl font-serif text-purple-200 tracking-widest">INTRODUÇÃO NÍVEL 1</span>
          </div>
          <div className="text-purple-300">Conteúdo exclusivo para membros autenticados</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-slate-800/70 border border-purple-900 p-10 rounded-xl shadow-xl shadow-purple-950/20">
          <h1 className="text-4xl font-serif text-purple-100 mb-6">Bem-vindo à Introdução Nível 1</h1>
          <p className="text-lg text-purple-200 leading-relaxed mb-6">
            Esta área interna é reservada exclusivamente aos membros que efetuaram login. Aqui você encontrará o primeiro módulo introdutório dos ensinamentos do Instituto Estrela Azul de Dharma.
          </p>
          <div className="space-y-4 text-purple-300 text-lg leading-relaxed">
            <p>
              O conteúdo de Introdução Nível 1 foi criado para estabelecer as bases da jornada espiritual e preparar a consciência para os próximos passos do despertar. Você terá acesso a reflexões, práticas e símbolos que conectam o coração à sabedoria ancestral.
            </p>
            <p>
              Sinta-se convidado a absorver cada palavra com presença e reverência. Este é o início de uma trilha interna que só se revela com intenção verdadeira e compromisso com a transformação.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-serif text-purple-200">Vídeos recomendados</h2>
              <p className="text-purple-400 mt-2">Assista aos vídeos selecionados para complementar sua Introdução Nível 1.</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {videos.length > 0 ? (
              videos.map((video) => (
                <article key={video.id} className="bg-slate-900/90 border border-purple-900 rounded-3xl overflow-hidden shadow-xl shadow-purple-950/20">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-56 object-cover"
                    />
                  ) : null}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-purple-100 mb-3">{video.title}</h3>
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
            <p className="text-purple-400">Estude os fundamentos do Dharma, pratique a respiração consciente e mantenha seu coração aberto à intuição.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-purple-900 bg-slate-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {videos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <h3 className="text-2xl font-serif text-purple-100 mb-3">Vídeo em destaque</h3>
                <p className="text-purple-400 mb-6">Veja a prévia do conteúdo mais recente com thumbnail e link direto para o YouTube.</p>
                <div className="rounded-3xl bg-slate-900/80 border border-purple-900 overflow-hidden shadow-xl shadow-purple-950/20">
                  {videos[0].thumbnailUrl ? (
                    <img
                      src={videos[0].thumbnailUrl}
                      alt={videos[0].title}
                      className="w-full h-56 object-cover"
                    />
                  ) : null}
                  <div className="p-6">
                    <h4 className="text-xl font-serif text-purple-100 mb-2">{videos[0].title}</h4>
                    <p className="text-purple-300 mb-5 leading-relaxed">{videos[0].body}</p>
                    <a
                      href={videos[0].youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-5 py-3 bg-purple-800 text-purple-100 rounded-lg border border-purple-500 hover:bg-purple-700 transition-all duration-300"
                    >
                      Assistir no YouTube
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-purple-950/20 border border-purple-700 p-8 text-purple-300">
                <p className="text-purple-200 font-semibold mb-3">Atenção</p>
                <p className="leading-relaxed">
                  O vídeo no footer é uma referência visual rápida para você entrar no fluxo de aprendizagem. Use-o como apoio após revisar os conceitos principais nesta página.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-purple-400">
              <p>© 2026 Instituto Estrela Azul de Dharma. Área interna protegida.</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default IntroducaoNivel1;
