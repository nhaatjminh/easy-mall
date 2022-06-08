import React, {useEffect, useState} from "react";
import { Paper, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import './index.css';
import {Checkbox, IconButton,Tooltip, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
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
    const { onSelectAllClick, order, orderBy, numSelected, rowCount,onRequestSort, headCells } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
            </TableCell>
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
  
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const EnhancedTableToolbar = (props) => {
  const { numSelected, onDeleteSelected, selected, deleteAllFunction, setSelected } = props;
  const handleDelete = () => {
    deleteAllFunction(selected);
    setSelected([]);
  }
  return (
    <>
      {numSelected > 0 ?
        <Toolbar
          style={{justifyContent: 'space-between'}}
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
            
          ) : ""}
          <div className="float-right">
            {numSelected > 0 ? (
              <button className="btn btn-login btn-manager ml-2" onClick={onDeleteSelected}> <p className="text-btn-login font-size-0-85-rem-max500"> Cancel </p></button>
            ) : ""}
            {numSelected > 0 ? (
              <button className="btn btn-login btn-delete-item btn-manager ml-2" onClick={() => handleDelete()}> <p className="text-btn-login font-size-0-85-rem-max500"> Delete All </p></button>
            ) : ""}
          </div>
        </Toolbar>
      : <Toolbar style={{justifyContent: 'space-between'}}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}></Toolbar>}
      
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TableManage = ({data, columnsOfData, editFunction, deleteAllFunction}) => {
    const columns = columnsOfData;
    const rows = data;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(columns[0].id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [buttonState, setButtonState] = useState(false);
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
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };
    const handleClick = (event, productId) => {
        const selectedIndex = selected.indexOf(productId);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, productId);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };
    useEffect(() => {
      setSelected([]);
    }, [buttonState])
    const isSelected = (productId) => selected.indexOf(productId) !== -1;
    const onDeleteSelected = () => {
      setSelected([]);
    }
    const handleDelete = (selected) => {
      deleteAllFunction(selected);
      setButtonState(!buttonState);
    }
    return (
      <>
        <EnhancedTableToolbar selected={selected} setSelected={setSelected} numSelected={selected.length} onDeleteSelected={onDeleteSelected} editFunction={editFunction} deleteAllFunction={deleteAllFunction}/>
       
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          
         <TableContainer className="table-height">
            <Table stickyHeader aria-label="sticky table" className="p-0">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
                headCells={columns}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                      <TableRow hover onClick={() => { 
                        setButtonState(!buttonState);
                        editFunction(row.id)
                      }}
                      tabIndex={-1}
                      key={index}
                      className='row-table-manager'>
                          <TableCell padding="checkbox">
                              <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleClick(event, row.id)
                                  }}
                                  inputProps={{
                                      'aria-labelledby': labelId,
                                  }}
                              />
                          </TableCell>
                          {columnsOfData.map((headCell, indexData) => {
                            return (
                            <TableCell
                              key={headCell + indexData}
                              align={headCell?.align || 'center'}
                            >
                              <div dangerouslySetInnerHTML={{__html: row[`${headCell.id}`]}} />
                            </TableCell>
                          )})}
                          <TableCell>
                            <IconButton onClick={() => { 
                              setButtonState(!buttonState);
                              editFunction(row.id)
                            }}>
                              <EditIcon/>
                            </IconButton>
                            <IconButton onClick={(event) => {
                              event.stopPropagation();
                              handleDelete([row.id]);
                            }}>
                              <DeleteIcon/>
                            </IconButton>
                          </TableCell>
                      </TableRow>
                      );
                  })}
              </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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

export default TableManage;