import Chart, { useChart } from 'src/components/mui/analytics/charts';

// ----------------------------------------------------------------------

type Props = {
  series: {
    name: string;
    type: string;
    data: number[];
  }[];
  options?: any;
};

export default function ChartMixed({ series, options }: Props) {
  const chartOptions = useChart(
    options
      ? options
      : {
          stroke: {
            width: [0, 2, 3],
          },
          plotOptions: {
            bar: { columnWidth: '20%' },
          },
          fill: {
            type: ['solid', 'gradient', 'solid'],
          },
          labels: [
            '01/01/2003',
            '02/01/2003',
            '03/01/2003',
            '04/01/2003',
            '05/01/2003',
            '06/01/2003',
            '07/01/2003',
            '08/01/2003',
            '09/01/2003',
            '10/01/2003',
            '11/01/2003',
          ],
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            title: { text: 'Points' },
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: (value: number) => {
                if (typeof value !== 'undefined') {
                  return `${value.toFixed(0)} points`;
                }
                return value;
              },
            },
          },
        }
  );

  return (
    <Chart dir="ltr" type="line" series={series} options={chartOptions} width="100%" height={320} />
  );
}
