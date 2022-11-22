import * as React from 'react';
import Typography from '@mui/material/Typography';
import { StockContext } from '../../context/StockContext';



export default function Profits() {
  const {totalProfit} = React.useContext(StockContext)
  console.log(totalProfit)
  return (
    <React.Fragment>
      <Typography >Total Profit</Typography>
      {totalProfit.profitTotal > 0 ? (<Typography component="p" variant="h6" sx={{color:"green"}}>
        {totalProfit && totalProfit?.profitTotal.toLocaleString()}$
      </Typography>):(<Typography component="p" variant="h6" sx={{color:"red"}}>
        {totalProfit && totalProfit?.profitTotal.toLocaleString()}$
      </Typography>)}
      
      <Typography sx={{color:"#1C2331"}}>Total Sale</Typography>
      <Typography component="p" variant="h6">
        {totalProfit && totalProfit?.profitSale.toLocaleString()}$
      </Typography>
      <Typography sx={{color:"#1C2331"}}>Total Purchase</Typography>
      <Typography component="p" variant="h6">
        {totalProfit && totalProfit?.profitPurchase.toLocaleString()}$
      </Typography>
    </React.Fragment>
  );
}
