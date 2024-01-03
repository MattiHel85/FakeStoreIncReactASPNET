import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { updateProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import { ProductData } from '../types/Product';
import { updateProductProps } from '../types/Product';
import styles from '../styles/styles.module.css';

const UpdateProduct: React.FC<updateProductProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [productData, setProductData] = useState<ProductData>({
    id: 0,
    productName:'',
    description: '',
    image: [],
    price: '',
    stockQuantity: 0,
    categoryId: 0
  });

  useEffect(() => {
    // Set initial values to the product data
    setProductData({
        id: product.id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        image: product.image, 
        stockQuantity: product.stockQuantity,
        categoryId: product.categoryId, 
    });

    dispatch(fetchCategories());
  }, [dispatch, product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (event: any) => {
    setProductData({ ...productData, categoryId: event.target.value });
  };

  

  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedProduct = {
        id: product.id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        image: product.image, 
        stockQuantity: product.stockQuantity,
        categoryId: product.categoryId
      };

    dispatch(updateProduct(updatedProduct));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = e.target.value.split(',');
    setProductData({ ...productData, image: imageUrls });
  };

  return (
    <form
      onSubmit={handleUpdateProduct}
      className={styles.productForm}
    >
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
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label={'Image URLs (comma-separated)'}
        name='images'
        value={productData.image.join(',')} // Join the array into a comma-separated string for the input value
        onChange={handleImageChange}
        className={styles.textField}
      />
      <Button
        type='submit'
        className={styles.primaryButton}
      >
        {'Update'}
      </Button>
    </form>
  );
};

export default UpdateProduct