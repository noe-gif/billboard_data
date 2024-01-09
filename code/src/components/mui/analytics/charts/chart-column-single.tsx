import Chart, { useChart } from 'src/components/mui/analytics/charts';

// ----------------------------------------------------------------------

type Props = {
  series: {
    name: string;
    data: number[];
  }[];
  options?: any;
};

export default function ChartColumnSingle({ series, options }: Props) {
  const chartOptions = useChart(
    options
      ? options
      : {
          plotOptions: {
            bar: {
              columnWidth: '16%',
            },
          },
          stroke: {
            show: false,
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          tooltip: {
            y: {
              formatter: (value: number) => `$ ${value} thousands`,
            },
          },
        }
  );

  return (
    <Chart dir="ltr" type="bar" series={series} options={chartOptions} width="100%" height={320} />
  );
}
