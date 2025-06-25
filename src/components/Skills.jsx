import { motion } from 'framer-motion';

const skills = [
  {
    title: 'Langages Web',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)']
  },
  {
    title: 'Frameworks & Librairies',
    items: ['React.js (Vite)', 'Bootstrap', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Hono', 'tRPC']
  },
  {
    title: 'API & Intégration',
    items: [
      'Création et consommation d’API REST',
      'Intégration de modèles IA (Whisper, etc.)'
    ]
  },
  {
    title: 'Automatisation Python',
    items: [
      'Web scraping',
      'Bots Telegram',
      'Génération de PDF',
      'Alertes Bitcoin'
    ]
  },
  {
    title: 'Outils & Écosystème',
    items: [
      'Git & GitHub',
      'Postman',
      'VS Code',
      'CapCut (montage vidéo)'
    ]
  },
  {
    title: 'Bases de données',
    items: [
      'Notions sur MongoDB',
      'Intégration prévue avec projets futurs'
    ]
  }
];

const plus = [
  'Création d’interfaces modernes et futuristes',
  'Développement de projets complets (frontend + backend)',
  'Autonomie et résolution de problèmes techniques',
  'Expérience pédagogique (cours particuliers en algorithmique et français)',
  'Compétences en communication, montage vidéo et création de contenu (TikTok/YouTube)'
];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-12 px-2 sm:px-4 md:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#23265d]/60 to-transparent">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-cyan-300 drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Compétences Techniques
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
        {skills.map((cat, i) => (
          <motion.div
            key={cat.title}
            className="bg-[#181c2a]/80 rounded-xl shadow-lg p-5 flex flex-col items-center border border-cyan-900"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 text-center">{cat.title}</h3>
            <ul className="text-gray-200 text-sm sm:text-base text-center space-y-1">
              {cat.items.map((item, j) => (
                <li key={j}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-full max-w-3xl mx-auto mt-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-pink-300 mb-2 mt-4">🧠 Autres Atouts</h3>
        <ul className="text-gray-200 text-base sm:text-lg flex flex-col gap-1 items-center">
          {plus.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
