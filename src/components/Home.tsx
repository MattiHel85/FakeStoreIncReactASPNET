import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store';
import { removeProductOfTheMonth } from '../redux/slices/productOfTheMonthSlice';
// import debouncedHandleAddToCart from '../utils/cartHelpers';
import { RootState } from '../redux/slices/rootSlice';
import { Typography, Container, Box, Button } from "@mui/material"
import Header from './Header';
import styles from '../styles/styles.module.css'

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';


const Home: React.FC = ( ) => {
  const { language } = useLanguage()
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const product = useSelector((state: RootState) => state.productOfTheMonth.productOfTheMonth)
  const user = useSelector((state: RootState) => state.auth.user)
  

  // const handleAddToCart = () => {
  //   product && debouncedHandleAddToCart(product, items, dispatch)
  //   console.log('Added to cart: ', product)
  // };

  const handleRemoveProductOfTheMonth = () => {
    dispatch(removeProductOfTheMonth());
  };

  return (
    <>
        {
          product ? 
            <>
            <Header title={getTranslation(language, 'Product of the month')}/>
              <Container className={styles.potmContainer}>              
                <Box className={styles.potmBox} >
                  <img 
                    className={styles.potmImage} 
                    src={product?.image?.[0]} 
                    alt={``} 
                  />
                  <Box
                    className={styles.potmBoxOne}
                  >
                    <Box className={styles.potmBoxTwo}>
                    <Typography className={styles.potmTextFieldTwo}>{product?.productName}</Typography>
                      <Typography className={styles.potmTextFieldTwo}>€{product?.price}</Typography>
                    </Box>
                    <Box className={styles.potmBoxThree}>
                      <Typography className={styles.potmTextFieldThree}>{product?.description}</Typography>
                      
                      <Box className={styles.potmBoxFour}>
                        { user?.role === 'admin' ?
                          <Button className={styles.potmSecondaryButton} onClick={handleRemoveProductOfTheMonth}> {getTranslation(language, 'Remove as P.O.M')} </Button> :
                          <></>
                        }
                        {/* <Button className={styles.potmPrimaryButton} onClick={handleAddToCart}>{getTranslation(language, 'Add to cart')}</Button> */}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </> : <Header title={getTranslation(language, 'Welcome to FakeShop Inc!')}/>
        }
    </>
  )
}

export default Home