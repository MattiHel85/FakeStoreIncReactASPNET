import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SignIn from '../components/SignIn';

const SignInPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={'sign in'} />
        <SignIn />
    </>
  )
}

export default SignInPage