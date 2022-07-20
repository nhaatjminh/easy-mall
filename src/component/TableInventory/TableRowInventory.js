import React, {useState} from "react";
import {
    TableCell,
    TextField,
    TableRow,
    Box,
    ListItemAvatar,
    ListItemText,
}
from '@mui/material';
import './index.css';
import { useNavigate, useParams } from "react-router-dom";

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
  const routeChange = useNavigate();
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
                            <Box style={{width: 80, height: 'auto'}}>
                                <ListItemAvatar className="image-container-item-list m-0">
                                    <img alt="image" src={row.thumbnail}/>
                                </ListItemAvatar>
                            </Box>
                            : <Box style={{width: 80, height: 'auto'}}>
                                <ListItemAvatar className="image-container-item-list m-0">
                                    <img alt="image" src='/img/default-image-620x600.jpg'/>
                                </ListItemAvatar>
                            </Box>
                    }
                    <div>
                        <ListItemText
                            className="title-label text-hyper-link"
                            primary={row.title}
                            onClick={(e) => {
                              e.stopPropagation();
                              routeChange(`/store-detail/manage-product/${params.storeId}`, { state: {idProduct: row.id }})
                            }}
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