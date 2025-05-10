import { Products } from "../../../App";
import { Pie } from "react-chartjs-2";
import { useSideBar } from "../../sidebar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface CostsProps {
  products: Products[];
}

const PieChart: React.FC<CostsProps> = ({ products }) => {
    const {isOpen} = useSideBar();
  const getTotal = (category: 'beauty' | 'groceries' | 'furniture') =>
    products
      .filter(cost => cost.category === category)
      .reduce((total, cost) => total + cost.price, 0);

  const beauty = getTotal('beauty');
  const groceries = getTotal('groceries');
  const furniture = getTotal('furniture');

  const data = {
    labels: ['Beauty', 'Groceries', 'Furniture'],
    datasets: [
      {
        label: 'Total Cost in $',
        data: [beauty, groceries, furniture],
        backgroundColor: [
        '#A78BFA', 
        '#34D399', 
        '#FBBF24', 
        ],
        borderColor: [
        '#F7C8CF',
        '#B8E6B8',
        '#B0C4DE',
        ],
        borderWidth: 1,
        hoverOffset: 12,
        hoverBorderColor: '#333',
        hoverBorderWidth: 2,
    }
    ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#777',
              font: { size: 14 }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}% ($${value.toFixed(2)})`;
              }
            }
          },
          title: {
            display: true,
            text: '🛍️ Product Costs by Category',
            color: '#FBBF24',
            font: {
              size: 20,
              weight: 'bold' as const,
            }
          }
        },
      };
      

    return (
        <div
        style={{
            width: "100%",
            height: "60vh", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box",
            transition: "0.5s ease all",
            marginLeft: isOpen ? "240px" : "0",
            
          }}
      >
        <Pie data={data} options={options} />
      </div>
    );
};

export default PieChart;
