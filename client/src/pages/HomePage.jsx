import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

// Feather Icons
import { 
  FiArrowRight, 
  FiZap, 
  FiUsers, 
  FiLayers, 
  FiTrendingUp,
  FiAward,
  FiCode,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiFigma,
  FiGithub,
  FiSlack
} from 'react-icons/fi';

// Font Awesome Icons
import { 
  FaLightbulb, 
  FaRegLightbulb, 
  FaRocket,
  FaRegStar,
  FaStar
} from 'react-icons/fa';

// Simple Icons (Corrigido)
import { SiMaterialdesign, SiJavascript, SiReact, SiNodedotjs } from 'react-icons/si';

import mockApi from '../services/mockApi';
import './HomePage.css';

const HomePage = () => {
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const [stats, setStats] = useState({ users: 0, ideas: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ideas, statsData] = await Promise.all([
          mockApi.getFeaturedIdeas(),
          mockApi.getStats()
        ]);
        
        setFeaturedIdeas(ideas);
        setStats(statsData);
        
        controls.start({
          users: statsData.users,
          ideas: statsData.ideas,
          projects: statsData.projects,
          transition: { duration: 1.5 }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Rotação automática de depoimentos
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  const features = [
    {
      icon: FiLayers,
      title: "Organização Visual",
      description: "Estruture suas ideias com nosso sistema de categorias e tags intuitivas."
    },
    {
      icon: FiUsers,
      title: "Colaboração",
      description: "Convide membros da equipe e trabalhem juntos em tempo real."
    },
    {
      icon: FiTrendingUp,
      title: "Progress Tracking",
      description: "Acompanhe o desenvolvimento de cada ideia do conceito à implementação."
    },
    {
      icon: FiCode,
      title: "Integrações",
      description: "Conecte com ferramentas como GitHub, Figma e Trello."
    }
  ];

  const testimonials = [
    {
      quote: "O Little Ideias transformou completamente nosso fluxo criativo. Agora nenhuma ideia se perde!",
      author: "Ana Silva",
      role: "Design Lead na InovaTech",
      avatar: "👩‍💻"
    },
    {
      quote: "Como desenvolvedor freelance, essa ferramenta me ajuda a manter todas minhas ideias organizadas e priorizadas.",
      author: "Carlos Mendes",
      role: "Desenvolvedor Fullstack",
      avatar: "🧑‍💻"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container">
          <div className="hero-content">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              Dê vida às suas <span className="text-gradient">ideias criativas</span>
            </motion.h1>
            
            <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              A plataforma definitiva para capturar, desenvolver e implementar suas melhores ideias de projetos digitais.
            </motion.p>
            
            <div className="hero-actions">
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
              >
                Comece Agora <FiArrowRight />
              </motion.button>
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/demo')}
              >
                Ver Demonstração
              </button>
            </div>
            
            <div className="trust-badges">
              <span>Confiança por mais de 10.000 criativos</span>
              <div className="badges">
                <SiJavascript />
                <SiReact />
                <SiNodedotjs />
                <FiFigma />
              </div>
            </div>
          </div>
          
          <div className="hero-illustration">
            <div className="idea-mockup">
              <div className="idea-card-mock">
                <FaRegLightbulb />
                <h4>Nova Landing Page</h4>
                <p>Redesign completo da página principal</p>
                <div className="tags">
                  <span>Design</span>
                  <span>UI/UX</span>
                </div>
              </div>
              <div className="idea-card-mock secondary">
                <FiCode />
                <h4>Sistema de Notificações</h4>
                <p>Implementar push notifications</p>
                <div className="tags">
                  <span>Desenvolvimento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: <FiZap />, value: stats.ideas, label: 'Ideias Criadas' },
              { icon: <FiUsers />, value: stats.users, label: 'Usuários Ativos' },
              { icon: <FiAward />, value: stats.projects, label: 'Projetos Lançados' },
              { icon: <FiClock />, value: '24/7', label: 'Suporte Ativo' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <motion.div className="stat-number">
                  {typeof stat.value === 'number' ? 
                    (stat.value > 1000 ? `${Math.floor(stat.value/1000)}k+` : `${stat.value}+`) : 
                    stat.value}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Potencialize seu fluxo criativo</h2>
            <p className="section-subtitle">Tudo que você precisa para transformar inspiração em realidade</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="feature-card">
                  <div className="feature-icon-container">
                    <div className="feature-icon-bg" />
                    <feature.icon className="feature-icon" size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Integrações Perfeitas</h2>
            <p className="section-subtitle">Conecte com suas ferramentas favoritas</p>
          </motion.div>
          
          <div className="integrations-grid">
            {[
              { icon: <FiGithub size={40} />, name: 'GitHub' },
              { icon: <FiFigma size={40} />, name: 'Figma' },
              { icon: <FiSlack size={40} />, name: 'Slack' },
              { icon: <SiJavascript size={40} />, name: 'JavaScript' },
              { icon: <SiReact size={40} />, name: 'React' },
              { icon: <SiNodedotjs size={40} />, name: 'Node.js' }
            ].map((tech, index) => (
              <motion.div 
                key={index}
                className="tech-card"
                whileHover={{ y: -5 }}
              >
                <div className="tech-icon">{tech.icon}</div>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>O que nossos usuários dizem</h2>
          </motion.div>
          
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ 
                  opacity: index === activeTestimonial ? 1 : 0.5,
                  x: 0
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <blockquote>
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Pronto para transformar suas ideias em realidade?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Junte-se a milhares de criativos, designers e desenvolvedores que já estão usando o Little Ideias.
            </motion.p>
            
            <motion.div
              className="cta-actions"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/register')}
              >
                Criar Conta Gratuita
              </button>
              <button 
                className="btn btn-white btn-large"
                onClick={() => navigate('/demo')}
              >
                Ver Demonstração
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;