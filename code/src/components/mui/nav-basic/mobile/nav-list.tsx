import { useState, useEffect, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';
import { NavListProps } from '../types';
import NavSubList from './nav-sub-list';
// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const pathname = usePathname();

  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(active);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
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
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} />
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------
