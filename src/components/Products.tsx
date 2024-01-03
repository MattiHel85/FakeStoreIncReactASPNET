import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, TextField, Button, MenuItem, FormControl, Box, Pagination } from '@mui/material';
import styles from '../styles/styles.module.css'

import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';

import { fetchProducts } from '../redux/slices/productSlice';
import debouncedHandleAddToCart from '../utils/cartHelpers';

import ProductCard from './ProductCard';
import { Category } from '../types/Category';
import { fetchCategories, fetchCategoryById } from '../redux/slices/categorySlice';
import { Guid } from 'guid-typescript';

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [category, setCategory] = useState<Category | unknown>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState<Guid | ''>('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCategoryId = event.target.value as Guid;
    setSelectedCategory(selectedCategoryId);

    if (selectedCategoryId) {
      // Fetch the category by id if it is selected
      const fetchedCategory = await dispatch(fetchCategoryById(selectedCategoryId));
      console.log(fetchedCategory.payload);
      setCategory(fetchedCategory.payload);
    } else {
      // If no category is selected, reset the category state
      dispatch(fetchCategories());
    }
  };

  const handleShowSearch = () => {
    showSearchForm && setShowSearchForm(false)
    !showSearchForm && setShowSearchForm(true)
  }

  let filteredProducts = products.filter((filteredProduct) =>
    (filteredProduct.productName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? filteredProduct.categoryId === selectedCategory : true))
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
      { !showSearchForm && <Button onClick={handleShowSearch} className={styles.searchButton}> {'Open Search'} </Button> }
      { showSearchForm && <Button onClick={handleShowSearch} className={styles.searchButton}> {'Close Search'} </Button> }
      </Box>
      {
        showSearchForm && 
        <FormControl className={styles.form}>
          <TextField
            label={'Search products'} 
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
            label={'Category'} 
            className={styles.textField}
          >
            <MenuItem value="">{'Categories'}</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={'Items Per Page'}
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