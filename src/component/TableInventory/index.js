import React, {useEffect, useState} from "react";
import { Paper, TextField } from '@mui/material';
import './index.css';
import {IconButton, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableRowInventory from "./TableRowInventory";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy,onRequestSort, headCells } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
            {headCells.map((headCell, index) => (
              <TableCell
                key={index}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  hideSortIcon
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
            
            <TableCell>
                Action
            </TableCell>
        </TableRow>
      </TableHead>
    );
}

const TableInventory = ({data, columnsOfData, editItem}) => {
    const columns = columnsOfData;
    const rows = data;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(columns[0].id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
      <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          
         <TableContainer className="table-height">
            <Table stickyHeader aria-label="sticky table" className="p-0">
              
              <EnhancedTableHead
                headCells={columns}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                  {rows?.length ? stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => {
                    if (row.is_variant) {
                        return row.variants?.map((variant) => {
                            return <TableRowInventory editItem={editItem} variantId={variant.id} variant={variant} productId={row.id} is_variant={row.is_variant} columnsOfData={columnsOfData} row={row} index={index}></TableRowInventory>
                        })
                    } else return <TableRowInventory editItem={editItem} productId={row.id} is_variant={row.is_variant} columnsOfData={columnsOfData} row={row} index={index}></TableRowInventory>
                  }) : <></>}
              </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className=" table-manager-pagination"
        />
        </Paper>
      </>
    );
}

export default TableInventory;