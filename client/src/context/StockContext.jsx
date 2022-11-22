import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const StockContext = createContext();

const url = "http://localhost:8000/";

const StockContextProvider = (props) => {
  const [titleComp, setTitleComp] = useState();
  const { myKey } = useContext(AuthContext);
  const [transaction, setTransaction] = useState([]);
  const [totalProfit, setTotalProfit] = useState({});
  const [stockData, setStockData] = useState([]);
  const [saleTransc,setSaleTransc] = useState([])
  const [purchaseTransc,setPurchaseTransc] = useState([])
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [firms, setFirms] = useState([]);
  const [brands, setBrand] = useState([]);

  const getAllTransaction = async () => {
    try {
      const res = await axios.get(`${url}stock/purchases/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      const resSale = await axios.get(`${url}stock/sales/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      if (res.data && resSale.data) {
        setStockData([...res.data,...resSale.data]); //tranasctionall
        const sale = resSale.data.filter((item) =>item.createds === new Date().toLocaleDateString()); //günü bugün olan işlemler
        const saleCount = resSale.data.map((item) => Number.parseFloat(item.price_total));
        const purchaseCount = res.data.map((item) => Number.parseFloat(item.price_total));
        const profitSale = saleCount.reduce((a, b) => a + b);
        const profitPurchase = purchaseCount.reduce((a, b) => a + b);
        const profitTotal = profitSale - profitPurchase;
        setTransaction(sale); //transaction out olanlar
        setTotalProfit({ profitSale, profitPurchase, profitTotal }); //toplam gelir gider
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getTransactionFilter = async (query) => {
  //   try {
  //     const res = await axios.get(`${url}stock/transc/?transaction=${query}`, {
  //       headers: { Authorization: `Token ${myKey}` },
  //     });
  //     if (res.data) {
  //       if(query === "0"){
  //         setSaleTransc(res.data)
  //       }else{
  //         setPurchaseTransc(res.data)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getSales = async () => {
    try {
      const res = await axios.get(`${url}stock/sales/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      setSaleTransc(res.data)
    } catch (error) {
      console.log(error);
    }
  };
  const getPurchases = async () => {
    try {
      const res = await axios.get(`${url}stock/purchases/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      setPurchaseTransc(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    const res = await axios.get(`${url}stock/product/`, {
      headers: { Authorization: `Token ${myKey}` },
    });
    // console.log(res.data)
    setProducts(res.data);
  };
  const getCategory = async () => {
    const res = await axios.get(`${url}stock/category/`, {
      headers: { Authorization: `Token ${myKey}` },
    });
    // console.log(res.data)
    setCategory(res.data);
  };
  const getFirms = async () => {
    const res = await axios.get(`${url}stock/firm/`, {
      headers: { Authorization: `Token ${myKey}` },
    });
    // console.log(res.data)
    setFirms(res.data);
  };
  const getBrands = async () => {
    const res = await axios.get(`${url}stock/brand/`, {
      headers: { Authorization: `Token ${myKey}` },
    });
    setBrand(res.data);
  };

  const postPurchase = (info, navigate) => {
    var config = {
      method: "post",
      url: `${url}stock/purchases/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Purchase succesfully added!");
        getPurchases();
        navigate("/stock/purchases");
      })
      .catch(function (error) {
        toastErrorNotify("Purchase not added!");
      });
  };
  const postSale = (info, navigate) => {
    var config = {
      method: "post",
      url: `${url}stock/sales/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Sale succesfully added!");
        getSales();
        navigate("/stock/sales");
      })
      .catch(function (error) {
        toastErrorNotify(error.response.data.non_field_errors[0]);
      });
  };
  const postProduct = (info, navigate) => {
    var config = {
      method: "post",
      url: `${url}stock/product/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify(
          "Product succesfully added!"
        );
        getProducts();
        navigate("/stock/products");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          "Lütfen yetkinizi kontrol edin veya girdiğiniz bilgileri"
        );
      });
  };

  const putPurchase = (info, navigate) => {
    var config = {
      method: "put",
      url: `${url}stock/purchases/${info.id}/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Purchase succesfully updated!");
        getPurchases();
        navigate("/stock/purchases");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          "Lütfen yetkinizi kontrol edin veya girdiğiniz bilgileri"
        );
      });
  };
  const putSale = (info, navigate) => {
    var config = {
      method: "put",
      url: `${url}stock/sales/${info.id}/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Sale succesfully updated!");
        getSales();
        navigate("/stock/sales");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          "Lütfen yetkinizi kontrol edin veya girdiğiniz bilgileri"
        );
      });
  };

  const postFirm = (info, navigate) => {
    if(!info.image){
      delete info.image
    }
    var config = {
      method: "post",
      url: `${url}stock/firm/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Firm succesfully added!Now you can add product!");
        getFirms();
        navigate("/stock/firms");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          error.response.data.name[0] || "Please check your authorization or the information you have entered!"
        );
      });
  };
  const putFirm = (info, navigate) => {
    if(!info.image){
      delete info.image
    }
    var config = {
      method: "put",
      url: `${url}stock/firm/${info.id}/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Firm succesfully updated!");
        getFirms();
        navigate("/stock/firms");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          error.response.data.name[0] || "Please check your authorization or the information you have entered!"
        );
      });
  };
  const postCategory = (info, navigate) => {
    var config = {
      method: "post",
      url: `${url}stock/category/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify(
          "Category succesfully added!Now you can add product!"
        );
        getCategory();
        navigate("/stock/categories");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          "Lütfen yetkinizi kontrol edin veya girdiğiniz bilgileri"
        );
      });
  };

  const postBrand = (info, navigate) => {
    if(!info.image){
      info = {
        "name":info.name
      }
    }
    var config = {
      method: "post",
      url: `${url}stock/brand/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Brand succesfully added!Now you can add product!");
        getBrands();
        navigate("/stock/brands");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          error.response.data.name[0] || "Please check your authorization or the information you have entered!"
        );
      });
  };
  const putBrand = (info, navigate) => {
    if(!info.image){
      delete info.image
    }
    console.log(info)
    var config = {
      method: "put",
      url: `${url}stock/brand/${info.id}/`,
      headers: {
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    axios(config)
      .then(function (response) {
        toastSuccessNotify("Brand succesfully updated!");
        getBrands();
        navigate("/stock/brands");
      })
      .catch(function (error) {
        console.log(error);
        toastErrorNotify(
          error.response.data.name[0] || "Please check your authorization or the information you have entered!"
        );
      });
  };

  const delProduct = async (id, navigate) => {
    try {
      const res = await axios.delete(`${url}stock/product/${id}`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/products");
      getProducts();
      toastSuccessNotify("Product succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };
  const delCategory = async (id, navigate) => {
    try {
      await axios.delete(`${url}stock/category/${id}`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/categories");
      getCategory();
      toastSuccessNotify("Category succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };

  const delFirm = async (id, navigate) => {
    try {
     await axios.delete(`${url}stock/firm/${id}`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/firms");
      getFirms();
      toastSuccessNotify("Firm succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };
  const delBrand = async (id, navigate) => {
    try {
      await axios.delete(`${url}stock/brand/${id}`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/brands");
      getBrands();
      toastSuccessNotify("Brand succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };

  const delPurchase = async (id, navigate) => {
    try {
      await axios.delete(`${url}stock/purchases/${id}/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/purchases");
      getProducts();
      toastSuccessNotify("Purchase succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };
  const delSale = async (id, navigate) => {
    try {
      await axios.delete(`${url}stock/sales/${id}/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      // setProducts(res.data);
      navigate("/stock/sales");
      getProducts();
      toastSuccessNotify("Sale succesfully deleted!");
    } catch (error) {
      toastErrorNotify("Lütfen yetkinizi kontrol edin!");
    }
  };

  useEffect(() => {
    if (myKey) {
      getAllTransaction();
      getBrands();
      // getTransactionFilter();
    }
  }, []);

  let value = {
    titleComp,
    setTitleComp,
    getAllTransaction,
    getSales,
    getPurchases,
    getProducts,
    getBrands,
    getFirms,
    getCategory,
    postPurchase,
    postSale,
    postProduct,
    postFirm,
    postCategory,
    postBrand,
    putPurchase,
    putSale,
    putFirm,
    putBrand,
    delProduct,
    delPurchase,
    delSale,
    delFirm,
    delCategory,
    delBrand,
    transaction,
    setTransaction,
    totalProfit,
    stockData,
    setStockData,
    saleTransc,
    purchaseTransc,
    products,
    firms,
    brands,
    category,
  };

  return (
    <StockContext.Provider value={value}>
      {props.children}
    </StockContext.Provider>
  );
};

export default StockContextProvider;
