import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { StockContext } from "../context/StockContext";
import ModalFirms from '../components/dashboard/ModalFirms';
import FirmCard from "../components/FirmCard";
import { useState } from "react";


const initialValues={
  "name": "",
  "phone": "",
  "address": "",
  "image":""
}
const Firms = () => {
  const { firms,getFirms} = useContext(StockContext)
  const [open, setOpen] = React.useState(false);
  const [firmEdit,setFirmEdit] = useState(initialValues)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFirmEdit(initialValues)
  };
  useEffect(() => {
    getFirms()
  }, [])
  
  const handleEdit = (data)=>{
    setFirmEdit(data)
    handleOpen()

  }
  return (
    <Box sx={{ flexGrow: 1,margin:3 }}>
      <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ p:2,pt:"2px"}}
            >
              Firms
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button sx={{backgroundColor:"darkslategrey",mb:1}} color="warning" variant="contained" onClick={handleOpen}>New Firm</Button>
      </Stack>  
    <Grid container spacing={1} >
      {firms?.map((item) => {
        return (
          <Grid item xs={12} md={3} lg={4} key={item.id}>
            <FirmCard item={item} handleEdit={handleEdit} />
          </Grid>
        );
      })}
    </Grid>
    <ModalFirms initialValues={initialValues} open={open} firmEdit={firmEdit} setFirmEdit={setFirmEdit} handleClose={handleClose} />
    </Box>
  );
};

export default Firms;
