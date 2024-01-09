import { useRef, useState, useEffect, useCallback } from 'react';

import Popover from '@mui/material/Popover';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';
import { NavListProps } from '../types';
import NavSubList from './nav-sub-list';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const navRef = useRef<HTMLDivElement | null>(null);

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
        ref={navRef}
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        //
        title={data.title}
        path={data.path}
        icon={data.icon}
        //
        depth={depth}
        hasChild={!!data.children}
        externalLink={!!data.path.includes('http')}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />

      {!!data.children && (
        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: 'bottom', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'left' }
          }
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
                mt: '-2px',
                minWidth: 160,
                ...(openMenu && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} />
        </Popover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------
