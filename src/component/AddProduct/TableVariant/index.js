import React, {useState} from "react";
import { Paper, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import {Checkbox, IconButton,Tooltip, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar, TextField   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, headCells } =
      props;
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
            {headCells.map((headCell) => (
              <TableCell
                className="text-center"
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                  {headCell.label}
              </TableCell>
            ))}
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
  const { numSelected, onDeleteSelected } = props;
  return (
    <>
      {numSelected > 0 ?
        <Toolbar
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
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
            
          ) : ""}

          {numSelected > 0 ? (
            <Tooltip title="Delete" >
              <IconButton >
                <DeleteIcon onClick={onDeleteSelected}/>
              </IconButton>
            </Tooltip>
          ) : ""}
          
          {numSelected > 0 ? (
            <button className="btn  btn-login btn-product" > <p className="text-btn-login font-size-0-85-rem-max500"> Edit Products </p></button>
          ) : ""}
        </Toolbar>
      :""}
      
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TableVariant = ({data, columnsOfData}) => {
    const columns = columnsOfData;
    const rows = data;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(columns[0].id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    
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
        const newSelecteds = rows.map((n) => n.title);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };
    const handleClick = (event, nameProduct) => {
        const selectedIndex = selected.indexOf(nameProduct);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, nameProduct);
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
    
    const isSelected = (nameProduct) => selected.indexOf(nameProduct) !== -1;
    const onDeleteSelected = () => {
      setSelected([]);
    }
    console.log(rows);
    return (
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <EnhancedTableToolbar numSelected={selected.length} onDeleteSelected={onDeleteSelected} />
            <Table stickyHeader aria-label="sticky table" className="p-0">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  console.log(row);
                    const isItemSelected = isSelected(row.title);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                    <TableRow hover onClick={(event) => handleClick(event, row.title)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.title}
                    selected={isItemSelected}>
                        <TableCell padding="checkbox" 
                        align="left">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                          
                        {row.option.map((option, index) => ((index !== 0 ? " / " : " ") + option.value + " "))}
                      </TableCell>
                      <TableCell align="center">
                          <TextField value={row.price}/>
                        </TableCell>
                      <TableCell align="center">
                          <TextField value={row.quantity}/></TableCell>
                      <TableCell align="center">
                        <button>Edit</button>
                        
                        <button>Delete</button>
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
    );
}

export default TableVariant;