import React, {useEffect, useState} from "react";
import {
    InputLabel,
    ImageList,
    ImageListItem, 
    IconButton,
    TableCell,
    TextField,
    TableRow,
    Box,
    ListItemAvatar,
    ListItemText,
}
from '@mui/material';
import './index.css';
import { useParams } from "react-router-dom";

const TableRowInventory = ({setIsEdit, columnsOfData, index, row, productId, variantId, is_variant, variant, editItem}) => {
    
  const params = useParams();
  const [updateSKUState, setUpdateSKUState] = useState(false);
  const [valueSku, setValueSku] = useState(row?.sku);
  const [updateQuantityState, setUpdateQuantityState] = useState(false);
  const [valueQuantity, setValueQuantity] = useState(!is_variant ? row?.inventory : variant?.quantity );
  const handleSave = () => {
    const object = {
      id: productId,
      store_id: params.storeId,
      is_variant: is_variant,
      variant_id: variantId
    }
    if (updateSKUState) object.sku = valueSku;
    if (updateQuantityState) object.quantity = valueQuantity;
    editItem(object);
    

  }
  return (
    <TableRow
      tabIndex={-1}
      key={index}
      className='row-table-manager'>
        
      {columnsOfData.map((headCell, indexData) => {
        return (
        <TableCell
          key={headCell + indexData}
          align={headCell?.align || 'center'}
          className={`${headCell?.classNameBody} ${headCell.classNameWithData && headCell?.classNameWithData(row[`${headCell.id}`])}`}
        >
            {
                headCell.id === 'inventory'
                ? <TextField onChange={(e) => {
                  setUpdateQuantityState(true);
                  setValueQuantity(e.target.value);
                  setIsEdit(true);
                }} 
                 type='number' value={valueQuantity} className="text-field-input  text-content" inputProps={{ maxLength: 12}} /> 
                : headCell.id === 'sku'
                ? <TextField onChange={(e) => {
                  setUpdateSKUState(true);
                  setValueSku(e.target.value);                  
                  setIsEdit(true);
                }} value={valueSku} className="text-field-input  text-content"/>
                : 
                <>
                  <div className="w-100" style={{ display: 'inline-flex', minWidth: 225, alignItems: 'center'}}>
                    {
                        row.thumbnail ?
                            <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                                <ListItemAvatar className="image-container m-0">
                                    <img alt="thumbnail" src={row.thumbnail}/>
                                </ListItemAvatar>
                            </Box>
                            : <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                                <ListItemAvatar className="image-container m-0">
                                    <img alt="thumbnail" src='/img/default-image-620x600.jpg'/>
                                </ListItemAvatar>
                            </Box>
                    }
                    <div>
                        <ListItemText
                            className="title-label"
                            primary={row.title}
                        />
                        <ListItemText
                            className="title-product"
                            primary={variant?.name}
                        />
                    </div>
                </div>
                </>}
        </TableCell>
      )})}
      <TableCell align={'center'}>
        {
          updateSKUState || updateQuantityState ?
          
          <button onClick={() => handleSave()} className="btn button-done" style={{ width: 'auto', height: 'auto'}}>Save</button>
          : <></>
        }
      </TableCell>
    </TableRow>
    );
}

export default TableRowInventory;