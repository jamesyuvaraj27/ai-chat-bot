import { motion } from 'framer-motion';
import { Code, BookOpen, Lightbulb, PenTool, Search, Brain, BarChart3, Zap } from 'lucide-react';

const suggestions = [
  { text: 'Write Code', icon: Code },
  { text: 'Explain a Concept', icon: BookOpen },
  { text: 'Brainstorm Ideas', icon: Lightbulb },
  { text: 'Optimize Code', icon: Zap },
  { text: 'Draft Content', icon: PenTool },
  { text: 'Analyze Data', icon: BarChart3 },
  { text: 'Research a Topic', icon: Search },
  { text: 'Solve a Problem', icon: Brain },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function WelcomeScreen({ onSuggestionClick }) {
  return (
    <motion.div
      className="welcome"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="welcome-logo" variants={logoVariants}>
        <img src="/logo.svg" alt="JADE logo" />
      </motion.div>

      <motion.h2 className="welcome-title" variants={itemVariants}>
        JADE
      </motion.h2>

      <motion.p className="welcome-tagline" variants={itemVariants}>
        Neural Intelligence Platform
      </motion.p>

      <motion.p className="welcome-description" variants={itemVariants}>
        Intelligent conversations for coding, learning, research,
        automation, planning, writing, and everyday problem solving.
      </motion.p>

      <motion.div className="suggestions" variants={containerVariants}>
        {suggestions.map(({ text, icon: Icon }) => (
          <motion.button
            key={text}
            className="suggestion-chip"
            onClick={() => onSuggestionClick(text)}
            id={`suggestion-${text.toLowerCase().replace(/\s+/g, '-')}`}
            variants={chipVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon size={16} strokeWidth={1.75} />
            {text}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default WelcomeScreen;
