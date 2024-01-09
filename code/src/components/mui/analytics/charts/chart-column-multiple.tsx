import Chart, { useChart } from 'src/components/mui/analytics/charts';

// ----------------------------------------------------------------------

type Props = {
  series: {
    name: string;
    data: number[];
  }[];
  options?: any;
};

export default function ChartColumnMultiple({ series, options }: Props) {
  const chartOptions = useChart(
    options
      ? options
      : {
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          tooltip: {
            y: {
              formatter: (value: number) => `$ ${value} thousands`,
            },
          },
          plotOptions: { bar: { columnWidth: '36%' } },
        }
  );

  return (
    <Chart dir="ltr" type="bar" series={series} options={chartOptions} width="100%" height={320} />
  );
}
