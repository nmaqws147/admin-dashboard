import { Inflation } from '../../../App';
import { Line } from 'react-chartjs-2';
import { useSideBar } from '../../sidebar';
import {ChartOptions,Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,  
  Title,
  Tooltip,
  Legend
);
interface PropsInflation {
  inflation: Inflation[];
}
const LineChart: React.FC<PropsInflation> = ({ inflation }) => {
    const {isOpen} = useSideBar();
    const deLine = inflation.filter(inf => inf.country.id === 'DE');
    const egLine = inflation.filter(inf => inf.country.id === 'EG');
    const usaLine = inflation.filter(inf => inf.country.id === 'US');
    const labels = egLine.map(e => e.date).reverse(); 
    const data = {
    labels, 
    datasets: [
      {
        label: 'Egypt', 
        data: egLine.map(e => e.value).reverse(),
        borderColor: 'red',
        tension: 0.3, 
        fill: false, 
    },
    {
        label: 'Germany', 
        data: deLine.map(d => d.value).reverse(),
        borderColor: 'blue',
        tension: 0.3, 
        fill: false, 
    },
    {
        label: 'USA', 
        data: usaLine.map(u => u.value).reverse(),
        borderColor: 'green',
        tension: 0.3, 
        fill: false, 
    }
    ]
    };
    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#777',
            font: {
              size: 10,
              weight: 'bold',
            },
            padding: 16,
            boxWidth: 20,
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text: '📈 Inflation Trends (1960–2023)',
          color: '#F94144',
          font: {
            size: 20,
            weight: 'bold',
            family: 'Arial',
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#f8f9fa',
          titleColor: '#212529',
          bodyColor: '#495057',
          borderColor: '#dee2e6',
          borderWidth: 1,
          titleFont: {
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            size: 13,
          },
          cornerRadius: 6,
          padding: 12,
          displayColors: true,
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#555',
            font: {
              size: 12,
            },
            padding: 8,
          },
          grid: {
            color: '#e9ecef',
            drawTicks: false,
            display: false,
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            color: '#555',
            font: {
              size: 12,
            },
            padding: 8,
          },
          grid: {
            color: '#f1f3f5',
            drawTicks: false,
            display: false,
          },
        },
      },
      elements: {
        line: {
          borderWidth: 2.5,
          tension: 0.4, 
        },
        point: {
          radius: 3,
          hoverRadius: 6,
          backgroundColor: '#fff',
          borderWidth: 2,
          hoverBorderWidth: 2,
        },
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      animation: {
        duration: 1200,
        easing: 'easeOutCubic',
      },
    };    
  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{
      width: "90vw",
      height: "60vh",
      marginLeft: isOpen ? "220px" : "0",
      transition: "0.5s ease all",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "60vh",
      }}
    >
      <Line data={data} options={options} />
    </div>
  </div>
  
  );
};
export default LineChart;  