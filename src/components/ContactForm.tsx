import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import styles from '../styles/styles.module.css';

const ContactForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    firstName: user ? user.FirstName : '',
    lastName: user ? user.LastName : '',
    email: user ? user.Email : '',
    message: '',
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
      firstName: user ? user.FirstName : '',
      lastName: user ? user.LastName : '',
      email: user ? user.Email : '',
      message: '',
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
          label={'First name'}
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label={'Last name'}
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className={styles.textField}
        />
        <TextField
          label={'Email'}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          type="email"
          className={styles.textField}
        />
        <TextField
          label={'Message'}
          name="message"
          value={formData.message}
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
          {'Submit'}
        </Button>
      </form>
      {
        showMessage && 
        <Box className={styles.messageBox}>
            <Typography className={styles.messageHeader} variant='h6'>
                {'Your message could not be sent'}
            </Typography>
            <Typography className={styles.messageBody} variant='body1'>
                {'This is because the API does not currently support this feature'}
            </Typography>
            <Button className={styles.secondaryButton} onClick={() => setShowMessage(false)}>{'Close message'}</Button>
        </ Box>
      }
    </Container>
  );
};

export default ContactForm;