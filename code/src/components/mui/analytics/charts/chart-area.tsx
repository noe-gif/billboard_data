import Chart, { useChart } from 'src/components/mui/analytics/charts';

// ----------------------------------------------------------------------

type Props = {
  series: {
    name: string;
    data: number[];
  }[];
  options?: any;
};

export default function ChartArea({ series, options }: Props) {
  const chartOptions = useChart(
    options
      ? options
      : {
          xaxis: {
            type: 'datetime',
            categories: [
              '2018-09-19T00:00:00.000Z',
              '2018-09-19T01:30:00.000Z',
              '2018-09-19T02:30:00.000Z',
              '2018-09-19T03:30:00.000Z',
              '2018-09-19T04:30:00.000Z',
              '2018-09-19T05:30:00.000Z',
              '2018-09-19T06:30:00.000Z',
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        }
  );

  return (
    <Chart dir="ltr" type="area" series={series} options={chartOptions} width="100%" height={320} />
  );
}
