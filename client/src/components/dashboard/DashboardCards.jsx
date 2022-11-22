import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import { StockContext } from '../../context/StockContext';
import { Typography } from '@mui/material';
import Profits from './Profits';
import SaleTransactions from './SaleTransactions';

const DashboardCards = () => {

  const {totalProfit} = React.useContext(StockContext)
  // console.log(totalProfit)
  
  return (
    <Container sx={{ }}>
      <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ p:2 }}
            >
              Dashboard
          </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    // backgroundColor:"rgb(180 83 9)",
                  }}
                >
                  {totalProfit?.profitSale && <Chart />}
                  
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor:"#348888",
                    color:"white"
                  }}
                >
                  {totalProfit?.profitSale && <Profits />}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                  <SaleTransactions />
                </Paper>
              </Grid>
            </Grid>
          </Container>
  )
}

export default DashboardCards