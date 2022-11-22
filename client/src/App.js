import './App.css';
import AuthContextProvider from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import AppRouter from './approuter/AppRouter';
import StockContextProvider from './context/StockContext';

function App() {
  return (
    <div className="App">
     <AuthContextProvider>
      <StockContextProvider>
      {/* <Dashboard /> */}
      {/* <Login /> */}
      <AppRouter />
      <ToastContainer />
      </StockContextProvider>
      </AuthContextProvider> 
    </div>
  );
}

export default App;
