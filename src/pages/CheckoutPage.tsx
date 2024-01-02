import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Cart from '../components/Cart';

const CheckoutPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={'Checkout'} />
        <Cart />
    </>
  )
}

export default CheckoutPage