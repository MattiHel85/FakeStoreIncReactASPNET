import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SignUp from '../components/SignUp';

const SignUpPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={'sign up'} />
        <SignUp />
    </>
  )
}

export default SignUpPage