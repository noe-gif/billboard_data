import { useState, useEffect, useCallback } from 'react';

import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { paper } from 'src/theme/css';

import { NavItem } from './nav-item';
import { NavListProps } from '../types';
import { NavSubList } from './nav-sub-list';
import { HEADER } from '../../../config-layout';

// ----------------------------------------------------------------------

export default function NavList({ data }: NavListProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true);
    }
  }, [data.children]);

  return (
    <>
      <NavItem
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        //
        title={data.title}
        path={data.path}
        //
        hasChild={!!data.children}
        externalLink={data.path.includes('http')}
        //
        active={active}
      />

      {!!data.children && openMenu && (
        <Portal>
          <Fade in={openMenu}>
            <Paper
              onMouseEnter={handleOpenMenu}
              onMouseLeave={handleCloseMenu}
              sx={{
                ...paper({ theme }),
                left: 0,
                right: 0,
                m: 'auto',
                display: 'flex',
                borderRadius: 2,
                position: 'fixed',
                zIndex: theme.zIndex.modal,
                p: theme.spacing(5, 1, 1, 3),
                top: HEADER.H_DESKTOP_OFFSET,
                maxWidth: theme.breakpoints.values.lg,
                boxShadow: theme.customShadows.dropdown,
              }}
            >
              {data.children.map((list) => (
                <NavSubList key={list.subheader} subheader={list.subheader} data={list.items} />
              ))}
            </Paper>
          </Fade>
        </Portal>
      )}
    </>
  );
}
