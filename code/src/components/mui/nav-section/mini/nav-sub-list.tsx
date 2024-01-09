import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavSubListProps } from '../types';

export default function NavSubList({ data, depth, slotProps }: NavSubListProps) {
  return (
    <Stack spacing={0.5}>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
      ))}
    </Stack>
  );
}
