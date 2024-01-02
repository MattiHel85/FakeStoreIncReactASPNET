import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={'Contact us'} />
        <ContactForm />
    </>
  )
}

export default ContactPage