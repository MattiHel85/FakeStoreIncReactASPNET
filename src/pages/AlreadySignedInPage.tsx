import React from 'react';

import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';


const AlreadySignedInPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={"You're already signed in"} body={'You need to log out before you can perform this action.'}/>
    </>
  )
}

export default AlreadySignedInPage