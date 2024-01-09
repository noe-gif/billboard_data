import Chart, { useChart } from 'src/components/mui/analytics/charts';

// ----------------------------------------------------------------------

type Props = {
  series: number[];
  options?: any;
};

export default function ChartDonut({ series, options }: Props) {
  const chartOptions = useChart(
    options
      ? options
      : {
          labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
          stroke: {
            show: false,
          },
          legend: {
            horizontalAlign: 'center',
          },
          tooltip: {
            fillSeriesColor: false,
          },
          plotOptions: {
            pie: {
              donut: {
                size: '80%',
              },
            },
          },
        }
  );

  return (
    <Chart
      dir="ltr"
      type="donut"
      series={series}
      options={chartOptions}
      width={400}
      height="auto"
    />
  );
}
