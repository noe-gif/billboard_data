import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  value: number;
  totalAmount: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
  colorFind: string;
}

export default function EcommerceSalesOverview({
  colorFind,
  title,
  subheader,
  data,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {data.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} colorFind={colorFind} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: ItemProps;
  colorFind: string;
};

function ProgressItem({ progress, colorFind }: ProgressItemProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="subtitle2">{progress.totalAmount}</Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        sx={{ color: colorFind }}
        color={'inherit'}
      />
    </Stack>
  );
}
