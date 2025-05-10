import React, { useEffect, useRef } from 'react';
import { useSideBar } from '../../sidebar';
import {
  Chart,
  LineElement,
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(
  LineElement,
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Filler
);

interface Props {
  financial: [number, number][]; 
}

const FinancialChart: React.FC<Props> = ({ financial }) => {
    const {isOpen} = useSideBar();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || financial.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line', 
      data: {
        labels: financial.map(([timestamp]) => new Date(timestamp)),
        datasets: [
          {
            label: 'Bitcoin Price (USD)',
            data: financial.map(([, price]) => price),
            borderColor: '#4169E1',
            fill: true, 
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '₿ Bitcoin Price Over Time',
            font: {
              size: 20,
              weight: 'bold',
            },
            color: '#F7931A',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Date',
              color: '#4169E1',
              font: {
                size: 14,
              },
            },
            ticks: {
              color: '#4169E1',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price in USD',
              color: '#4169E1',
              font: {
                size: 14,
              },
            },
            ticks: {
              color: '#4169E1',
            },
          },
        },
      },
    });

    chartInstanceRef.current = chart;

    return () => {
      chart.destroy();
    };
  }, [financial]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: '90vw',
        height: '65vh',
        marginLeft: isOpen ? '240px' : '0', 
        transition: '0.5s ease all',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '60vh',
        }}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default FinancialChart;

