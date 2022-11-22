import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StockContext } from "../context/StockContext";
import { Button, Grid, Stack, Typography } from "@mui/material";
import ModalCategory from "../components/dashboard/ModalCategory";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";

function createData(id, name, product_count) {
  return { id, name, product_count };
}

export default function Categories() {
  const { getCategory, category,delCategory } = React.useContext(StockContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  React.useEffect(() => {
    getCategory();
  }, []);

  const handleClick = (id)=>{
    delCategory(id,navigate)
  }

  const rows = category?.map((item) =>
    createData(item.id, item.name, item.product_count)
  );
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
        Categories
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{ backgroundColor: "darkslategrey", mb: 1 }}
          color="warning"
          variant="contained"
          onClick={handleOpen}
        >
          New Category
        </Button>
      </Stack>
      <TableContainer
        sx={{ width: "60%", margin: "30px auto", alignItems: "center" }}
        component={Paper}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Number of Products</TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.product_count}</TableCell>
                {/* <TableCell ><DeleteOutlineIcon onClick={()=>handleClick(row.id)} sx={{cursor:"pointer"}} /></TableCell> */}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalCategory open={open} handleClose={handleClose} />
    </Grid>
  );
}
