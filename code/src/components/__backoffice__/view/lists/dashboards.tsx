'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import DataGridCustom from 'src/components/mui/data-grid/data-grid-custom';
import getMockedDashboardData from 'src/utils/mockData';

import { DASHBOARD_GRID_HEIGHT } from 'src/constants/components/__backoffice__/view/lists/dashboard';

export default function DashboardList() {
  const dashboardMockData = getMockedDashboardData();

  return (
    <Card>
      <Box
        sx={{
          height: DASHBOARD_GRID_HEIGHT,
        }}
      >
        <DataGridCustom data={dashboardMockData} />
      </Box>
    </Card>
  );
}
