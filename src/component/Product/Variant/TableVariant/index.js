import React, {useEffect, useState, useRef} from "react";
import { Paper, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import {Checkbox, IconButton,MenuItem, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, Toolbar, TextField   } from '@mui/material';
import './index.css'
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAddVariant from '../ModalAddVariant';
import { Dropdown } from 'react-bootstrap';

import { BaseNumberField } from '../../../common/BaseNumberField';

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
          style={{justifyContent: 'space-between'}}
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

          <div className="float-right" style={{display: 'inherit'}}>
          
            {numSelected > 0 ? (
              <Dropdown className="float-right dropdown-variant-action p-0">
                <Dropdown.Toggle id="dropdown-basic" className='p-0 m-0'>       
                  <button className="btn  btn-login btn-product" > <p className="text-btn-login font-size-0-85-rem-max500"> Edit </p></button>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{display: 'flex', flexDirection: 'column' }}>
                  <MenuItem className="item">Edit Price All</MenuItem>
                  <MenuItem  className="item">Edit Quantity All</MenuItem>
                  <MenuItem  className="item">Create All</MenuItem>
                  <MenuItem  className="item">Delete All</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
              
            ) : ""}
            
            {numSelected > 0 ? (
              <div className='ml-2'>
                <button className="btn btn-login btn-product ml-2" onClick={onDeleteSelected}> <p className="text-btn-login font-size-0-85-rem-max500"> Cancel </p></button>
              </div>
            ) : ""}
          </div>
        </Toolbar>
      :""}
      
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const TableVariant = ({optionRef, optionValueRef, mode, showOpt, optionTag, optionValue, columnsOfData , oldForm, formRef, setOptionValue, setOptionTag, setShowOpt,currency='VND', handleChangeCurrency= () => {}}) => {
    const form = formRef;
    const columns = columnsOfData;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [variant, setVariant] = useState([]);
    const [deleteVariant, setDeleteVariant] = useState([]);
    const [oldVariant, setOldVariant] = useState(oldForm?.variant?.map((variant) => variant.name) || []);
    const unmounted = useRef(false);
    const [trickRerender, setTrickRerender] = useState(0);
    const [addValueVariant, setAddValueVariant] = useState([]);
    const [firstReload, setFirstReload] = useState(true);
    
    const handleChangePriceVariant = (index, valuePrice) => {
      let newVariant = [...variant];
      
      if (mode === "EDIT") {
        if (newVariant[index].id) {
          newVariant[index] = {
            ...variant[index],
            price: valuePrice,
            update: "Change"
          }
        } else {
          newVariant[index] = {
            ...variant[index],
            price: valuePrice
          }
        }
      } else {
        newVariant[index] = {
          ...variant[index],
          price: valuePrice
        }
      }
      
      let idxInForm = form.current.variant.findIndex((vari) => vari.name === newVariant[index].name)
      if (idxInForm >= 0) form.current.variant[idxInForm] = newVariant[index];
      setVariant(newVariant);

    }
    const handleChangeQuantity = (index, valueQuantity) => {
        if (isNaN(valueQuantity)) valueQuantity = 0;
        let newVariant = [...variant];
        if (mode === "EDIT") {
          if (newVariant[index].id) {
            newVariant[index] = {
              ...variant[index],
              quantity: Number(valueQuantity),
              update: "Change"
            }
          } else {
            newVariant[index] = {
              ...variant[index],
              quantity: Number(valueQuantity)
            }
          }
        } else {
          newVariant[index] = {
            ...variant[index],
            quantity: Number(valueQuantity)
          }
        }
        
        let idxInForm = form.current.variant.findIndex((vari) => vari.name === newVariant[index].name)
        if (idxInForm >= 0) form.current.variant[idxInForm] = newVariant[index];
        setVariant(newVariant);
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
        const newSelecteds = variant.map((n) => n.name);
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
    const handleNotDeleteVariant =(row) => {
      const newList = variant.map((element) => {
        
        if (element.name === row.name) { // name can not duplicated
          if (mode === "EDIT") {
            if (!oldVariant.includes(element.name)) { // have update, but not have id => this is new Variant. return from "Delete" to "Add"
              element.update = "Add"
            }
            if ( oldVariant.includes(element.name)) { // have update, but not have id => this is new Variant. return from "Delete" to "Add"
              element.update = "Change"
            }
          }
          delete element.delete;
        }
        return element
      })
      form.current = {
        ...form?.current,
        variant: newList
      }
      setVariant(newList);
    }
    const handleDeleteOneVariant = async (row) => {
      if (variant.length === 1) {
        form.current = {
          ...form?.current,
          product: {
            ...form?.current?.product,
            is_variant: false
          },
          option: [],
        }
        setShowOpt(false);
        setOptionTag([]);
        setOptionValue([]);
        return;
      }
      let newOptionValue = [...optionValue];
      let OptionValueDelete;
      let currentDelete;
      let OptionValueExist = [];
      let flag = false;
      const newList = await variant.map((element) => {
        if (element.name === row.name) {
          if (mode === "EDIT") { // have update, but not have id => this is new Variant. return from "Delete" to "Add"
            element = {
              ...element,
              delete: true,
              update: "Delete"
            }
          } else {
            element = {
              ...element,
              delete: true,
            }
          }
          OptionValueDelete = element.name.split('/'); 
          currentDelete = element;
        }
        return element
      })
      await variant.forEach((element) => {
        if (element.name === currentDelete.name || element?.delete ) return;
        const splitElement = element.name.split('/');
        splitElement.forEach((value, index) => {
          if (value === OptionValueDelete[index] && !OptionValueExist.includes(index)) OptionValueExist.push(index);
        })
      })
      await newOptionValue.forEach((element, index) => {
        if (OptionValueExist.includes(index)) return;
        element.value = element.value.filter(valueOfOptionValue => {
          if (!OptionValueDelete.includes(valueOfOptionValue)) {
            flag= true;
            return true;
          }
        })
      })
      
      // delete in form
      if (mode === "EDIT") {
        const listVariant = [...form.current?.variant];
        form.current.variant = listVariant.filter(variant => {
          if (variant.name === row.name) {
            variant.update = "Delete";
          }
          if (!variant.id) {
            return false
          }
          return true;
        })
        const newObj = JSON.parse(JSON.stringify(optionValue));
        newObj.map((option, index) => {
          if (OptionValueExist.includes(index)) return;
          let indexOfOptionRef = optionRef.current.findIndex(option =>
            (option?.id && option?.id === newObj[index]?.id)
            || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))
          if (optionRef.current[indexOfOptionRef].idTemp) optionRef.current.splice(indexOfOptionRef, 1)
          else {
            if (optionRef.current[indexOfOptionRef]?.value?.length >= 1) {
              optionRef.current[indexOfOptionRef].update = 'Change'
            } else optionRef.current[indexOfOptionRef].update = 'Delete'
          }
          let arrayOptionRefLikeOptionValue = optionRef.current[indexOfOptionRef]?.value?.filter((value) => value.update !== "Delete")
          arrayOptionRefLikeOptionValue?.map((value, indexValue) => {
            if (value?.value === OptionValueDelete[index]) {
              arrayOptionRefLikeOptionValue[indexValue].update = "Delete"
            }
          })
        })
        
      }
      if (!flag) {
        form.current = {
          ...form?.current,
          option: optionValue,
          variant: newList
        }
        setVariant(newList);
      }
      else {
        form.current = {
          ...form?.current,
          option: newOptionValue,
        }
        let newOptionTag=[...optionTag];
        setOptionTag(newOptionTag);
        setOptionValue(newOptionValue);
        createVariantUI();
      }
    }
    
    const combineArrays = (arrayOfArrays ) => {
      if( !arrayOfArrays ){
          return [];
      }

      if( ! Array.isArray( arrayOfArrays ) ){
          return [];
      }


      for( let i = 0 ; i < arrayOfArrays.length; i++ ){
        if( ! Array.isArray(arrayOfArrays[i]) || arrayOfArrays[i].length == 0 ){
          arrayOfArrays.splice(i, 1);
          i--;
        }
      }

      if( arrayOfArrays.length == 0 ){
          return [];
      }


      let odometer = new Array( arrayOfArrays.length );
      odometer.fill( 0 ); 

      let output = [];

      let newCombination = formCombination( odometer, arrayOfArrays );
      output.push( newCombination.substr(1) );

      while ( odometer_increment( odometer, arrayOfArrays ) ){
          newCombination = formCombination( odometer, arrayOfArrays );
          output.push( newCombination.substr(1) );
      }
      return output;
    }
      
    const formCombination = ( odometer, array_of_arrays ) => {
        return odometer.reduce(
          function(accumulator, odometer_value, odometer_index){
            return "" + accumulator +"/" +array_of_arrays[odometer_index][odometer_value];
          },
          ""
        );
    }
    
    const odometer_increment = ( odometer, array_of_arrays ) => {
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
          let allNewVariant = []
          let allVariantAssignForm = [];
          if (!optionValueRef.current) { // when u delete some option, create new variant list
            let listDeleteVariant = oldForm.variant;
            allVariantAssignForm = listDeleteVariant.map((variant) => {
                return {
                    ...variant,
                    update: "Delete"
                }
            })
          }
          listVariant.forEach((variant) => {
              if (!deleteVariant.includes(variant)) {
                let oldKeyVariant = '';
                if (optionValueRef.current) {
                  for (const [key, newVariantName] of Object.entries(optionValueRef.current)) {
                    if (variant === newVariantName) {
                      oldKeyVariant = key;
                      break;
                    }
                  }
                }
                const oldFormVariant = oldForm.variant?.find(oldvariant => oldvariant?.name && oldvariant?.name === oldKeyVariant)
                let oldVariantCheck = form.current.variant.find(oldVariant => oldVariant?.id && oldVariant?.id === oldFormVariant?.id);
                if (!oldVariantCheck && mode === "EDIT") {
                  oldVariantCheck = addValueVariant.find(variantAdd => variantAdd.name === variant)
                }
                let listOptionOfVariant = variant.split("/");
                let newVariant = {};
                if (oldKeyVariant !== variant) {
                  newVariant = {
                    ...newVariant,
                  }
                  if (mode === "EDIT") {
                    newVariant = {
                      ...newVariant,
                      update: "Change"
                    }
                  }
                }
                listOptionOfVariant.forEach((opt, idxOpt) => {
                    let newOpt = {
                        name: idxOption[idxOpt],
                        value: opt
                    }
                    if (oldVariantCheck) {
                      if (oldVariantCheck.id) {
                        newVariant = {
                          ...newVariant,
                          id: oldVariantCheck?.id,
                        }
                      }
                      newVariant = {
                        ...newVariant,
                        price: oldVariantCheck?.price,
                        quantity: Number(oldVariantCheck?.quantity)
                      }
                      if (mode === "EDIT" && oldVariantCheck.update) {
                        newVariant = {
                          ...newVariant,
                          update: oldVariantCheck.update
                        }
                      }
                    } else {
                      if (mode === "EDIT") {
                        newVariant = {
                          ...newVariant,
                          update: "Add",
                          price: 0,
                          quantity: 0
                        }
                      }
                    }
                    if (!newVariant?.option_value)
                      newVariant = {
                          ...newVariant,
                          name: variant,
                          option_value: [newOpt]
                      }
                    else newVariant.option_value.push(newOpt);
                })
                allNewVariant.push(newVariant);
              }
          })
          if (allNewVariant && !unmounted.current) {
              setVariant(allNewVariant);
              setTrickRerender(trickRerender + 1);
              let deleteVariantList = form.current?.variant?.filter(variant => variant?.update === "Delete")
              if (deleteVariantList) allVariantAssignForm = allVariantAssignForm.concat(deleteVariantList);
              allNewVariant.forEach((newVariant) => {
                allVariantAssignForm.push(newVariant)
              })
              form.current = {
                  ...form?.current,
                  variant: allVariantAssignForm
              }
          }
      })
    }
    useEffect(() => {
      unmounted.current = false;
      if (!firstReload) createVariantUI();
      return () => {
        unmounted.current = true;
      };
    }, [optionValue, deleteVariant, firstReload])
    useEffect(() => {
      const idxValue = [];
      optionValue.forEach((optionName) => {
        idxValue.push(optionName.value);
      })
      let listVariant = combineArrays(idxValue);
      let oldList = oldForm?.variant?.map((variant) => variant.name)
      let deleteList = []
      listVariant.map((variant) => {
        if (oldList && !oldList?.includes(variant)) {
          deleteList.push(variant);
        }
      })
      setDeleteVariant(deleteList);
      setFirstReload(false);
    }, [])
    return (
      <>
      
      {variant.length && showOpt?
        <Paper elevation={5} style={{ width: '100%', overflow: 'hidden', marginTop:'2rem'}}>
            <div style={{justifyContent: 'space-between', alignItems: 'center', display: 'flex', padding: '5px 15px 0 15px'}}>
              <p className="font-weight-bold text-normal m-0" style={{width: 'auto'}}>Variant</p>
              {
              mode === "EDIT" ? 
                <ModalAddVariant
                  variant={variant}
                  addValueVariant={addValueVariant}
                  setAddValueVariant={setAddValueVariant}
                  combineArrays={combineArrays}
                  form={form}
                  setDeleteList={setDeleteVariant}
                  deleteList={deleteVariant}
                  optionValue={optionValue}
                  setOptionValue={setOptionValue}
                  optionValueRef={optionValueRef}
                  optionRef={optionRef}
                  styleButton={
                    {
                      width: 'auto',
                      float: 'right',
                      padding: '5px 10px',
                      margin: '10px 0 0 0',
                      borderRadius: 10,
                      backgroundColor: '#0d6efd',
                      color: 'white',
                      boxShadow: `0 2px 5px 1px rgb(64 60 67 / 28%)`
                    }
                  }></ModalAddVariant>
              : ""
              }
            </div>
            <EnhancedTableToolbar numSelected={selected.length} onDeleteSelected={onDeleteSelected} />
            <TableContainer sx={{ maxHeight: 440 }}>
                
                <Table stickyHeader aria-label="sticky table" className="p-0">
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={variant.length}
                  headCells={columns}
                />
                <TableBody>
                    {variant
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                        <TableRow hover
                        key={`${labelId} + ${index}  + variant`}
                        role="checkbox"
                        className={`${row.delete ? "line-through" : ""}`}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
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
                          <TableCell align="center" style={{display: 'inline-flex'}}>
                            
                            <BaseNumberField key="Price" className={`w-100 ${row.delete && 'disabled-text'}`} disabled={row.delete} currency={currency} handleChangeCurrency={handleChangeCurrency} placeholder={currency === 'USD' ? '0.00' : '0'} value={row.price} fullWidth={false} setValue={(value) => handleChangePriceVariant(index, value)}></BaseNumberField>
                          </TableCell>
                          <TableCell align="center">
                            
                            <BaseNumberField length={8} className={`${row.delete && 'disabled-text'}`} key="Inventory" disabled={row.delete}  value={row.quantity} fullWidth={true} placeholder={'0'} setValue={(value) => handleChangeQuantity(index, value)}></BaseNumberField>
                          </TableCell>
                          <TableCell align="center">
                            <button onClick={row.delete ? () => handleNotDeleteVariant(row) : () => handleDeleteOneVariant(row)} style={{width: 'auto'}} className={`float-right btn btn-form-product ${row.delete ? `btn-primary` : `btn-success`}`}>{row.delete ? `Create` : `Delete`}</button>
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
                count={variant.length}
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