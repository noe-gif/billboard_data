'use client';

import Container from '@mui/material/Container';
import { containerStyle } from 'src/theme/overrides/__backoffice__/backoffice-view-styling';
import { CONTAINER_MAX_WIDTH } from 'src/constants/sections/__backoffice__/view/backoffice-view';
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import AnalyticsWidgetSummary from 'src/components/mui/analytics/analytics-widget-summary';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { axiosDataInstance } from 'src/utils/axios';
import ChartMixed from 'src/components/mui/analytics/charts/chart-mixed';
import ChartArea from 'src/components/mui/analytics/charts/chart-area';
import ChartDonut from 'src/components/mui/analytics/charts/chart-donut';
import ChartColumnSingle from 'src/components/mui/analytics/charts/chart-column-single';

import data_pois from 'src/data/pois.json';
import AppWidgetSummary from './app-widget-summary';
import EcommerceWidgetSummary from './ecommerce-widget-summary';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const SEIKI_API_KEY =
  '3BW0xPX_I_nn6G740mASNrgczM4Ob6ZdoiAdg7dS4D7BTTletZbbX2FiEUVueQlfnC_CZpU9HFWVDEwTEBG5GAvN9ysovobF2M7h_AyuWwd2hAsE97TkVAArSx328l0AQhX0VA';

export default function BackofficeView() {
  const [options, setOptions] = useState<any>([
    'Sud Ouest',
    'Sud Est',
    'Nord',
    'Ouest',
    'Est',
    'Paris',
  ]);
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken:
        'pk.eyJ1IjoiY2VkZDYzIiwiYSI6ImNsZW9jOGw3dzAweWkzdnA0d2x1OTlmdWEifQ.LriN88jj84uWQ_9i28-JpA',
      style: 'mapbox://styles/cedd63/clex46fnm001p01o524b1uyfq',
      center: [10, 40],
      zoom: 1,
      pitch: 0,
      bearing: 0,
    });
    data_pois.pois.forEach(function (location) {
      new mapboxgl.Marker({ scale: 0.5, color: theme.palette.primary.light })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);
    });
    setTimeout(() => {
      map.current.flyTo({
        center: [1.888334, 46.603354],
        duration: 12000,
        essential: true,
        zoom: 5,
        pitch: 20,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosDataInstance.get('/overview', {
        headers: { key: SEIKI_API_KEY },
      });
      setData(response.data);
    };

    fetchData();
  }, []);
  const theme = useTheme();

  const colorsMixed = [theme.palette.primary.light, theme.palette.primary.main, '#EAEAEA'];

  const getLinearGrowthData = () => {
    const initialData = 30;
    return Array.from(
      { length: 12 },
      (_, index) => initialData + Math.floor(Math.random() * 20) * index
    );
  };

  const dataLpTrack = getLinearGrowthData();

  return (
    <Container maxWidth={CONTAINER_MAX_WIDTH} style={containerStyle}>
      <Grid container spacing={2} p={1}>
        {/* Left Side */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Grid item xs={12} md={6} pb={2}>
              <AppWidgetSummary
                title="Total réseaux"
                percent={2.6}
                total={286}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EcommerceWidgetSummary
                title="Campagnes"
                percent={2.6}
                total={6}
                chart={{
                  series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                }}
              />
            </Grid>
          </Grid>
          <Autocomplete
            sx={{ pb: 2 }}
            multiple
            disableClearable
            disablePortal
            onChange={(event: React.SyntheticEvent, newValue: any | null) => {
              map.current = new mapboxgl.Map({
                container: mapContainer.current,
                accessToken:
                  'pk.eyJ1IjoiY2VkZDYzIiwiYSI6ImNsZW9jOGw3dzAweWkzdnA0d2x1OTlmdWEifQ.LriN88jj84uWQ_9i28-JpA',
                style: 'mapbox://styles/cedd63/clex46fnm001p01o524b1uyfq',
                center: [10, 40],
                zoom: 1,
                pitch: 0,
                bearing: 0,
              });
              data_pois.pois.forEach(function (location) {
                if (newValue.includes(location.sous_reseau))
                  new mapboxgl.Marker({ scale: 0.5 })
                    .setLngLat([location.longitude, location.latitude])
                    .addTo(map.current);
              });
              setTimeout(() => {
                map.current.flyTo({
                  center: [1.888334, 46.603354],
                  duration: 3000,
                  essential: true,
                  zoom: 5,
                  pitch: 20,
                });
              }, 1000);

              // setData(computeData(newValue));
            }}
            id="combo-box-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Filtrer sous-réseau" />}
          />
          <div
            ref={mapContainer}
            style={{
              height: '500px',
              overflow: 'hidden',
              borderRadius: '20px',
              marginTop: '1%',
            }}
          />
        </Grid>
        {/* Right Side */}
        <Grid item xs={12} md={8}>
          <Grid item sx={{ pb: 2 }}>
            <Grid container justifyContent="space-around">
              <Grid item sx={{ width: '20%' }}>
                <Button variant="contained" sx={{ width: '100%' }}>
                  Afficher un réseau
                </Button>
              </Grid>
              <Grid item sx={{ width: '20%' }}>
                <Button variant="contained" sx={{ width: '100%' }}>
                  Constituer un réseau
                </Button>
              </Grid>
              <Grid item sx={{ width: '20%' }}>
                <Button variant="contained" sx={{ width: '100%' }}>
                  Simuler une campagne
                </Button>
              </Grid>
              <Grid item sx={{ width: '20%' }}>
                <Button variant="contained" sx={{ width: '100%' }}>
                  Suivre une campagne
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ height: '760px', overflowY: 'scroll' }} p={1}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
              <Card sx={{ width: '100%', mb: { xs: 2, sm: 0, md: 0 } }}>
                <CardHeader title="Potentiel de réseaux" />
                <CardContent>
                  <ChartMixed
                    options={{
                      colors: colorsMixed,
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
                        name: 'Réseau A',
                        type: 'column',
                        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                      },
                      {
                        name: 'Réseau B',
                        type: 'area',
                        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                      },
                      {
                        name: 'Réseau C',
                        type: 'line',
                        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                      },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Saisonnalité - moyenne annuelle 100%" />
                <CardContent>
                  <ChartArea
                    options={{
                      xaxis: {
                        type: 'datetime',
                        categories: [
                          '2018-01-01T00:00:00.000Z',
                          '2018-02-01T00:00:00.000Z',
                          '2018-03-01T00:00:00.000Z',
                          '2018-04-01T00:00:00.000Z',
                          '2018-05-01T00:00:00.000Z',
                          '2018-06-01T00:00:00.000Z',
                          '2018-07-01T00:00:00.000Z',
                          '2018-08-01T00:00:00.000Z',
                          '2018-09-01T00:00:00.000Z',
                          '2018-10-01T00:00:00.000Z',
                          '2018-11-01T00:00:00.000Z',
                          '2018-12-01T00:00:00.000Z',
                        ],
                      },
                      tooltip: {
                        x: {
                          format: 'dd/MM/yy HH:mm',
                        },
                      },
                    }}
                    series={[
                      {
                        name: 'series1',
                        data: dataLpTrack,
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
                <CardHeader title="Répartition par département" />
                <CardContent>
                  <ChartDonut
                    options={{
                      colors: [
                        theme.palette.primary.lighter,
                        theme.palette.primary.light,
                        theme.palette.primary.main,
                        theme.palette.primary.darker,
                      ],
                      labels: ['Moselle', 'Nord', 'Seine-Et-Marne', 'Essonne'],
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
                    series={[40, 40, 10, 10]}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Motifs de déplacement" />
                <CardContent>
                  <ChartColumnSingle
                    options={{
                      colors: [theme.palette.primary.light],
                      plotOptions: {
                        bar: {
                          columnWidth: '40%',
                        },
                      },
                      stroke: {
                        show: false,
                      },
                      xaxis: {
                        categories: [
                          'achats',
                          'Travail',
                          'Domicile',
                          'Tourisme',
                          'Éducation',
                          'Santé',
                          'Loisirs',
                          'Alimentation',
                          'Transport',
                          'Autres',
                        ],
                      },
                      tooltip: {
                        y: {
                          formatter: (value: number) => `$ ${value} thousands`,
                        },
                      },
                    }}
                    series={[
                      {
                        name: 'Net Profit',
                        data: [44, 10, 15, 56, 61, 44, 55, 20, 90, 61],
                      },
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
                <CardHeader title="Répartition par sexe" />
                <CardContent>
                  <ChartDonut
                    options={{
                      colors: [theme.palette.primary.lighter, theme.palette.primary.light],
                      labels: ['Femmes', 'Hommes'],
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
                    series={[60, 40]}
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: '100%', ml: 1 }}>
                <CardHeader title="Répartition par mode de transport" />
                <CardContent>
                  <ChartDonut
                    options={{
                      colors: [
                        theme.palette.primary.lighter,
                        theme.palette.primary.light,
                        theme.palette.primary.main,
                      ],
                      labels: ['Mode doux', 'Véhicules', 'Transports en commun'],
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
                    series={[40, 40, 20]}
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
