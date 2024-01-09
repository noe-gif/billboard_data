'use client';

import Card from '@mui/material/Card';

import { getMockedUsersData } from 'src/utils/mockData';

import UsersInterface from 'src/types/mockData';
import CollapsibleTable from 'src/components/mui/data-grid/data-grid-user';

export default function UserList() {
  const rows: UsersInterface[] = getMockedUsersData();

  return (
    <Card>
      <CollapsibleTable rows={rows} />
    </Card>
  );
}
