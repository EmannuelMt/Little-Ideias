import { PieChart, BarChart } from '../components/ui/Charts';
import StatsCards from '../components/ui/StatsCards';

export default function DashboardPage() {
  // Dados mockados - substitua por dados reais
  const stats = {
    total: 24,
    inProgress: 8,
    completed: 5
  };

  return (
    <div className="dashboard-page">
      <h2>Meu Progresso</h2>
      
      <StatsCards stats={stats} />
      
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Status das Ideias</h3>
          <PieChart data={[stats.total - stats.inProgress - stats.completed, stats.inProgress, stats.completed]} />
        </div>
        
        <div className="chart-container">
          <h3>Progresso Mensal</h3>
          <BarChart />
        </div>
      </div>
    </div>
  );
}