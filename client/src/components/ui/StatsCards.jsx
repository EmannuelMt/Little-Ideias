export default function StatsCards({ stats }) {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{stats.total}</p>
      </div>
      
      <div className="stat-card in-progress">
        <h3>Em Andamento</h3>
        <p>{stats.inProgress}</p>
      </div>
      
      <div className="stat-card completed">
        <h3>Finalizadas</h3>
        <p>{stats.completed}</p>
      </div>
    </div>
  );
}