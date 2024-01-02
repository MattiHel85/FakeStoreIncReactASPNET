import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Guid} from 'guid-typescript';
import { useDispatch, useSelector } from 'react-redux';

import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  Button,
  Typography,
  Box,
  IconButton,
  Container
 } from '@mui/material';
 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { RootState } from '../redux/slices/rootSlice';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { AppDispatch } from '../redux/store';
import { CartItem } from '../types/Cart';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart)
  
  const handleIncreaseQuantity = (productId: Guid | number) => {
      dispatch(increaseQuantity(productId));        
  };
  const handleDecreaseQuantity = (productId: Guid | number) => {
      dispatch(decreaseQuantity(productId));
  };  
  const handleRemoveFromCart = (productId: Guid | number) => {
      dispatch(removeFromCart(productId)); 
    };
  const handleClearCart = () => {
    dispatch(clearCart());
  }
    
  const handleBrowse = () => {
    navigate('/products')
  }

  return (
    <>
        {items.length > 0 && (
                <>
                  <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ textAlign: 'center'}} ><RemoveIcon/></TableCell>
                            <TableCell sx={{ textAlign: 'center' }} ><AddIcon /></TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: '700' }} >{'Name'}</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: '700' }} >€</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: '700' }} >{'Qty'}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }} ><DeleteIcon /></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.map((item: CartItem) => (
                            <TableRow key={Number(item.id)}>
                              <TableCell sx={{ textAlign: 'center'}}>
                                <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
                                  <RemoveIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>
                                <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                                  <AddIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>{item.name}</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>€{item.price}</TableCell>
                              <TableCell sx={{ textAlign: 'center'}}>{item.quantity}</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>
                                <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                  </TableContainer>
                  <Box 
                      sx={{
                          display:'flex',
                          justifyContent: 'space-between',
                          marginTop: '1.5em'
                      }}
                  >
                      <Typography variant='body2'>
                      {'Total products'}: {items.reduce((total, item) => total + item.quantity, 0)}
                      </Typography>
                      <Typography variant='body2'>
                      {'Subtotal'}: €
                        {items.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2)}
                      </Typography>
                      <Button onClick={handleClearCart}>{'Empty cart'}</Button>
                  </Box>
                </>            
        )}

        {items.length === 0 && (
            <Container sx={{
              padding: '2em', 
              // width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
              }}
            >
              <Typography variant='h5' sx={{marginTop: '1em', textAlign: 'center'}}>{'Cart Empty'}</Typography>
              <Typography variant='body1' sx={{marginTop: '1em', textAlign: 'center'}}>{"You've not added anything yet"}!</Typography>
                <Button sx={{
                  width: {xs:'80%', md: '100%'},
                  margin: 'auto',
                  fontSize: {xs: '12px', md: '15px'}
                }} 
                onClick={handleBrowse}
                >
                  {'browse our products'}
                </Button>
            </Container>
        )}

    </>
  )
}

export default Cart;
