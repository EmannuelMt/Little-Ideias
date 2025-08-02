import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import IdeasPage from './pages/IdeasPage';
import NewIdeaPage from './pages/NewIdeaPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import EditIdeaPage from './pages/EditIdeaPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ideas" element={<IdeasPage />} />
                <Route path="/new-idea" element={<NewIdeaPage />} />
                <Route path="/ideas/:id" element={<IdeaDetailPage />} />
                <Route path="/ideas/:id/edit" element={<EditIdeaPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;