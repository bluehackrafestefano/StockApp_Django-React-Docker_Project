import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { StockContext } from "../context/StockContext";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import ModalTransaction from "../components/dashboard/ModalPurchases";
// import { DataGrid } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

// const columns = [
//   { field: "date", headerName: "DATE", width: 150 },
//   { field: "name", headerName: "Firm's Name", width: 150 },
//   { field: "product", headerName: "Product", width: 250 },
//   {
//     field: "transaction",
//     headerName: "Transaction",
//     width: 150,
//     sortable: false,
//   },
//   { field: "quantity", headerName: "Quantity", width: 125, sortable: false },
//   { field: "amount", headerName: "Amount", width: 100 },
// ];

const initialValues = {
  firm_id: "",
  brand_id: "",
  transaction: 1,
  product_id: "",
  quantity: "",
  price: "",
};

const Purchases = () => {
  const {
    purchaseTransc,
    getPurchases,
    delPurchase,
    firms,
    brands,
    products,
  } = React.useContext(StockContext);
  const [info, setInfo] = useState(initialValues);
  const [field, setField] = useState("");
  const [filterCategory, setfilterCategory] = useState("choose"); //tıklanana göre filter yapması için
  const [sort, setSort] = useState("default"); //tıklanana göre sort yapması için
  // const [showFilter, setShowFilter] = useState(false); //filter butonlarını göstermesi için
  const [showSort, setShowSort] = useState(false); //sort butonlarını göstermesi için
  const [filteredData, setFilteredData] = useState(purchaseTransc);
  const [showRendering, setShowRendering] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPurchases();
  }, []);

  function createData(
    id,
    date,
    name,
    firm,
    brand,
    product,
    quantity,
    amount,
    firm_id,
    brand_id,
    price,
    product_id
  ) {
    return {
      id,
      date,
      name,
      firm,
      brand,
      product,
      quantity,
      amount,
      firm_id,
      brand_id,
      price,
      product_id,
    };
  }

  const getTableData = () => {
    const rows = purchaseTransc.map((item) =>{
      console.log(item)
      const {id,createds,firm,brand,product,quantity,price_total,firm_id,brand_id,price,product_id} = item
      const {name} = item.category[0]
      return (
        createData(
          id,
          createds,
          name,
          firm,
          brand,
          product,
          quantity,
          price_total,
          firm_id,
          brand_id,
          price,
          product_id
        )
      )
    }
      
    );
    setFilteredData(rows);
  };

  useEffect(() => {
    getTableData();
  }, [purchaseTransc]);

  const getFilter = () => {
    if (filterCategory === "choose") {
      getTableData();
    } else if (filterCategory === "firm") {
      if (field) {
        const rows = purchaseTransc.map((item) =>{
        const {id,createds,firm,brand,product,quantity,price_total,firm_id,brand_id,price,product_id} = item
        const {name} = item.category[0]
        return (
          createData(
            id,
            createds,
            name,
            firm,
            brand,
            product,
            quantity,
            price_total,
            firm_id,
            brand_id,
            price,
            product_id
          )
        )
      }
        );
        const data = rows.filter((item) => item.firm_id === field);
        setFilteredData(data);
      }
    } else if (filterCategory === "product") {
      if (field) {
        const data = filteredData.filter((item) => item.product_id === field);
        setFilteredData(data);
      }
    }
    /* else if(filterCategory==="firm"){
      if(field){
        const data = filteredData.filter(item=> item.firm === field )
        setFilteredData(data)
      }
    } */
  };

  const getSort = () => {
    if (sort === "brand") {
      const sortData = filteredData.sort((a, b) => {
        if (a.brand < b.brand) return -1;
        if (a.brand > b.brand) return 1;
        return 0;
      });
      setFilteredData(sortData);
    } else if (sort === "amount") {
      const sortData = filteredData.sort((a, b) => +a.amount - +b.amount);
      setFilteredData(sortData);
    } else {
      if(filterCategory !== "choose"){
        getFilter()
      }
    }
    setShowRendering(!showRendering); //rendering yaptırmak için
  };

  useEffect(() => {
    getSort();
  }, [sort]);

  //filterCategory statine göre filtrelemesi için
  useEffect(() => {
    getFilter();
  }, [field, filterCategory, purchaseTransc]);

  const handleClick = (id) => {
    delPurchase(id, navigate);
  };
  const handleEdit = (data) => {
    setInfo(data);
    handleOpen();
  };

  if (filteredData.length < 0) {
    return <h1>Data Not found...</h1>;
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ p: 2, pt: "2px" }}
      >
        Purchases
      </Typography>

      <Stack
        sx={{ justifyContent: "space-between" }}
        direction="row"
        spacing={2}
      >
        <Button
          sx={{ backgroundColor: "darkslategrey" }}
          color="warning"
          variant="contained"
          onClick={handleOpen}
        >
          New Purchase
        </Button>
        <div style={{ flexGrow: 1, justifyContent: "space-between" }}></div>
        {/* <Button
          variant="contained"
          color="warning"
          sx={{backgroundColor:"darkslategrey"}}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </Button> */}

        <>
          {/* <Button
              variant="contained"
              onClick={() => setfilterCategory("all")}
            >
              All
            </Button>
            <Button variant="contained" onClick={() => setfilterCategory(0)}>
              Sale
            </Button>
            <Button variant="contained" onClick={() => setfilterCategory(1)}>
              Purchase
            </Button> */}
          <FormControl sx={{ height: "40px", justifyContent: "end" }}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterCategory}
              label="Filter"
              sx={{ height: "40px" }}
              onChange={(e) => setfilterCategory(e.target.value)}
            >
              <MenuItem value={"choose"}>Choose</MenuItem>
              <MenuItem value={"firm"}>Firm's Name</MenuItem>
              <MenuItem value={"product"}>Product Name</MenuItem>
              <MenuItem value={"brand"}>Brands Name</MenuItem>
            </Select>
          </FormControl>
          {filterCategory !== "choose" && (
            <FormControl sx={{ height: "40px", justifyContent: "end" }}>
              <InputLabel id="demo-simple-select-label">Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field}
                label="Name"
                sx={{ height: "40px", width: "80px" }}
                onChange={(e) => setField(e.target.value)}
              >
                {filterCategory === "firm"
                  ? firms?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  : filterCategory === "brand"
                  ? brands?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  : filterCategory === "product"
                  ? products?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          )}
        </>
        <Button
          variant="contained"
          color="warning"
          sx={{ backgroundColor: "darkslategrey" }}
          onClick={() => setShowSort(!showSort)}
        >
          Sort
        </Button>
        {showSort && (
          <>
            {/* <Button variant="contained" onClick={() => setSort("")}>
              Default
            </Button>
            <Button variant="contained" onClick={() => setSort("name")}>
              Firm's Name
            </Button>
            <Button variant="contained" onClick={() => setSort("amount")}>
              Amount
            </Button>  */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value=""
                checked={sort === ""}
                control={<Radio />}
                label="Default"
                onClick={() => setSort("")}
              />
              <FormControlLabel
                checked={sort === "brand"}
                value="brand"
                control={<Radio />}
                label="Brand's Name"
                onClick={() => setSort("brand")}
              />
              <FormControlLabel
                checked={sort === "amount"}
                value="amount"
                control={<Radio />}
                label="Amount"
                onClick={() => setSort("amount")}
              />
            </RadioGroup>
          </>
        )}
        <FormControl sx={{ height: "40px", justifyContent: "end" }}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            sx={{ height: "40px" }}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="default">Choose</MenuItem>
            <MenuItem value={"amount"}>Price Ascending</MenuItem>
            <MenuItem value={"brand"}>Brand's Name(A-Z)</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Paper
        sx={{
          // height: "80vh",
          width: "90%",
          // overflow: "hidden",
          margin: "30px auto",
        }}
      >
        {/* <DataGrid
          rows={tableRowData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
        /> */}
        <TableContainer sx={{ border: "5px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Firm's Name</TableCell>
                <TableCell>Brand's Name</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.firm}</TableCell>
                      <TableCell>{row.brand}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>${row.amount}</TableCell>
                      <TableCell>
                        <EditIcon
                          onClick={() => handleEdit(row)}
                          sx={{ cursor: "pointer" }}
                        />
                        <DeleteOutlineIcon
                          onClick={() => handleClick(row.id)}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            filteredData.length < 25 ? "All" : filteredData.length,
          ]}
          colSpan={3}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ModalTransaction
        initialValues={initialValues}
        info={info}
        setInfo={setInfo}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default Purchases;
