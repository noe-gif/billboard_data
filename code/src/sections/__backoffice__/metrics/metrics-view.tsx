'use client';

import Container from '@mui/material/Container';
import { containerStyle } from 'src/theme/overrides/__backoffice__/backoffice-view-styling';
import { CONTAINER_MAX_WIDTH } from 'src/constants/sections/__backoffice__/view/backoffice-view';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import AnalyticsWidgetSummary from 'src/components/mui/analytics/analytics-widget-summary';
import Autocomplete from '@mui/material/Autocomplete';
import ChartMixed from 'src/components/mui/analytics/charts/chart-mixed';
import ChartArea from 'src/components/mui/analytics/charts/chart-area';
import ChartDonut from 'src/components/mui/analytics/charts/chart-donut';
import ChartColumnSingle from 'src/components/mui/analytics/charts/chart-column-single';
import Iconify from 'src/components/mui/iconify';
import { useSearchParams } from 'next/navigation';
import ChartColumnMultiple from 'src/components/mui/analytics/charts/chart-column-multiple';

// ----------------------------------------------------------------------

const campaigns = [
  {
    id: 'thenorthface',
    icon: 'simple-icons:thenorthface',
    color: '#FF0000',
    iconColor: '#FFFFFF',
    textColor: '#FFFFFF',
  },
  {
    id: 'apple',
    icon: 'ic:baseline-apple',
    color: '#000000',
    iconColor: '#FFFFFF',
    textColor: '#FFFFFF',
  },
  {
    id: 'netflix',
    icon: 'simple-icons:netflix',
    color: '#000000',
    iconColor: '#FFFFFF',
    textColor: '#FF0000',
  },
  {
    id: 'aldi',
    icon: 'simple-icons:aldinord',
    color: '#FFDC00',
    iconColor: '#FFFFFF',
    textColor: '#000000',
  },
];

const findCampaignById = (id: string): any => {
  return campaigns.find((campaign) => campaign.id === id);
};

export default function MetricsView() {
  const searchParams = useSearchParams();

  const idFromURL: string | null = searchParams.get('id');

  const { id, color, iconColor, textColor, icon } = idFromURL
    ? (findCampaignById(idFromURL) as {
        id: string;
        icon: string;
        color: string;
        iconColor: string;
        textColor: string;
      })
    : { id: '', icon: '', color: '', iconColor: '', textColor: '' };

  return (
    <Container maxWidth={CONTAINER_MAX_WIDTH} style={containerStyle}>
      <Grid container spacing={2} p={1}>
        {/* Left Side */}
        <Grid item xs={12} md={4}>
          <Box
            width="100%"
            height={150}
            display="flex"
            justifyContent="space-between"
            bgcolor={color}
            borderRadius={1}
            pt={2}
            pl={2}
            sx={{ overflow: 'hidden' }}
          >
            <Box display="flex" flexDirection="column" justifyContent="space-between">
              <Box>
                <Typography variant="h3" color={textColor} fontWeight="bold">
                  Campagne
                </Typography>
                <Typography variant="body1" color={textColor}>
                  98 faces
                </Typography>
              </Box>

              <Typography variant="body1" color={textColor} textAlign="left" pb={2}>
                12/02/23 - 15/03/23
              </Typography>
            </Box>

            <Box
              alignSelf="flex-end"
              justifyContent="flex-end"
              sx={{
                height: '100%',
                marginTop: 10,
                width: 'auto',
                display: 'flex',
                alignItems: 'flex-end',
                pr: 2,
              }}
            >
              <Iconify
                icon={icon}
                style={{
                  height: 'auto',
                  width: 80,
                  color: textColor,
                  zIndex: 10,
                  padding: 0,
                  marginBottom: 5,
                }}
              />
            </Box>
            <Iconify
              icon={icon}
              style={{
                height: 'auto',
                width: 500,
                color: iconColor,
                position: 'fixed',
                alignSelf: 'center',
                marginLeft: 50,
                opacity: '0.3',
                overflow: 'hidden',
              }}
            />
          </Box>

          <Autocomplete
            sx={{ pt: 2 }}
            multiple
            disableClearable
            disablePortal
            onChange={(event: React.SyntheticEvent, newValue: any | null) => {}}
            id="combo-box-demo"
            options={[]}
            renderInput={(params) => <TextField {...params} label="Filtrer" />}
          />
          <Card sx={{ width: '100%', mt: 2, p: 0 }}>
            <CardContent>
              <Typography variant="subtitle2">ODV Totales</Typography>
              <Typography variant="h3" textAlign="left">
                8 740 982
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', mt: 2, p: 0 }}>
            <CardContent>
              <Typography variant="subtitle2">Population Totale</Typography>
              <Typography variant="h5" textAlign="left">
                8M
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', mt: 2, p: 0 }}>
            <CardContent>
              <Typography variant="subtitle2">Répétition Moyenne</Typography>
              <Typography variant="h5" textAlign="left">
                4,2
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '100%', mt: 2, p: 0 }}>
            <CardContent>
              <Typography variant="subtitle2">Audience</Typography>
              <Typography variant="h5" textAlign="left">
                1,1M
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Right Side */}
        <Grid item xs={12} md={8}>
          <Grid item xs={12} sx={{ height: '800px', overflowY: 'scroll' }} p={1}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
              <Card sx={{ width: '100%', mb: { xs: 2, sm: 0, md: 0 } }}>
                <CardHeader title="Répartition du temps passé dans chaque zone" />
                <CardContent>
                  <ChartDonut
                    options={{
                      labels: ['Paris petite couronne', 'Paris intramuros', 'Paris grande courone'],
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#EBEBEB',
                        '#000000',
                      ],
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
                    }}
                    series={[44, 55, 13]}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="ODV et répétition par jour de la semaine" />
                <CardContent>
                  <ChartColumnMultiple
                    series={[
                      {
                        name: 'Net Profit',
                        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                      },
                      {
                        name: 'Revenue',
                        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                      },
                    ]}
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#000000',
                      ],
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
                          formatter: (value: number) => `${value}%`,
                        },
                      },
                      plotOptions: { bar: { columnWidth: '60%' } },
                    }}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* _____ */}

            <Box
              display="flex"
              sx={{ mt: 1 }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              width="100%"
            >
              <Card sx={{ width: '100%', mb: { xs: 2, sm: 0, md: 0 } }}>
                <CardHeader title="Répartition par jour de la semaine" />
                <CardContent>
                  <ChartColumnSingle
                    series={[
                      {
                        name: 'Net Profit',
                        data: [44, 55, 57, 56, 61, 58, 63],
                      },
                    ]}
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#000000',
                      ],
                      plotOptions: {
                        bar: {
                          columnWidth: '30%',
                        },
                      },
                      stroke: {
                        show: false,
                      },
                      xaxis: {
                        categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                      },
                      tooltip: {
                        y: {
                          formatter: (value: number) => `${value}%`,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Evolution des ODVs par semaine" />
                <CardContent>
                  <ChartArea
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#000000',
                      ],
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
                    }}
                    series={[
                      { name: 'semaine 1', data: [31, 40, 28, 51, 42, 109, 100] },
                      { name: 'semaine 2', data: [11, 32, 45, 32, 34, 52, 41] },
                    ]}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* ________ */}
            <Box
              display="flex"
              sx={{ mt: 1 }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              width="100%"
            >
              <Card sx={{ width: '100%', mb: { xs: 2, sm: 0, md: 0 } }}>
                <CardHeader title="Répartition par tranches horaires" />
                <CardContent>
                  <ChartArea
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                      ],
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
                    }}
                    series={[{ name: 'semaine 1', data: [31, 40, 28, 51, 42, 109, 100] }]}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Charte professions" />
                <CardContent>
                  <ChartColumnMultiple
                    series={[
                      {
                        name: 'Addresse 1',
                        data: [44, 55, 57, 56, 61, 58, 63],
                      },
                      {
                        name: 'Addresse 2',
                        data: [76, 85, 101, 98, 87, 105, 91],
                      },
                    ]}
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#000000',
                      ],
                      stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent'],
                      },
                      xaxis: {
                        categories: [
                          'Artisans',
                          'Cadres',
                          'Profs',
                          'Employés',
                          'Ouvriers',
                          'Retraités',
                          'Inactifs',
                        ],
                      },
                      tooltip: {
                        y: {
                          formatter: (value: number) => `${value}%`,
                        },
                      },
                      plotOptions: { bar: { columnWidth: '60%' } },
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
