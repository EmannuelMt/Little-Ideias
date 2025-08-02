import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, LayoutDashboard, Clock, CheckCircle, Tag, Menu, X, Lightbulb, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Efeito de scroll na navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar sidebar ao mudar de rota
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <button 
              className="sidebar-toggle" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
            >
              {sidebarOpen ? (
                <X size={24} className="icon" />
              ) : (
                <Menu size={24} className="icon" />
              )}
            </button>
            
            <Link to="/" className="navbar-logo">
              <Lightbulb size={26} className="logo-icon" />
              <span>Little Ideias</span>
            </Link>
          </div>
          
          <div className="navbar-actions">
            <nav className="primary-nav">
              <Link 
                to="/ideas" 
                className={`nav-link ${location.pathname.startsWith('/ideas') ? 'active' : ''}`}
              >
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Minhas Ideias</span>
              </Link>
              <Link 
                to="/new-idea" 
                className={`nav-link highlight ${location.pathname === '/new-idea' ? 'active' : ''}`}
              >
                <Plus size={18} className="nav-icon" />
                <span>Nova Ideia</span>
              </Link>
            </nav>
            
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle"
              aria-label={`Alternar para modo ${darkMode ? 'claro' : 'escuro'}`}
              data-tooltip={darkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {darkMode ? (
                <Sun size={20} className="theme-icon" />
              ) : (
                <Moon size={20} className="theme-icon" />
              )}
            </button>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Explorar</h2>
          <button 
            className="sidebar-close" 
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <Link 
                to="/ideas" 
                className={`sidebar-link ${location.pathname.startsWith('/ideas') ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard size={20} className="sidebar-icon" />
                <span>Todas Ideias</span>
                <span className="badge">24</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                to="/in-progress" 
                className={`sidebar-link ${location.pathname === '/in-progress' ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Clock size={20} className="sidebar-icon" />
                <span>Em Andamento</span>
                <span className="badge">5</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                to="/completed" 
                className={`sidebar-link ${location.pathname === '/completed' ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <CheckCircle size={20} className="sidebar-icon" />
                <span>Finalizadas</span>
                <span className="badge">12</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link 
                to="/by-category" 
                className={`sidebar-link ${location.pathname === '/by-category' ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Tag size={20} className="sidebar-icon" />
                <span>Por Categoria</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">UI</div>
            <div className="user-info">
              <span className="user-name">Usuário</span>
              <span className="user-email">user@example.com</span>
            </div>
          </div>
        </div>
      </aside>

      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
}