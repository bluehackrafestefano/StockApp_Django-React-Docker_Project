import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { Typography } from '@mui/material';
import { StockContext } from '../../context/StockContext';



export default function Chart() {
  const theme = useTheme();
  const {transaction} = React.useContext(StockContext)
  function createData(time, price_total) {
    return { time, price_total };
  }
  const data = transaction?.map(item=>createData(item.time_hour,parseInt(item.price_total)))//chart grafiğindeki veriler için

  return (
    <React.Fragment>
      <Typography sx={{color:"white",letterSpacing:"3px"}}>Today</Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            dataKey="price_total"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.secondary,
                ...theme.typography.body1,
              }}
            >
              Sale ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="price_total"
            stroke={theme.palette.text.secondary}
            dot={true}
          />
           <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
