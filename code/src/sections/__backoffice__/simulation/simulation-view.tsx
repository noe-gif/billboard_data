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
import AppWidgetSummary from '../view/app-widget-summary';
import { fNumber } from 'src/utils/format-number';
import BankingExpensesCategories from '../view/banking-expenses-categories';
import { _ecommerceSalesOverview } from 'src/_mock';
import EcommerceSalesOverview from '../view/ecommerce-sales-overview';

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

export default function SimulationView() {
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
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              width="50%"
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
                    width: 50,
                    color: textColor,
                    zIndex: 10,
                    padding: 0,
                    marginLeft: 10,
                    marginBottom: 5,
                  }}
                />
              </Box>
              <Iconify
                icon={icon}
                style={{
                  height: 'auto',
                  width: 250,
                  color: iconColor,
                  position: 'fixed',
                  alignSelf: 'center',
                  marginLeft: 40,
                  opacity: '0.3',
                  overflow: 'hidden',
                }}
              />
            </Box>
            <AppWidgetSummary
              title="Trafic journalier"
              percent={24}
              total={10598}
              chart={{
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                options: {
                  colors: [color, '#EAEAEA'],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorStops: [
                        { offset: 0, color: color, opacity: 1 },
                        { offset: 100, color: '#EAEAEA', opacity: 1 },
                      ],
                    },
                  },
                  chart: {
                    sparkline: {
                      enabled: true,
                    },
                  },
                  plotOptions: {
                    bar: {
                      columnWidth: '68%',
                      borderRadius: 2,
                    },
                  },
                  tooltip: {
                    x: { show: false },
                    y: {
                      formatter: (value: number) => fNumber(value),
                      title: {
                        formatter: () => '',
                      },
                    },
                    marker: { show: false },
                  },
                },
              }}
              sx={{ p: 2, borderRadius: 1, width: '48%', ml: 2 }}
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
          <EcommerceSalesOverview
            sx={{ mt: 2 }}
            colorFind={color}
            title="Temps d'exposition"
            data={_ecommerceSalesOverview}
          />
        </Grid>
        {/* Right Side */}
        <Grid item xs={12} md={8}>
          <Grid item xs={12} sx={{ height: '800px', overflowY: 'scroll' }} p={1}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
              <Card sx={{ width: '100%', mb: { xs: 2, sm: 0, md: 0 } }}>
                <CardHeader title="Saisonnalité - moyenne annuelle 100%" />
                <CardContent>
                  <ChartMixed
                    options={{
                      colors: [
                        color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                        '#000000',
                        '#BABABA',
                      ],
                      fill: {
                        type: ['solid', 'gradient', 'solid'],
                      },
                      stroke: {
                        width: [0, 2, 3],
                      },
                      plotOptions: {
                        bar: { columnWidth: '20%' },
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
                    }}
                    series={[
                      {
                        name: 'Tous les hôtels',
                        type: 'column',
                        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                      },
                      {
                        name: 'ANGERS NORD - Rosettes',
                        type: 'area',
                        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                      },
                      {
                        name: 'ANGERS EST - St Barthelemy',
                        type: 'line',
                        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                      },
                    ]}
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
                <CardHeader title="Motifs de déplacement" />
                <CardContent>
                  <ChartColumnMultiple
                    series={[
                      {
                        name: 'Nombre de déplacements par jour',
                        data: [44, 55, 57, 56, 61, 58, 63],
                      },
                      {
                        name: 'Tous les hôtels',
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
                      plotOptions: { bar: { columnWidth: '30%' } },
                    }}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Répartition horaire" />
                <CardContent>
                  <ChartColumnMultiple
                    series={[
                      {
                        name: 'ANGERS EST',
                        data: [
                          44, 55, 57, 56, 61, 58, 63, 44, 55, 57, 56, 61, 58, 63, 44, 55, 57, 56,
                          61, 58, 63, 23, 18,
                        ],
                      },
                      {
                        name: 'Tous les hôtels',
                        data: [
                          44, 55, 57, 56, 61, 58, 63, 44, 55, 57, 56, 61, 58, 63, 44, 55, 57, 56,
                          61, 58, 63, 23, 18,
                        ],
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
                          '00h',
                          '01h',
                          '02h',
                          '03h',
                          '04h',
                          '05h',
                          '06h',
                          '07h',
                          '08h',
                          '09h',
                          '10h',
                          '11h',
                          '12h',
                          '13h',
                          '14h',
                          '15h',
                          '16h',
                          '17h',
                          '18h',
                          '19h',
                          '20h',
                          '21h',
                          '22h',
                          '23h',
                        ],
                      },
                      tooltip: {
                        y: {
                          formatter: (value: number) => `${value}%`,
                        },
                      },
                      plotOptions: { bar: { columnWidth: '70%' } },
                    }}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* ________ */}
            <BankingExpensesCategories
              sx={{ mt: 1 }}
              title="Taux de pénétration"
              chart={{
                series: [
                  { label: 'Paris', value: 27 },
                  { label: 'Ile-De-France', value: 29 },
                  { label: 'Autres régions', value: 21 },
                  { label: 'International', value: 22 },
                ],
                colors: [
                  color === '#000000' ? (id === 'netflix' ? '#FF3838' : '#67C8FF') : color,
                  '#000000',
                  '#BABABA',
                  '#DEDEDE',
                ],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
