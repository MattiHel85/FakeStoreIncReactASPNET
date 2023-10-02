import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import ProductCard from './ProductCard';

import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

import { AppDispatch } from '../redux/store';

import { fetchProducts } from '../redux/slices/productSlice';
import { RootState } from "../redux/slices/rootSlice";

import { Product } from '../types/Product';


import debouncedHandleAddToCart from '../utils/cartHelpers';



const Products: React.FC = () => {
  const { products, loading, error } = useSelector((state: any) => state.products);

  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5; // You can adjust the number of items per page
  const { items } = useSelector((state: RootState) => state.cart)
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box>
      <Header title='Products' />
      <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {currentItems.map((product: Product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            items={items}
            dispatch={dispatch}
            onAddToCart={debouncedHandleAddToCart}
          />
        ))}
      </Box>
      <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            width: '30%',
            margin: 'auto',
            marginTop: '2em',
            marginBottom: '2em'
          }}
        />
    </ Box>
  );
};

export default Products;