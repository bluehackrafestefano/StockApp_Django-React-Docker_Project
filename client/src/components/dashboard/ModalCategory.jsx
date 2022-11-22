import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { StockContext } from '../../context/StockContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialValues={
    "name": "",
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

export default function ModalCategory({open,handleClose}) {
    const {postCategory} = useContext(StockContext)
    const [categoryInfo,setCategoryInfo] = useState(initialValues)
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        const {name,value}=e.target
        setCategoryInfo({...categoryInfo,[name]:value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        postCategory(categoryInfo,navigate)
        setCategoryInfo(initialValues)
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
          <TextField
            label="Category Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={categoryInfo.name}
            onChange={handleChange}
            required
          /> 
        </FormControl> 
          <Button type="submit" variant="contained" size="large">
            Add New Category
          </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
