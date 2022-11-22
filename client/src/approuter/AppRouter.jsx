import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Dashboards from '../components/dashboard/Dashboards'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PrivateRouter from "./PrivateRouter"
import DashboardsCards from "../components/dashboard/DashboardCards"
import Firms from '../pages/Firms'
import Product from '../pages/Product'
import Sales from '../pages/Sales'
import Brand from '../pages/Brand'
import Purchases from '../pages/Purchases'


const AppRouter = () => {

    return (
      <Router>
        {/* <NavBar/> */}
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/stock" element={<PrivateRouter />}>
              <Route path="/stock" element={<Dashboards/>} >
                  <Route path="dashboard" element={<DashboardsCards />} />
                  <Route path='firms' element={<Firms />} />
                  <Route path='products' element={<Product />} />
                  <Route path='purchases' element={<Purchases />} />
                  <Route path='sales' element={<Sales />} />
                  <Route path='brands' element={<Brand />} />
                  {/* <Route path='categories' element={<Categories />} /> */}
              </Route>
            </Route>
              
          </Routes>
      </Router>
  
    )
  }
  
  export default AppRouter