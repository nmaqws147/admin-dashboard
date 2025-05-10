import EarningImg from '../img/welcome-bg.svg';
import { User } from '../../App';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSideBar } from '../sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface CartProps {
  earning: User[];
}

const Ecommerce: React.FC<CartProps> = (props) => {
  const totalPrices = props.earning.flatMap(earn => earn.products.map(product => Number(product.price))).reduce((acc, curr) => acc + curr, 0);
  const totalDisCounted = props.earning.map(disCount => Number(disCount.discountedTotal)).reduce((acc, curr) => acc + curr, 0);
  const budget = props.earning.map(budget => Number(budget.total)).reduce((acc, curr) => acc + curr, 0);
  const allRevenue = totalDisCounted - totalPrices;

  const data = {
    labels: ['This Month'],
    datasets: [
      {
        label: "Revenue",
        data: [allRevenue],
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        barThickness: 50,
      },
      {
        label: "Budget",
        data: [budget],
        backgroundColor: '#1abafa',
        borderRadius: 10,
        barThickness: 50,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const { isOpen } = useSideBar();

  return (
    <div className="e-commerce pe-5">
      <div className="container" style={{ marginLeft: isOpen ? "240px" : "50px", transition: '0.5s ease all' , marginBottom:"50px"}}>
        
        {/* Earning section */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center">
            <div className="img-container" style={{ position: "relative", marginBottom: '20px' }}>
              <img
                src={EarningImg}
                alt="earningImg"
                className="earning img-fluid"
                style={{
                  width: '100%',        // Set width to 50% for a smaller image
                  maxWidth: '600px',   // Maximum width of 500px
                  height: 'auto',      // Maintain aspect ratio
                  margin: '0 auto',
                }}
              />
              <div style={{ position: "absolute", top: "20px", left: "20px" }}>
                <h3 className='text-secondary fs-5'>Earning</h3>
                <h5>{`$${parseInt(totalPrices.toFixed(2))}`}</h5>
                <button className="btn btn-info text-light mt-2">Download</button>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue and Chart (Side-by-side for large screens) */}
        <div className="row">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <div className="revenue-updates text-center">
              <p className="fs-5">Revenue Updates</p>
              <div className="budget">
                <h5>${budget.toFixed(2)}</h5>
                <p className="budget-text text-secondary fw-bold">Budget</p>
              </div>
              <div className="revenue">
                <h5>${allRevenue.toFixed(2)}</h5>
                <p className="revenue-text text-secondary fw-bold">Revenue</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <div className="chart-container" style={{ width: '100%', height: '300px' }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
