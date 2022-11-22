import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import StarsIcon from '@mui/icons-material/Stars';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';

const ListItemsComp = () => {
  const admin = sessionStorage.getItem("admin")
  const navigate= useNavigate() 
  return (
    <List component="nav" sx={{backgroundColor:"darkslategrey",color:"white",height:"100%"}}>
            {admin && <ListItemButton to="https://anthonycw6.pythonanywhere.com/admin/" target="true">
            <ListItemIcon>  
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
            </ListItemButton>}
            <ListItemButton onClick={()=>navigate("/stock/dashboard")}>
            <ListItemIcon>  
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/stock/purchases")}>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Purchases" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/stock/sales")}>
            <ListItemIcon>
                <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Sales" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/stock/firms")}>
            <ListItemIcon>
                <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Firms" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/stock/brands")}>
            <ListItemIcon>
                <StarsIcon />
            </ListItemIcon>
            <ListItemText primary="Brands" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/stock/products")}>
            <ListItemIcon>
                <InventoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Products" />
            </ListItemButton>
            
            
            {/* <ListItemButton onClick={()=>navigate("/stock/categories")}>
            <ListItemIcon>
                <StarsIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            </ListItemButton> */}
    </List>
  )
}

export default ListItemsComp