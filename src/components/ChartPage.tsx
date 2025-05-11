import type { FC } from 'react';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

import dummyData from '../data/dummyData.json';

interface SocialMediaData {
  title: string;
  alias: string;
  download: {
    [year: string]: number;
  };
}

interface SocialMediaDataset {
  year: string[];
  [platform: string]: SocialMediaData | string[];
}

interface ChartPageProps {
  chartView: string;
}

const thisData: SocialMediaDataset = dummyData;
const labels: string[] = thisData.year as string[];

export const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    
    title: {
      display: true,
      text: 'Social Media Downloads by Year',
    },
  },
  animation: {
    duration: 2000,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 5,
      hoverRadius: 8,
      hoverBorderWidth: 2,
    },
  },
};

const ChartPage: FC<ChartPageProps> = ({ chartView }) => {
  const [dataView, setDataView] = useState<string>(chartView || 'tiktok');

  useEffect(() => {
    if (chartView) {
      setDataView(chartView);
    }
  }, [chartView]);

  const prepareChartData = () => {
    const platform = thisData[dataView] as SocialMediaData | undefined;

    if (!platform) {
      return {
        labels,
        datasets: [
          {
            label: 'No Data',
            data: Array(labels.length).fill(0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    }

    const downloadData = labels.map((year: string) => platform.download[year] || 0);

    return {
      labels,
      datasets: [
        {
          label: platform.title || dataView,
          data: downloadData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 2,
          pointHoverBackgroundColor: 'white',
          segment: {
            borderColor: (ctx: {
              p0: { parsed: { y: number } };
              p1: { parsed: { y: number } };
            }) =>
              ctx.p0.parsed.y < ctx.p1.parsed.y
                ? 'rgba(75, 192, 192, 1)'
                : 'rgba(255, 99, 132, 1)',
          },
        },
      ],
    };
  };

  const data = prepareChartData();

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">
          {dataView && thisData[dataView] && (thisData[dataView] as SocialMediaData).title}
        </h2>
        <p className="text-gray-600 italic">
          {dataView && thisData[dataView] && (thisData[dataView] as SocialMediaData).alias}
        </p>
      </div>
      <div className='w-full h-auto'>
        <Line key={dataView} options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartPage;
