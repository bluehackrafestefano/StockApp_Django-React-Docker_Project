import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { StockContext } from '../../context/StockContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialValues={
    "name": "",
    "category_id": "",
    "brand_id": ""
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalProduct({open,handleClose}) {
    const {category,postProduct,brands} = useContext(StockContext)
    const [productInfo,setProductInfo] = useState(initialValues)
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        const {name,value}=e.target
        setProductInfo({...productInfo,[name]:value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        postProduct(productInfo,navigate)
        setProductInfo(initialValues)
        handleClose()
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} component={"form"} onSubmit={handleSubmit} >
        <FormControl >
          <InputLabel variant="outlined" id="firm-select-label">Category</InputLabel>
          <Select
            labelId="firm-select-label"
            label="Category"
            id="firm-select" 
            name="category_id"         
            value={productInfo.category_id}
            onChange={handleChange}
            required
          >
            {category?.map(item=>{
                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl >
          <InputLabel variant="outlined" id="brand-select-label">Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            label="Brand"
            id="brand-select"
            name="brand_id"
            value={productInfo.brand_id}
            onChange={handleChange}
            required
          >        
            {brands?.map(item=>{
                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl >
        <TextField
            label="Product Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={productInfo.name}
            onChange={handleChange}
            required
          /> 
        </FormControl>
        
          <Button type="submit" variant="contained" size="large">
            Add New Product
          </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
