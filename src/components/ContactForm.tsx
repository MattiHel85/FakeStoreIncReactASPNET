import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import styles from '../styles/styles.module.css';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const ContactForm: React.FC = () => {
  const { language } = useLanguage()
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    FirstName: user ? user.FirstName : '',
    LastName: user ? user.LastName : '',
    Email: user ? user.Email : '',
    Message: '',
});
  const [showMessage, setShowMessage] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      FirstName: user ? user.FirstName : '',
      LastName: user ? user.LastName : '',
      Email: user ? user.Email : '',
      Message: '',
    });

    setShowMessage(true)

  };

  return (
    <Container className={styles.cfmContainer}>
      <form 
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <TextField
          label={getTranslation(language, 'Name')}
          name="FirstName"
          value={formData.FirstName}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Name')}
          name="LastName"
          value={formData.LastName}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Email')}
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
          required
          type="email"
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Message')}
          name="Message"
          value={formData.Message}
          onChange={handleInputChange}
          required
          multiline
          rows={4}
          className={styles.textField}
        />
        <Button 
          type="submit"
          className={styles.primaryButton}
        >
          {getTranslation(language, 'Submit')}
        </Button>
      </form>
      {
        showMessage && 
        <Box className={styles.messageBox}>
            <Typography className={styles.messageHeader} variant='h6'>
                {getTranslation(language, 'Your message could not be sent')}
            </Typography>
            <Typography className={styles.messageBody} variant='body1'>
                {getTranslation(language, 'This is because the API does not currently support this feature')}
            </Typography>
            <Button className={styles.secondaryButton} onClick={() => setShowMessage(false)}>{getTranslation(language, 'Close message')}</Button>
        </ Box>
      }
    </Container>
  );
};

export default ContactForm;
