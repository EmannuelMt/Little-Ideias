import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Registre os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Ideias', 'Em andamento', 'Finalizadas'],
    datasets: [
      {
        data: data || [10, 20, 30],
        backgroundColor: [
          '#FFCE56',
          '#36A2EB',
          '#4BC0C0'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export const BarChart = ({ data }) => {
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Ideias por mês',
        data: data || [12, 19, 3, 5, 2, 3],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return <Bar data={chartData} />;
};