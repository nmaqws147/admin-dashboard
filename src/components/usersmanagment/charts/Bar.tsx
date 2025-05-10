
import { Medals } from "../../../App";
import { Bar } from "react-chartjs-2";
import { useSideBar } from "../../sidebar";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,ChartOptions,Legend,} from 'chart.js';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, 
  Title,
  Tooltip,
  Legend
);
interface BarChartProps{
    medals:Medals[];
}
const BarChart:React.FC<BarChartProps> = ({medals}) => {
    const {isOpen} = useSideBar();
    const getTotalForCountry = (country: "Egypt" | "Germany" | "USA", type: "bronze" | "silver" | "gold") =>
        medals.map(medal => medal[country][type])
        .reduce((acc, curr) => acc + curr, 0);
        const data = {
            labels: ['USA', 'GERMANY', 'EGYPT'],
            datasets: [
              {
                label: 'Gold',
                data: [
                getTotalForCountry('USA', 'gold'),
                getTotalForCountry('Germany', 'gold'),
                getTotalForCountry('Egypt', 'gold'),
                ],
                backgroundColor: '#4169E1',
              },
              {
                label: 'Silver',
                data: [
                getTotalForCountry('USA', 'silver'),
                getTotalForCountry('Germany', 'silver'),
                getTotalForCountry('Egypt', 'silver'),
                ],
                backgroundColor: '#1E90FF',
              },
              {
                label: 'Bronze',
                data: [
                getTotalForCountry('USA', 'bronze'),
                getTotalForCountry('Germany', 'bronze'),
                getTotalForCountry('Egypt', 'bronze'),
                ],
                backgroundColor: '#87CEEB',
              },
            ],
          };
          const options:ChartOptions<"bar"> = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  color: '#4B5563',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                  padding: 10,
                },
              },
              title: {
                display: true,
                text: '🏅 Total Medals by Country',
                color: '#4169E1',
                font: {
                  size: 20,
                  weight: 'bold',
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              tooltip: {
                backgroundColor: '#F9FAFB',
                titleColor: '#111827',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 10,
                titleFont: { weight: 'bold' },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#374151',
                  font: {
                    size: 13,
                  },
                },
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#374151',
                  font: {
                    size: 13,
                  },
                  stepSize: 1,
                },
                grid: {
                  color: '#E5E7EB',
                  display: false,
                },
              },
            },
          };
          
        
          return (
            <div
  className="d-flex justify-content-center align-items-center"
  style={{
    width: "90vw",
    height: "65vh",
    marginLeft: isOpen ? "240px" : "0",
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
    <Bar data={data} options={options} />
  </div>
</div>

          );
}
export default BarChart;