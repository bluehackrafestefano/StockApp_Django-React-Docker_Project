import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StockContext } from '../../context/StockContext';


export default function SaleTransactions() {
  const {saleTransc,getSales} = React.useContext(StockContext)
  function createData(id, date,time, name, shipTo, paymentMethod, amount) {
    return { id, date,time, name, shipTo, paymentMethod, amount };
  }
  
  const rows = saleTransc.map(item => createData(item.id,item.createds,item.time_hour,item.brand,item.product,item.quantity,item.price_total))
  React.useEffect(() => {
    getSales()
  }, [])
  
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Brand's Name</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date} {row.time}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
