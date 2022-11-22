import {
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import ModalBrand from "../components/dashboard/ModalBrand";
import { StockContext } from "../context/StockContext";

import BrandCard from "../components/Card/BrandCard";

const initialValues={
  "name": "",
  "image":""
}

const Brand = () => {
  const { brands, getBrands } = useContext(StockContext);
  const [open, setOpen] = React.useState(false);
  const [brandEdit,setBrandEdit] = useState(initialValues)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getBrands();
  }, []);

  const handleEdit = (data)=>{
    setBrandEdit(data)
    handleOpen()

  }

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ p: 2, pt: "2px" }}
      >
        Brands
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{ backgroundColor: "darkslategrey", mb: 1 }}
          color="warning"
          variant="contained"
          onClick={handleOpen}
        >
          New Brand
        </Button>
      </Stack>
      <Grid container spacing={1}>
        {brands?.map((item) => {
          return (
            <Grid item xs={12} md={3} lg={4} key={item.id}>
              <BrandCard item={item} handleEdit={handleEdit} />       
            </Grid>
          );
        })}
      </Grid>
      <ModalBrand initialValues={initialValues} open={open} brandEdit={brandEdit} setBrandEdit={setBrandEdit} handleClose={handleClose} />
    </Box>
  );
};

export default Brand;
