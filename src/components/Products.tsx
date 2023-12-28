import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, TextField, Button, MenuItem, FormControl, Box, Pagination } from '@mui/material';
import styles from '../styles/styles.module.css'

import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';

import { fetchProducts, fetchProductsByCategory } from '../redux/slices/productSlice';
import debouncedHandleAddToCart from '../utils/cartHelpers';

import ProductCard from './ProductCard';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const Products: React.FC = () => {
  const {language} = useLanguage();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as number | '');
    dispatch(fetchProductsByCategory(event.target.value as number));
  };

  const handleShowSearch = () => {
    showSearchForm && setShowSearchForm(false)
    !showSearchForm && setShowSearchForm(true)
  }


  const filteredProducts = products.filter((filteredProduct) =>
    filteredProduct.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Number of items to display per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the index of the first and last item to display based on the current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages based on the filtered products and items per page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <>
      <Box className={styles.productsContainer}>
      { !showSearchForm && <Button onClick={handleShowSearch} className={styles.searchButton}> {getTranslation(language, 'Open Search')} </Button> }
      { showSearchForm && <Button onClick={handleShowSearch} className={styles.searchButton}> {getTranslation(language, 'Close Search')} </Button> }
      </Box>
      {
        showSearchForm && 
        <FormControl className={styles.form}>
          <TextField
            label={getTranslation(language, 'Search products')} 
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.textField}
          />
          <TextField
            select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label={getTranslation(language, 'Category')} 
            className={styles.textField}
          >
            <MenuItem value="">{getTranslation(language, 'Categories')}</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={getTranslation(language, 'Items Per Page')}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={styles.textField}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </TextField>
          <br />
        </FormControl>
      }
      <Container className={styles.productsContainer}>
        {currentItems.map(product => (
          <ProductCard 
            key={product.id.toString()} 
            product={product} 
            items={items} 
            dispatch={dispatch} 
            onAddToCart={debouncedHandleAddToCart} 
          />
        ))}
      </Container>
      {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className={styles.pagination}
          />
      )}
    </>
    
  );
};

export default Products;