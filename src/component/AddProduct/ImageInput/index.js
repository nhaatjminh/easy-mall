import React, {useState, useEffect} from "react";
import { Paper, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import {InputLabel, IconButton,Tooltip, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar, TextField   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const ImageInput = ({setImagesInput}) => {
    const [images, setImages] = useState([]);
    const ImagesGallery = (images) => {
        return(
            <div className="row">
            {
            images?.map((url)=>{
                return (
                    <div className="col-sm-1">
                    <div className="card">
                    <img src={url} />
                    </div>
                    </div>
                )
            })
            }
            
            </div>
        )
    }
    const handleMultipleImages =(evnt)=>{
        const selectedFIles = [];
        const imageToBase64 = [];
        const targetFiles =evnt.target.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file) => {
            imageToBase64.push(file);
            selectedFIles.push(URL.createObjectURL(file))
        })
        setImagesInput(imageToBase64);
        setImages(selectedFIles);
    }
    
    return (
        <>
            <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Media</InputLabel>
            <TextField accept="image/*" id="contained-button-file" className="media-select" inputProps={{
                multiple: true
            }} type="file"
            onChange={handleMultipleImages}/>
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;