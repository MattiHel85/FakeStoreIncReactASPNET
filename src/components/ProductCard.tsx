import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { Guid } from "guid-typescript";
import { ProductCardProps } from "../types/Product";
import { fetchCategoryById } from "../redux/slices/categorySlice";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import styles from '../styles/styles.module.css'

const ProductCard: React.FC<ProductCardProps> = ({ product, items, onAddToCart}) => {
    const dispatch: AppDispatch = useDispatch(); 
    const navigate = useNavigate();
    const id = product?.id;
    const firstImage = product?.Image?.[0];
    const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
    const navigateToProduct = () => {
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        const fetchCategory = async () => {
          if (product && product.CategoryId) {
            try {
              const response = await dispatch(fetchCategoryById(product.CategoryId));
              const categoryData = response.payload as { name: string };
              setCategoryName(categoryData.name);
            } catch (error) {
              console.error("Error fetching category data:", error);
            }
          }
        };
    
        fetchCategory();
      }, [dispatch, product]);

    const handleAddToCart = () => {
        onAddToCart && onAddToCart(product, items, dispatch);
    }

    return(
        <>
            <Card 
                className={styles.productCard} 
                key={Number(product.id)}
            >
                <CardMedia 
                    onClick={navigateToProduct}
                    sx={{
                        minHeight: '30em',
                        cursor: 'pointer'
                    }}
                    image={firstImage}
                />
                <CardContent>
                    <Typography variant="h5" sx={{marginBottom: '1.5em'}}>
                        {product.ProductName}
                    </Typography>
                    <Typography sx={{marginBottom: '1em'}}>
                        {product.Description}
                    </Typography>
                    <Typography variant="body1" sx={{marginBottom: '1.5em'}}>
                    {'Category'}: {categoryName}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display:'flex',
                        justifyContent: 'space-between',
                        padding: '2em',
                        marginBottom: '1em'
                    }}
                >
                    <Typography variant="h5">
                        €{product.Price}
                    </Typography>

                    <Button 
                        onClick={handleAddToCart} 
                        className={styles.primaryCardButton}
                        size='large'>
                            {'Add to cart'} 
                    </Button>
                </CardActions>
            </Card>   
        </>

    )
}

export default ProductCard;