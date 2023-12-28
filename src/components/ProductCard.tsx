import React from "react";
import { useNavigate } from "react-router-dom";
import { Guid } from "guid-typescript";
import { ProductCardProps } from "../types/Product";

import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import styles from '../styles/styles.module.css'

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const ProductCard: React.FC<ProductCardProps> = ({ product, items, dispatch, onAddToCart}) => {
    const { language } = useLanguage()
    const navigate = useNavigate();
    const id = product?.id;
    const firstImage = product?.image?.[0];

    const navigateToProduct = () => {
        navigate(`/products/${id}`)
    }

    const handleAddToCart = () => {
        onAddToCart && onAddToCart(product, items, dispatch);
    }

    return(
        <>
            <Card 
                className={styles.productCard} 
                // key={product.id}
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
                        {product.productName}
                    </Typography>
                    <Typography sx={{marginBottom: '1em'}}>
                        {product.description}
                    </Typography>
                    <Typography variant="body1" sx={{marginBottom: '1.5em'}}>
                    {/* {getTranslation(language, 'Category')}: {product.categoryId} */}
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
                        €{product.price}
                    </Typography>

                    <Button 
                        onClick={handleAddToCart} 
                        className={styles.primaryCardButton}
                        size='large'>
                            {getTranslation(language, 'Add to cart')} 
                    </Button>
                </CardActions>
            </Card>   
        </>

    )
}

export default ProductCard;