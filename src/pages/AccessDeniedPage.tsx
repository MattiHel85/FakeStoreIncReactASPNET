import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

const AccessDeniedPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={'This page is for Admin only'} body={'If you are Admin, please sign in to continue...'} />
    </>
  )
}

export default AccessDeniedPage