import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/mui/iconify';
import SvgColor from 'src/components/mui/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const customIcon = (name: string) => (
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  network: customIcon('iconoir:network-solid'),
  campaign: customIcon('ic:round-campaign'),
  simulation: customIcon('solar:test-tube-bold'),
  apple: customIcon('ic:baseline-apple'),
  thenorthface: customIcon('simple-icons:thenorthface'),
  netflix: customIcon('simple-icons:netflix'),
  aldi: customIcon('simple-icons:aldinord'),
};

// ----------------------------------------------------------------------

export function useBackofficeNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      {
        subheader: 'Réseaux',
        items: [
          {
            title: 'Mon réseau',
            path: '/',
            icon: ICONS.network,
          },
        ],
      },
      {
        subheader: 'Campagnes',
        items: [
          {
            title: 'Mes campagnes',
            path: paths.backoffice.campaigns,
            icon: ICONS.campaign,
            children: [
              {
                title: t('Liste'),
                path: paths.backoffice.campaigns,
              },
              {
                title: t('Apple'),
                path: paths.backoffice.campaignMetrics + '?id=apple',
                icon: ICONS.apple,
                children: [
                  {
                    title: t('KPIs media'),
                    path: paths.backoffice.campaignMetrics + '?id=apple',
                  },
                  {
                    title: t('KPIs trafic'),
                    path: paths.backoffice.campaignSimulation + '?id=apple',
                  },
                ],
              },
              {
                title: t('The North Face'),
                path: '#',
                icon: ICONS.thenorthface,
                children: [
                  {
                    title: t('KPIs media'),
                    path: paths.backoffice.campaignMetrics + '?id=thenorthface',
                  },
                  {
                    title: t('KPIs trafic'),
                    path: paths.backoffice.campaignSimulation + '?id=thenorthface',
                  },
                ],
              },
              {
                title: t('Netflix'),
                path: '#',
                icon: ICONS.netflix,
                children: [
                  {
                    title: t('KPIs media'),
                    path: paths.backoffice.campaignMetrics + '?id=netflix',
                  },
                  {
                    title: t('KPIs trafic'),
                    path: paths.backoffice.campaignSimulation + '?id=netflix',
                  },
                ],
              },
              {
                title: t('Aldi'),
                path: '#',
                icon: ICONS.aldi,
                children: [
                  {
                    title: t('KPIs media'),
                    path: paths.backoffice.campaignMetrics + '?id=aldi',
                  },
                  {
                    title: t('KPIs trafic'),
                    path: paths.backoffice.campaignSimulation + '?id=aldi',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
