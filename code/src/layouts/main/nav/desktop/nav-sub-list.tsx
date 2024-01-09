import Stack from '@mui/material/Stack';
import ListSubheader from '@mui/material/ListSubheader';

import { usePathname } from 'src/routes/hooks';

import { NavSubListProps } from '../types';
import { NavItem, NavItemDashboard } from './nav-item';

export function NavSubList({ data, subheader, sx, ...other }: NavSubListProps) {
  const pathname = usePathname();

  const dashboard = subheader === 'Dashboard';

  return (
    <Stack
      spacing={2}
      flexGrow={1}
      alignItems="flex-start"
      sx={{
        pb: 2,
        ...(dashboard && {
          pb: 0,
          maxWidth: { md: 1 / 3, lg: 540 },
        }),
        ...sx,
      }}
      {...other}
    >
      <ListSubheader
        disableSticky
        sx={{
          p: 0,
          typography: 'overline',
          fontSize: 11,
          color: 'text.primary',
        }}
      >
        {subheader}
      </ListSubheader>

      {data.map((item) =>
        dashboard ? (
          <NavItemDashboard key={item.title} path={item.path} />
        ) : (
          <NavItem
            key={item.title}
            title={item.title}
            path={item.path}
            active={pathname === item.path || pathname === `${item.path}/`}
            subItem
          />
        )
      )}
    </Stack>
  );
}
