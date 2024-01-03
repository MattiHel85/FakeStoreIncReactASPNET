import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerUser } from '../redux/slices/userSlice';
import styles from '../styles/styles.module.css';

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({    
    Role: 'Customer',
    FirstName:'',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
    Addresses: [
      {
        HouseNumber: 0,
        Street: '',
        PostCode: ''
      }
    ],
  });

  const [message, setMessage] = useState<string>(''); 

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const adminCode = 'makeMeAdmin'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Check if the input field is for the admin code
    if (name === 'adminCode') {
      // If the admin code matches, set the role to 'admin'
      if (value === adminCode) {
        setUserData(prevData => ({
          ...prevData,
          role: 'admin',
        }));
      }
    }
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (userData.Password !== userData.ConfirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    dispatch(registerUser(userData));
    setMessage('');
    navigate('/signin')
  };

  return (
    <Container className={styles.signInContainer}>
      {message && <Typography className={styles.message} variant="body2">{message}</Typography>}
      <form onSubmit={handleSignUp} className={styles.signInForm}>
        <TextField
          label={'First name'}
          name="FirstName"
          value={userData.FirstName}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Last name'}
          name="LastName"
          value={userData.LastName}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Email'}
          name="email"
          value={userData.Email}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Password'}
          type="password"
          name="password"
          value={userData.Password}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Confirm password'}
          type="password"
          name="confirmPassword"
          value={userData.ConfirmPassword}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Admin Code (optional)'}
          name="adminCode"
          type="password"
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'House Number'}
          name={`Addresses.HouseNumber`}
          value={userData.Addresses[0].HouseNumber}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Street'}
          name={`Addresses.Street`}
          value={userData.Addresses[0].Street || ''}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={'Post Code'}
          name={`Addresses.PostCode`}
          value={userData.Addresses[0].PostCode}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <Button type='submit' className={styles.primaryButton}>{'sign up'}</Button>
      </form>

      <Link to={'/signin'} className={styles.linkText}>
        <Typography className={styles.textNotInForm} >{'Already have an account? Sign in'}</Typography>
      </Link>
    </Container>
  );
};

export default SignUp;