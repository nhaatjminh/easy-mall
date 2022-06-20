import React from "react";
import {NestedDropdown} from 'mui-nested-menu';

const BaseDropDown = ({menuItemsData, handleOnClick=() => {}}) => {
  return (
    <NestedDropdown
      menuItemsData={menuItemsData}
      MenuProps={{elevation: 3}}
      ButtonProps={{variant: 'outlined'}}
      onClick={handleOnClick}
    />
  )
};

export default BaseDropDown;