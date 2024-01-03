import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { createProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { AddProductData } from '../types/Product';
import styles from '../styles/styles.module.css'
import { Category } from '../types/Category';

const AddProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [productData, setProductData] = useState<AddProductData>({
    productName:'',
    description: '',
    image: [],
    price: '',
    stockQuantity: 0,
    categoryId: 0
  });

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (event: any) => {
    setProductData({ ...productData, categoryId: event.target.value });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    setProductData({
      productName:'',
      description: '',
      image: [],
      price: '',
      stockQuantity: 0,
      categoryId: 0
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = e.target.value.split(',');
    setProductData({ ...productData, image: imageUrls });
  };

  return (
    <>
      <Typography variant='h4' sx={{ textAlign: 'center', my: '2.5em' }}>{'Add product'}</Typography>
        <form className={styles.productForm} onSubmit={handleAddProduct}>
          <TextField
            label={'Name'}
            name='title'
            value={productData.productName}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label={'Description'}
            name='description'
            value={productData.description}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <TextField
            label={'Price'}
            type='number'
            name='price'
            value={productData.price}
            onChange={handleInputChange}
            className={styles.textField}
          />
          <Select
            label={'Category'}
            name='categoryId'
            value={productData.categoryId}
            onChange={handleCategoryChange}
            className={styles.textField}
          >
            <MenuItem value={0}>{'Select Category'}</MenuItem>
            {categories.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label={'Image URLs (comma-separated)'}
            name='images'
            value={productData.image.join(',')} 
            onChange={handleImageChange}
            className={styles.textField}
          />
          <Button
            type="submit"
            className={styles.primaryButton}
          >
            {'Add product'}
          </Button>
        </form>
    </>
  );
};

export default AddProduct;