'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { visuallyHidden } from '@mui/utils';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Paper, TablePagination, TableSortLabel } from '@mui/material';

import Iconify from 'src/components/mui/iconify';
import UsersInterface from 'src/types/mockData';
import { createData } from 'src/utils/mockData';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | any },
  b: { [key in Key]: number | string | any }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof UsersInterface;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'company',
    numeric: false,
    disablePadding: true,
    label: 'société',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'nom',
  },
  {
    id: 'surname',
    numeric: true,
    disablePadding: false,
    label: 'prénom',
  },
  {
    id: 'occupation',
    numeric: true,
    disablePadding: false,
    label: 'fonction',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'email',
  },
  {
    id: 'dashboards',
    numeric: true,
    disablePadding: false,
    label: 'dashboards',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UsersInterface) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof UsersInterface) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            p: 3,
            '&.MuiTableCell-root': {
              zIndex: 10,
              backgroundColor: '#0a2d52',
              backgroundImage: 'none',
              color: 'white',
            },
          }}
        />
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              p: 3,
              '&.MuiTableCell-root': {
                backgroundColor: '#0a2d52',
                backgroundImage: 'none',
                color: 'white',
              },
              '&.Mui-active': {
                color: 'white',
              },
            }}
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '&.Mui-active': {
                  color: '#4D6275',
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="left"></TableCell>
        <TableCell align="left" sx={{ pl: 3 }}>
          {row.company}
        </TableCell>
        <TableCell align="center" sx={{ pr: 5 }}>
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ pr: 5 }}>
          {row.surname}
        </TableCell>
        <TableCell align="center" sx={{ pr: 5 }}>
          {row.occupation}
        </TableCell>
        <TableCell align="center" sx={{ pr: 5 }}>
          {row.email}
        </TableCell>
        <TableCell align="center">
          {row.dashboards}
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="center"
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 5 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, marginLeft: 10 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.dashboardList.map((dashboard) => (
                    <TableRow key={dashboard.id}>
                      <TableCell component="th" scope="row">
                        {`${dashboard.name} ${dashboard.id}`}
                        <IconButton size="small" sx={{ ml: 2 }}>
                          <Iconify width={16} icon="mdi:eye" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

type CollapsibleTableProps = {
  rows: UsersInterface[];
};
const CollapsibleTable = ({ rows }: CollapsibleTableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof UsersInterface>('company');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof UsersInterface) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CollapsibleTable;
