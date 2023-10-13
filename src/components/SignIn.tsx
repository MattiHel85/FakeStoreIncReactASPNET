import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Typography, Container, Button, TextField } from "@mui/material";
import styles from '../styles/styles.module.css';

import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const SignIn: React.FC = ( ) => {
  const {language} = useLanguage();
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

const dispatch: AppDispatch = useDispatch();
const navigate = useNavigate()

const handleSignInChange = (e: any) => {
    const {name, value} = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = signInData;
      await dispatch(loginUser({ email, password }));
      navigate('/')
    } catch (error) {
      console.error('Signin failed:', error)
    }
  }
  return (
    <Container className={styles.signInContainer}>
      <form
        onSubmit={handleSignIn}
        className={styles.signInForm}
      >
        <TextField
          label={getTranslation(language, 'Email')}
          name="email" 
          value={signInData.email}
          onChange={handleSignInChange} 
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Password')}
          type="password"
          name="password" 
          value={signInData.password}
          onChange={handleSignInChange} 
          className={styles.textField}
        />
        <Button type='submit' className={styles.primaryButton}>{getTranslation(language, 'sign in')}</Button>
      </form>
        <Link to={'/forgotpassword'} className={styles.linkText}>        
          <Typography className={styles.textNotInForm}>{getTranslation(language, 'Forgot your password')}?</Typography>
        </Link>
        <Link to={'/signup'} className={styles.linkText}>
          <Typography className={styles.textNotInForm} >{getTranslation(language, 'No account? Sign up')}</Typography>
        </Link>
    </Container>
  )
}

export default SignIn