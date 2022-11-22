import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StockContext } from "../context/StockContext";
import { Grid, Button, Typography, TableContainer, Paper } from "@mui/material";
import ModalProduct from "../components/dashboard/ModalProduct";
import Stack from "@mui/material/Stack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const {
    products,
    getProducts,
    getBrands,
    getCategory,
    delProduct,
  } = React.useContext(StockContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function createData(id, brand, category, name, stock) {
    return { id, brand, category, name, stock };
  }
  useEffect(() => {
    getProducts();
    getBrands();
    getCategory();
  }, []);

  const rows = products?.map((item) =>
    createData(item.id, item.brand, item.category, item.name, item.stock)
  );

  const handleClick = (id) => {
    delProduct(id, navigate);
  };

  return (
    <Grid item xs={12} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ p: 2, pt: "2px" }}
      >
        Products
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleOpen}>
          New Product
        </Button>
      </Stack>
      <TableContainer sx={{mt:1}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.map((item) =>
                createData(
                  item.id,
                  item.brand,
                  item.category,
                  item.name,
                  item.stock
                )
              )
              .map((row,index) => (
                <TableRow key={row.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  {!row.stock ? (
                    <TableCell sx={{ color: "red" }}>0</TableCell>
                  ) : (
                    <TableCell>{row.stock}</TableCell>
                  )}
                  <TableCell>
                    <DeleteOutlineIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleClick(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalProduct open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default Product;
