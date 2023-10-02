import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/slices/rootSlice';
import { AppDispatch } from '../redux/store';
import { createProduct } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Typography, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { ProductData } from '../types/Product';

const AddProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [productData, setProductData] = useState<ProductData>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [],
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

  const handleAddProduct = () => {
    dispatch(createProduct(productData));
    console.log(`Product: ${productData.title} added successfully`)
    setProductData({
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      categoryId: 0
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrls = e.target.value.split(',');
    setProductData({ ...productData, images: imageUrls });
  };

  return (
    <>
      <Typography variant='h3' sx={{ textAlign: 'center', my: '2.5em' }}>Add Product</Typography>
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: 'auto',
        }}
      >
        <TextField
          label='Title'
          name='title'
          value={productData.title}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <TextField
          label='Description'
          name='description'
          value={productData.description}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <TextField
          label='Price'
          type='number'
          name='price'
          value={productData.price}
          onChange={handleInputChange}
          sx={{
            margin: '5px',
          }}
        />
        <Select
          label='Category'
          name='categoryId'
          value={productData.categoryId}
          onChange={handleCategoryChange}
          sx={{
            margin: '5px',
          }}
        >
          <MenuItem value={0}>Select Category</MenuItem>
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label='Image URLs (comma-separated)'
          name='images'
          value={productData.images.join(',')} 
          onChange={handleImageChange}
          sx={{
            margin: '5px',
          }}
        />
        <Button
          sx={{
            borderRadius: '25px',
            width: '40%',
            margin: 'auto',
            marginTop: '10px',
          }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>
    </>
  );
};

export default AddProduct;