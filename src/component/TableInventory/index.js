import React, {useState, forwardRef, useRef} from "react";
import { Paper } from '@mui/material';
import './index.css';
import {Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import TableRowInventory from "./TableRowInventory";
import BaseEmpty from "../common/BaseEmpty";
function descendingComparator(a, b, orderBy, typeSort) {
  if (typeSort === 'number') {
    if (Number(b[orderBy]) < Number(a[orderBy])) {
      return -1;
    }
    if (Number(b[orderBy]) > Number(a[orderBy])) {
      return 1;
    }
    return 0;
  } else if (typeSort === 'string') {
    if (b[orderBy] && a[orderBy]) {
      if (b[orderBy].localeCompare(a[orderBy]) <= -1) {
        return -1;
      }
      if (b[orderBy].localeCompare(a[orderBy]) >= 1) {
        return 1;
      }
      return 0;
    } else if (b[orderBy] && !a[orderBy]) {
      return 1
    } else if (!b[orderBy] && a[orderBy]) {
      return -1
    } else return 0;
  }
}

function getComparator(order, orderBy, columnsOfData) {
  let typeSort = columnsOfData.find((column) => column?.id === orderBy)?.sort;
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, typeSort)
    : (a, b) => -descendingComparator(a, b, orderBy, typeSort);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator, columnsOfData) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0], columnsOfData);
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
                align={headCell?.align || 'center'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {
                  headCell.sort ? 
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
                  : <>{headCell.label}</>
                }
                
              </TableCell>
            ))}
            
            <TableCell style={{paddingLeft: 18}}>
                Action
            </TableCell>
        </TableRow>
      </TableHead>
    );
}

const TableInventory = ({saveForRef, changeRef, data, columnsOfData, editItem, setIsEdit}) => {
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
                  {rows?.length > 0 ? stableSort(rows, getComparator(order, orderBy, columnsOfData), columnsOfData)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => {
                    if (row.is_variant) {
                        return row.variants?.map((variant) => {
                            return <TableRowInventory changeRef={changeRef}  saveForRef={saveForRef} setIsEdit={setIsEdit} editItem={editItem} variantId={variant.id} variant={variant} productId={row.id} is_variant={row.is_variant} columnsOfData={columnsOfData} row={row} index={index}></TableRowInventory>
                        })
                    } else return <TableRowInventory changeRef={changeRef} saveForRef={saveForRef} setIsEdit={setIsEdit} editItem={editItem} productId={row.id} is_variant={row.is_variant} columnsOfData={columnsOfData} row={row} index={index}></TableRowInventory>
                  }) : <TableRow>
                  <TableCell colSpan={columnsOfData?.length + 2 ?? 2}>

                    <BaseEmpty></BaseEmpty>
                  </TableCell>
              </TableRow>}
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