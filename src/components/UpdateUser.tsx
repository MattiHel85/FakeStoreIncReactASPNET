import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateUser } from '../redux/slices/userSlice'; 
import { UpdateUserProps } from '../types/User';
import { User } from '../types/User';
import styles from '../styles/styles.module.css';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const UpdateUser: React.FC<UpdateUserProps> = ({ user, setUser }) => {
  const {language} = useLanguage();
  const [userData, setUserData] = useState<User>({
    id: undefined,
    Role: '',  // Corrected property name from FirstName to Role
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    Addresses: [],
});


  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        id: user.id || undefined,
        FirstName: user.FirstName || '',
        LastName: user.LastName || '',
        Email: user.Email || '',
        Password: user.Password || '',
        Role: user.Role || 'Customer',
        Addresses: user.Addresses || [],
      }));
    }
  }, [user]);

  const dispatch: AppDispatch = useDispatch();
  const adminCode = 'makeMeAdmin';
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'adminCode' && value === adminCode) {
      setUserData(prevData => ({
        ...prevData,
        Role: 'Admin',
      }));
    }
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    navigate(`/users/${userData.id}`)
  };

  if (!user) {
    return <div>Loading...</div>; 
  }


  return (
    <Box className={styles.signInContainer}>
      <form onSubmit={handleUpdateUser} className={styles.signInForm}>
        <TextField
          label={getTranslation(language, 'Name')}
          name="FirstName"
          value={userData.FirstName}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Name')}
          name="LastName"
          value={userData.LastName}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Email')}
          name="Email"
          value={userData.Email}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Password')}
          type="password"
          name="Password"
          value={userData.Password}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Admin Code (optional)')}
          name="adminCode"
          type="password"
          onChange={handleInputChange}
          className={styles.textField}
        />
        {userData.Addresses.map((address, index) => (
          <div key={index}>
            <TextField
              label={getTranslation(language, 'House Number')}
              name={`Addresses[${index}].HouseNumber`}
              value={address.HouseNumber}
              onChange={handleInputChange}
              className={styles.textField}
            />
            <TextField
              label={getTranslation(language, 'Street')}
              name={`Addresses[${index}].Street`}
              value={address.Street || ''}
              onChange={handleInputChange}
              className={styles.textField}
            />
            <TextField
              label={getTranslation(language, 'Post Code')}
              name={`Addresses[${index}].PostCode`}
              value={address.PostCode}
              onChange={handleInputChange}
              className={styles.textField}
            />
          </div>
        ))}
        <Button type='submit' className={styles.primaryButton}>
          {getTranslation(language, 'Update user')}
        </Button>
      </form>
      
    </Box>
  );
};

export default UpdateUser;
