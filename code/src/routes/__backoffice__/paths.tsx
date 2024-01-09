import SvgColor from 'src/components/mui/svg-color';

const MENU_TABS = [
  {
    value: 'dashboards',
    label: 'dashboards',
    icon: (
      <SvgColor
        src={`/assets/icons/__backoffice__/menu/dashboards_icon.svg`}
        sx={{ color: '#A7B0FF' }}
      />
    ),
  },
  {
    value: 'users',
    label: 'utilisateurs',
    icon: (
      <SvgColor
        src={`/assets/icons/__backoffice__/menu/users_icon.svg`}
        sx={{ color: '#A7B0FF' }}
      />
    ),
  },
];

export const customBreadcrumbsLinks = [
  { name: 'Accueil', href: '#' },
  { name: 'Liste des dashboards', href: '#' },
];

export default MENU_TABS;
