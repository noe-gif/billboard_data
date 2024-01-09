import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  getGridNumericOperators,
  GridFilterInputValueProps,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import Label from '../label/label';
import { Button, TextField } from '@mui/material';

// ----------------------------------------------------------------------

const columns: GridColDef[] = [
  {
    field: 'dashboard',
    headerName: 'dashboard',
    headerClassName: 'dashboard-list-header-class',
    align: 'center',
    headerAlign: 'center',
    width: 300,
  },
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'statut',
    headerClassName: 'dashboard-list-header-class',
    valueOptions: ['actif', 'test', 'désactivé'],
    align: 'center',
    headerAlign: 'center',
    width: 300,
    renderCell: (params) => (
      <Label
        variant="soft"
        color={
          (params.row.status === 'désactivé' && 'error') ||
          (params.row.status === 'test' && 'warning') ||
          'success'
        }
        sx={{ mx: 'auto' }}
      >
        {params.row.status}
      </Label>
    ),
  },
  {
    field: 'compare',
    headerName: 'comparer',
    headerClassName: 'dashboard-list-header-class',
    align: 'center',
    headerAlign: 'center',
    width: 300,
    renderCell: (params) => (
      <Box
        display="flex"
        flexDirection="column"
        style={{ width: '100%', paddingTop: '1%', paddingBottom: 0 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%', paddingTop: '7%', paddingBottom: 0 }}
        >
          <TextField
            placeholder="Solde: 750"
            variant="outlined"
            size="small"
            style={{ width: '40%', height: '90%', paddingRight: 10 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '15%', height: '90%', backgroundColor: '#0a2d52' }}
          >
            Créditer
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="body2" sx={{ fontSize: 12, marginRight: 7, marginBottom: 2 }}>
            Solde: 750
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'pilote',
    headerName: 'piloter',
    headerClassName: 'dashboard-list-header-class',
    align: 'center',
    headerAlign: 'center',
    width: 300,
    renderCell: (params) => (
      <Box
        display="flex"
        flexDirection="column"
        style={{ width: '100%', paddingTop: '1%', paddingBottom: 0 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%', paddingTop: '7%', paddingBottom: 0 }}
        >
          <TextField
            placeholder="Solde: 750"
            variant="outlined"
            size="small"
            style={{ width: '40%', height: '90%', paddingRight: 10 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '15%', height: '90%', backgroundColor: '#0a2d52' }}
          >
            Créditer
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="body2" sx={{ fontSize: 12, marginRight: 7, marginBottom: 2 }}>
            Solde: 750
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'contacts',
    headerName: 'contacts',
    headerClassName: 'dashboard-list-header-class',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    width: 294,
  },
];

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    dashboard: string;
    status: string;
    compare: number;
    pilot: number;
    contacts: number;
  }[];
};

export default function DataGridCustom({ data }: Props) {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    id: false,
  });

  if (columns.length) {
    const ratingColumn = columns.find((column) => column.field === 'rating')!;

    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue,
    }));
    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators,
    };
  }

  const handleChangeColumnVisibilityModel = useCallback((newModel: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(newModel);
  }, []);

  const hiddenFields = ['id', 'action'];

  const getTogglableColumns = () =>
    columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);

  const selected = data.filter((row) => selectedRows.includes(row.id));

  console.info('SELECTED ROWS', selected);

  return (
    <DataGrid
      disableRowSelectionOnClick
      rowSpacingType="margin"
      rows={data}
      columns={columns}
      density="comfortable"
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectedRows(newSelectionModel);
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleChangeColumnVisibilityModel}
      slotProps={{
        columnsPanel: {
          getTogglableColumns,
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue }: GridFilterInputValueProps) {
  return (
    <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
      <Rating
        size="small"
        precision={0.5}
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
      />
    </Box>
  );
}
