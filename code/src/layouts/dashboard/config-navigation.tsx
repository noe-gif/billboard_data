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
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  compare: customIcon('solar:three-squares-bold-duotone'),
  cartographics: customIcon('fluent:location-12-filled'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('compare'),
            path: '#',
            icon: ICONS.analytics,
            children: [
              { title: t('fréquentation'), path: '#' },
              { title: t('suivi'), path: '#' },
              { title: t('intensité'), path: '#' },
              { title: t('motifs'), path: '#' },
              { title: t('qualification'), path: '#' },
              { title: t('comparateur'), path: '#' },
            ],
          },
          {
            title: t('pilot'),
            path: '#',
            icon: ICONS.compare,
            children: [
              { title: t('fréquentation'), path: '#' },
              { title: t('suivi'), path: '#' },
              { title: t('intensité'), path: '#' },
              { title: t('motifs'), path: '#' },
              { title: t('origin'), path: '#' },
              { title: t('qualification'), path: '#' },
            ],
          },
        ],
      },

      {
        subheader: t('cartographic'),
        items: [
          // USER
          {
            title: t('maps'),
            path: '#',
            icon: ICONS.cartographics,
            children: [{ title: t('3dviews'), path: '#' }],
          },
        ],
      },
      {
        subheader: t('adresses'),
        items: [],
      },
    ],
    [t]
  );

  return data;
}
