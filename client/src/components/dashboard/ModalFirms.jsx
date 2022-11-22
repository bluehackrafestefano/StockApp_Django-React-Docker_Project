import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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

export default function ModalFirms({open,handleClose,firmEdit,initialValues,setFirmEdit}) {
    const {postFirm,putFirm} = useContext(StockContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        const {name,value}=e.target
        // console.log(name,value)
        setFirmEdit({...firmEdit,[name]:value})
        // initialvalue içindeki keylerimiz ile input ların name değerleri aynı olduğu için
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        handleClose()
        if(firmEdit.id){
          putFirm(firmEdit,navigate)
          setFirmEdit(initialValues)       
        }else{
          postFirm(firmEdit,navigate)
          setFirmEdit(initialValues)   
        }
        setFirmEdit(initialValues)
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
          {/* <InputLabel variant="outlined" id="firm-select-label">Firm Name</InputLabel> */}
          <TextField
            label="Firm Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={firmEdit.name}
            onChange={handleChange}
            required
          /> 
        </FormControl>
        <FormControl >
          {/* <InputLabel variant="outlined" id="phone-select-label">Phone</InputLabel> */}
          <TextField
            label="Phone"
            name="phone"
            id="phone"
            type="text"
            variant="outlined"
            value={firmEdit.phone}
            onChange={handleChange}
            required
          /> 
        </FormControl>
        <FormControl >
        <TextField
            label="Address"
            name="address"
            id="address"
            type="text"
            variant="outlined"
            value={firmEdit.address}
            onChange={handleChange}
            required
          /> 
        </FormControl>
        <FormControl >
        <TextField
            label="Image Url"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={firmEdit.image}
            onChange={handleChange}
          /> 
        </FormControl>
        
          <Button type="submit" variant="contained" size="large">
            {firmEdit.id ? "Update Firm":"Add New Firm"}
          </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
