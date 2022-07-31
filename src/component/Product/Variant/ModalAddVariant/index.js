import React, {useState} from "react";
import BaseModal from '../../../common/BaseModal'
import './index.css';
import {
    TextField
} from '@mui/material';
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';
import { BaseNumberField } from "../../../common/BaseNumberField";
import { useSelector } from "react-redux";

const ModalAddVariant = ({ styleButton, variant, setDeleteList, addValueVariant, setAddValueVariant, combineArrays, form, optionValue, optionRef, deleteList, setOptionValue, optionValueRef}) => {
    const [newVariantName, setNewVariantName] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const currencyStore = useSelector((state) => state.listStore?.currentStore?.currency || 'USD');
    const handleOk = () => {
        if (!newVariantName.length) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You need fill all option',
            })
            return;
        }
        let name = '';
        let optionVariant = [];
        newVariantName.forEach((variantName, index) => {
            if (variantName) {
                if (!index) name += variantName;
                else name += `/${variantName}`;
                optionVariant.push({
                    name: optionValue[index].name,
                    value: variantName
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'You need fill all option',
                })
                return;
            }
        })
        let newVariantObject = [
            ...addValueVariant,
            {
            name: name,
            update: "Add",
            option_value: optionVariant,
            price: price,
            quantity: quantity
        }]
        setAddValueVariant(newVariantObject);
        
        let newOptionValue = [...optionValue];
        let valueToCombine = [];
        newOptionValue = newOptionValue.map((option, index) => {
            if (!option.value.includes(newVariantName[index])) {
                option.value.push(newVariantName[index]);
                let update;
                let newOption = {
                    value: newVariantName[index],
                    idTemp: uuid(),
                    update: "Add"
                }
                
                const newObj = JSON.parse(JSON.stringify(optionValue));
                let indexOfOptionRef = optionRef.current.findIndex(option =>
                    (option?.id && option?.id === newObj[index].id)
                    || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))
                optionRef.current[indexOfOptionRef].value.push(newOption);
                if (!optionRef.current[indexOfOptionRef]?.update) optionRef.current[indexOfOptionRef].update = "Change"
            }
            valueToCombine.push(option.value);
            return option;
        })
        setOptionValue(newOptionValue);
        if (deleteList.includes(name)) {
            let newDeleteList = deleteList.filter(variant => variant !== name);
            setDeleteList(newDeleteList);
        } else {
            let allVariantCanAdd = [];
            newVariantName.map((value, index) => {
                let temp = JSON.parse(JSON.stringify(optionValue));
                temp = temp.map(option => option.value);
                temp[index] = [value];
                let tempArrayAllAvariant = combineArrays(temp);
                allVariantCanAdd = allVariantCanAdd.concat(tempArrayAllAvariant);
            })
            let allVariantHave = JSON.parse(JSON.stringify(variant));
            allVariantHave = allVariantHave.map(variant => variant.name);
            allVariantCanAdd = [...new Set(allVariantCanAdd)];
            allVariantCanAdd = allVariantCanAdd.filter(variant => variant !== name && !allVariantHave.includes(variant))
            let deletelist =  deleteList.concat(allVariantCanAdd);
            deletelist = [...new Set(deletelist)];
            setDeleteList(deletelist);
        }
        setPrice(0);
        setQuantity(0);
    }
    const handleChangeOptionValue = (index, value) => {
        let tempNew = [...newVariantName];
        tempNew[index] = value;
        setNewVariantName(tempNew);
    }
    return (
        <>
            <BaseModal
                title="Add Variant"
                titleButton="Add Variant"
                onOK={handleOk}
                showAction={true}
                classNameModal='add-variant-modal'
                styleButton={styleButton}>
                {optionRef.current ? 
                optionRef.current.map((option, index) => {
                    return (
                        <div key={`modal-add-${index}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <p style={{margin: 0, width: 100}}>{option.name}: </p>
                            <TextField
                                style={{width: '100%', height: 35}}
                                onChange={(e) => handleChangeOptionValue(index, e.target.value)}
                                className={`text-field-input input-height-20`}
                                name='title'
                                fullWidth
                                required />
                        </div>
                    )
                })
                : <></>}
                {optionRef.current ? 
                <>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{margin: 0, width: 100}}>Price: </p>
                        <div style={{width: '100%'}}>
                            <BaseNumberField currency={currencyStore} length={8} key="Price-add-variant" value={price} placeholder={'0'} setValue={(e) => setPrice(e)}></BaseNumberField>
                    
                        </div>
                        
            
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{margin: 0, width: 100}}>Quantity: </p>
                        <div  style={{width: '100%'}}>
                            <BaseNumberField length={8} key="Inventory-add-variant" fullWidth={true} value={quantity} placeholder={'0'} setValue={(e) => setQuantity(e)}></BaseNumberField>
                        
                        </div>
                          
                    </div>
                </>
                : <></>}
            </BaseModal>
        </>
    );
}

export default ModalAddVariant;