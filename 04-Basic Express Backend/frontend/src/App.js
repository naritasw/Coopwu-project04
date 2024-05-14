import React from "react";
import CreateOneUser from './views/CreateUser';
import UserList from './views/UserList';

import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Footer from "./Components/Footer";
import Topbar from "./Components/Topbar";
import DetailUser from './views/DetailUser';
import CreateProduct from './views/CreateProduct';
import DetailProduct from './views/DetailProduct';
import EditProduct from './views/EditProduct';
import Checkout from './views/Checkout';


function App() {
  return (
   <div>
      <BrowserRouter basename='/'>
        <Topbar appTitle='IARC Devboard' />{" "}
        <Routes>
          <Route path='/' element={<DetailProduct />} />
          <Route path='/create' element={<CreateOneUser />} />
          <Route path='/UserList' element={<UserList />} />
          <Route path='/detail/:id' element={<DetailUser />} />
          <Route path='/CreateProduct' element={<CreateProduct />} />
          <Route path='/Product/edit/:id' element={<EditProduct />} />
          <Route path='/Checkout/:id' element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;