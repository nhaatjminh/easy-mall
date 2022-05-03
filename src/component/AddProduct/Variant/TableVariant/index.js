import React, {useEffect, useState} from "react";
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
            {headCells.map((headCell, index) => (
              <TableCell
                className="text-center"
                key={index}
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
  onSelectAllClick: PropTypes.func.isRequired,
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
              {numSelected} Selected
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

const TableVariant = ({optionValue, columnsOfData, formRef}) => {

    const form = formRef;
    const columns = columnsOfData;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [variant, setVariant] = useState([]);
    
    const rows = variant;
    
    const handleChangePriceVariant = (index, valuePrice) => {
      let newVariant = [...form?.current?.variant];
      newVariant[index] = {
          ...form?.current?.variant[index],
          price: Number(valuePrice)
      }
      form.current = {
          ...form?.current,
          variant: newVariant
      }
      //setVariant(newVariant);

  }
  const handleChangeQuantity = (index, valueQuantity) => {
      let newVariant = [...form?.current?.variant];
      newVariant[index] = {
          ...form?.current?.variant[index],
          quantity: Number(valueQuantity)
      }
      form.current = {
          ...form?.current,
          variant: newVariant
      }
  }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
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
    useEffect(() => {
      createVariantUI();
    }, [optionValue])
    function combineArrays( array_of_arrays ){
      if( ! array_of_arrays ){
          return [];
      }
  
      if( ! Array.isArray( array_of_arrays ) ){
          return [];
      }
  

      for( let i = 0 ; i < array_of_arrays.length; i++ ){
        if( ! Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0 ){
          array_of_arrays.splice(i, 1);
          i--;
        }
      }

      if( array_of_arrays.length == 0 ){
          return [];
      }
  

      let odometer = new Array( array_of_arrays.length );
      odometer.fill( 0 ); 
  
      let output = [];
  
      let newCombination = formCombination( odometer, array_of_arrays );
      output.push( newCombination.substr(1) );
  
      while ( odometer_increment( odometer, array_of_arrays ) ){
          newCombination = formCombination( odometer, array_of_arrays );
          output.push( newCombination.substr(1) );
      }
  
      return output;
    }
    
    function formCombination( odometer, array_of_arrays ){
        return odometer.reduce(
          function(accumulator, odometer_value, odometer_index){
            return "" + accumulator +"/" +array_of_arrays[odometer_index][odometer_value];
          },
          ""
        );
    }
    
    function odometer_increment( odometer, array_of_arrays ){
        for( let i_odometer_digit = odometer.length-1; i_odometer_digit >=0; i_odometer_digit-- ){ 
            let maxee = array_of_arrays[i_odometer_digit].length - 1;         
            if( odometer[i_odometer_digit] + 1 <= maxee ){
                odometer[i_odometer_digit]++;
                return true;
            }
            else{
                if( i_odometer_digit - 1 < 0 ){
                    return false;
                }
                else{
                    odometer[i_odometer_digit]=0;
                    continue;
                }
            }
        }
    
    }
    const createVariantUI = () => {
      const idxOption = [];
      const idxValue = [];
      new Promise((resolve, reject) => {
          optionValue.forEach((optionName) => {
              idxOption.push(optionName.name);
              idxValue.push(optionName.value);
          })
          resolve();
      }).then(() => {
          let listVariant = combineArrays(idxValue);
          
          const allNewVariant = []
      
          listVariant.forEach((variant) => {
              let listOptionOfVariant = variant.split("/");
              let newVariant = {};
              listOptionOfVariant.forEach((opt, idxOpt) => {
                  let newOpt = {
                      name: idxOption[idxOpt],
                      value: opt
                  }
                  if (!newVariant?.option_value)
                      newVariant = {
                          name: variant,
                          option_value: [newOpt]
                      }
                  else newVariant.option_value.push(newOpt);
              })

              allNewVariant.push(newVariant);
          })
          if (allNewVariant) {
              setVariant(allNewVariant);
              form.current = {
                  ...form?.current,
                  variant: allNewVariant
              }
          }
      })
    }
    return (
      <>
      
      {variant.length ?
        <Paper elevation={5} style={{ width: '100%', overflow: 'hidden', marginTop:'2rem'}}>
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
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                        <TableRow hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}>
                            <TableCell padding="checkbox" 
                            align="left">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    onClick={(event) => handleClick(event, row.name)}
                                />
                        </TableCell>
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                        >
                            
                            {row.option_value.map((option, index) => ((index !== 0 ? " / " : " ") + option.value + " "))}
                        </TableCell>
                        <TableCell align="center">
                            <TextField value={row.price} onChange={(e) => handleChangePriceVariant(index, e.target.value)}/>
                            </TableCell>
                        <TableCell align="center">
                            <TextField value={row.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)}/></TableCell>
                        <TableCell align="center">
                      
                          <button style={{width: 'auto'}} className="float-right btn btn-success btn-form-product">Sửa</button>
                  
                          <button style={{width: 'auto'}} className="float-right btn btn-success btn-form-product">Xóa</button>
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
        : ""}
      </>
       
    );
}

export default TableVariant;