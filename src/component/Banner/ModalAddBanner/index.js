import React, {useState} from "react";
import BaseModal from '../../common/BaseModal'
import {
    InputLabel,
    TextField,
    TextareaAutosize,
    Autocomplete,
    Box,
    Menu,
    
} from '@mui/material';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import './index.css';
import ImageInput from "../ImageInput";
import BaseDropdown from '../../common/BaseDropDown'
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { BackIcon } from "../../../assets/icon/svg/BackIcon";
import { CollectionIcon } from "../../../assets/icon/svg/Collection";
import { PagesIcon } from "../../../assets/icon/svg/Pages";
import { ProductIcon } from "../../../assets/icon/svg/Product";

const Root = styled('div')(
    ({ theme }) => `
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    font-size: 14px;
  `,
  );
  
  const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;
  
  const InputWrapper = styled('div')(
    ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
      color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `,
  );
  const Listbox = styled('ul')(
    ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `,
  );
const ModalAddBanner = ({form, oldForm, mode}) => {
    const [valueToAdd, setValueToAdd] = useState({});
    const [customUrl, setCustomUrl] = useState(false);
    const [typeLink, setTypeLink] = useState('');
    const handleOk = () => {

    }
    const handleChangeCaption = (event) => {
        const value = {...valueToAdd};
        value.collection.caption = event.target.value;
        setValueToAdd(value);
    }
    const handleChangeDescription = (event) => {
        const value = {...valueToAdd};
        value.collection.description = event.target.value;
        setValueToAdd(value);
    }
    
    const optionLink = [
        {
            title: 'Product',
            icon: <ProductIcon />,
            onClick: () => setTypeLink('Product')
        },
        {
            title:'Collection',
            icon: <CollectionIcon />,
            onClick: () => setTypeLink('Collection')
        },
        {
            title:'Pages',
            icon: <PagesIcon />,
            onClick: () => setTypeLink('Pages')
        }
    ]
    const optionCollection = [
        {
            title: 'Back',
            icon: <BackIcon />,
            onClick: () => setTypeLink(null)
        },
        {
            title: 'a'
        },
        {
            title:'b'
        },
        {
            title:'c'
        }
    ]
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
      } = useAutocomplete({
        id: 'customized-hook-demo',
        options: typeLink ? optionCollection  : optionLink,
        getOptionLabel: (option) => option.title,
      });
    return (
        <>
            <BaseModal
                title="Add Banner"
                titleButton={<i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1"></i>}
                onOK={handleOk}
                showAction={true}
                classNameModal='add-banner-modal'>
                    <div>
                        <InputLabel name='title' className="text-header" style={{margin: 0}}>Caption</InputLabel>
                        <TextField
                            className="text-field-input text-content "
                            style={{marginLeft: 10}}
                            fullWidth
                            inputProps={{ maxLength: 255 }}
                            onChange={handleChangeCaption}
                        />
                    </div>
                    <div>
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-header">Description</InputLabel>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            minRows={5}
                            maxLength={255}
                            maxRows={5}
                            style={{width: '100%'}}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    <div>
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-header">Link</InputLabel>    
                        <div {...getRootProps()}>
                            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                                <input {...getInputProps()}/>
                            </InputWrapper>
                        </div>
                        {groupedOptions.length > 0 ? (
                            <Listbox {...getListboxProps()} style={{ maxHeight: 200}}>
                                {groupedOptions.map((option, index) => {
                                    return (<li style={{}} {...getOptionProps({ option, index })} onClick={option.onClick && option.onClick}>
                                        <p style={{paddingRight: 15}}>{option.icon}</p>
                                        <p>{option.title}</p>
                                    </li>)
                                })}
                            </Listbox>
                        ) : null}
                       
                    </div>
                    <div key={'add-modal-banner-image'}>
                        <ImageInput formRef={form} oldForm={oldForm} mode={mode} modal={true} valueToAdd={valueToAdd} setValueToAdd={setValueToAdd}></ImageInput>
                    </div>
            </BaseModal>
        </>
    );
}

export default ModalAddBanner;