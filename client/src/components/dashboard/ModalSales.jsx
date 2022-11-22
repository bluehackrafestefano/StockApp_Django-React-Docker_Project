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
import { useNavigate } from 'react-router-dom';

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

export default function ModalSales({open,handleClose,info,setInfo,initialValues}) {
    const {products,postSale,putSale,brands} = useContext(StockContext)
    const navigate = useNavigate()


    const handleChange = (e) => {
        e.preventDefault();
        const {name,value}=e.target
        setInfo({...info,[name]:+value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        handleClose()
        if(info.id){
          putSale(info,navigate)
          setInfo(initialValues)       
        }else{
          postSale(info,navigate)
          setInfo(initialValues)       
        }

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
          <InputLabel variant="outlined" id="brand-select-label">Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            label="Brand"
            id="brand-select"
            name="brand_id"
            value={info.brand_id}
            onChange={handleChange}
            required
          >
             {brands?.map(item=>{
                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl >
          <InputLabel variant="outlined" id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            label="Product"
            id="product-select"
            name="product_id"
            value={info.product_id}
            onChange={handleChange}
            required
          >
            {products?.map(item=>{
                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <TextField
            label="Quantity"
            id="quantity"
            name="quantity"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info.quantity}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            id="price"
            type="number"
            variant="outlined"
            name="price"
            InputProps={{ inputProps: { min: 0 } }}
            value={info.price}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" size="large">
            {info.id ? "Update Sale":"Add New Sale"}
          </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
