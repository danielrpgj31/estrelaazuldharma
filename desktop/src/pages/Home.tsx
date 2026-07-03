import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-purple-100">
      <nav className="border-b border-purple-900 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center border border-purple-500">
              <span className="text-purple-200 font-bold text-xl">★</span>
            </div>
            <span className="text-2xl font-serif text-purple-200 tracking-widest">INSTITUTO ESTRELA AZUL</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 border border-purple-500 text-purple-200 hover:bg-purple-800 transition-all duration-300">
              ACESSAR
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Image Section */}
      <section className="relative w-full overflow-hidden">
        <img 
          src="/banner_estrela_azul.png"
          alt="Instituto Estrela Azul de Dharma"
          className="w-full h-auto"
        />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8 text-lg leading-relaxed text-purple-200">
          <p className="text-xl">
            O Projeto Estrela Azul de Dharma tem como objetivo construir um grupo que tenha coragem e Cristo no coração para quebrar campos (Fabio Herrmann) coletivos que perpetuam doenças milenares da alma, da forma de entender, da forma de acolher.
          </p>
          <p className="text-xl">
            Não se limita a transmitir doutrinas: ele semeia a consciência que desperta o Cristo interno em cada ser, que lembra a cada peregrino que sua natureza é divina, que aprisionado apenas está pelas crenças que ele próprio ergueu como muros entre si e a Luz. É um refúgio para os que buscam libertação não de um mundo exterior, mas das amarras do ego que os mantêm escravos de ciclos de sofrimento, um espaço onde o Dharma, a verdade eterna que rege todas as vidas, se apresenta não como um fardo, mas como a asa que leva a alma de volta ao seu lar celestial, onde não há mais lágrimas, nem separação, nem fim para a luz que é a sua essência.
          </p>
          <p className="text-xl text-purple-300 font-serif">
            A Estrela Azul que lhe dá o nome é a mesma que guia os passos dos místicos de todas as eras, que brilha no céu espiritual como sinal da graça que desce para auxiliar os que anseiam por despertar, que lembra que a cura e a libertação não são sonhos distantes, mas a realidade inerente de quem se abre ao amor que tudo sustenta, que tudo perdoa, que tudo transforma.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/login" className="px-10 py-4 bg-purple-800 text-purple-100 font-semibold tracking-wider hover:bg-purple-700 transition-all duration-300 border border-purple-500">
            INICIAR A JORNADA
          </Link>
        </div>
      </section>

      <footer className="border-t border-purple-900 bg-slate-900 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-purple-400">
          <p>© 2026 Instituto Estrela Azul de Dharma. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
