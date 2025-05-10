import { Weather } from "../../../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSideBar } from "../../sidebar";
interface WeatherProps {
  weather: Weather;
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Area: React.FC<WeatherProps> = ({ weather }) => {
  const monthlyTemperatures: number[][] = Array.from({ length: 12 }, () => []);

  weather.time.forEach((date, i) => {
    const month = new Date(date).getMonth(); // 0-11
    monthlyTemperatures[month].push(weather.temperature_2m_max[i]);
  });

  const averageTemperatures = monthlyTemperatures.map(monthArray => {
    const sum = monthArray.reduce((acc, val) => acc + val, 0);
    return monthArray.length > 0 ? sum / monthArray.length : 0;
  });

  const labels = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'short' })
  );
  const backgroundColors = averageTemperatures.map(temp => {
    if (temp < 5) return '#2ecc71';
    if (temp < 15) return '#f1c40f';     
    if (temp < 30) return '#e67e22';     
    return '#e74c3c';                      
  })
const {isOpen} = useSideBar();
  const data = {
    labels,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: averageTemperatures,
        backgroundColor: backgroundColors,
        borderRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: '🌡️ Monthly Average Temperatures',
        color: "#e74c3c",
        font: {
            size: 17,
        }
      }
    }
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh', 
        marginLeft: isOpen ? "240px" : "0",
        transition: "0.5s ease all"
      }}>
        <div style={{ width: '100%', maxWidth: '700px' ,height:"400px"}}>
          <Bar options={options} data={data} />
        </div>
      </div>
  );
};

export default Area;
