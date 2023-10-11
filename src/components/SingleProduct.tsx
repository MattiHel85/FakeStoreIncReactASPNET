import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/slices/rootSlice";
import { AppDispatch } from '../redux/store';
import { fetchProductById } from "../redux/slices/productSlice";
import { SingleProductProps } from "../types/Product";
import UpdateProduct from "./UpdateProduct";
import { ImageList, ImageListItem, Typography, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deleteProduct } from "../redux/slices/productSlice";
import styles from '../styles/styles.module.css';
import debouncedHandleAddToCart from '../utils/cartHelpers';

const SingleProduct: React.FC<SingleProductProps> = ({ setProductOfTheMonthId }) => {

    const [openProductUpdateForm, setOpenProductUpdateForm] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)

    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();    
    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    const { items } = useSelector((state: RootState) => state.cart);

    
    const product = products.find((product: any) => product.id === Number(id));

    const user = useSelector((state: RootState) => state.auth.user);

    const handleToggleProductUpdateForm = () => {
        openProductUpdateForm && setOpenProductUpdateForm(false)
        !openProductUpdateForm && setOpenProductUpdateForm(true)
    }

    
    if (loading) {
        return <p>Loading...</p>;
    }

    
    if (error) {
        return <p>Error: {error}</p>;
    }

    
    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        if (product) {
            debouncedHandleAddToCart(product, items, dispatch);
        }
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        navigate('/products')
    }

    const handleSetProductOfTheMonthId = (productId: number) => {
        setProductOfTheMonthId?.(productId)
        navigate(`/`)
    }

    const handleShowDeleteButton = () => {
        setShowDeleteButton(true)
    }
    
    const handleHideDeleteButton = () => {
        setShowDeleteButton(false)
    }

    return (
        <>
            <Typography sx={{ textAlign: 'center', margin: '50px'}} variant="h4">{product.title}</Typography>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '50px'
                }}
            >
                <ImageList sx={{ width: 2500, height: 400 }} cols={product.images.length} rowHeight={164}>

                    {product.images.map((item: string) => (
                      <ImageListItem key={item}>
                        <img
                          srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          src={`${item}?w=164&h=164&fit=crop&auto=format`}
                          alt=''
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}

                </ImageList>
                    
            </Container>

            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center', 
                    flexDirection: 'column'

                }}
            >
                <Typography
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="h4">€{product.price}
                </Typography>
                <Typography
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="h6">Category: {product.category.name}
                </Typography>
                <Typography
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="body1">{product.description}
                </Typography>

                <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'space-around',
                        padding: '1em'
                    }}
                >

                    <Button 
                        onClick={() => navigate(-1)} 
                        className={styles.cardButton}
                    >
                            Back
                    </Button>
                    { user?.role === 'admin' ?
                        <>
                            <Button 
                                onClick={handleToggleProductUpdateForm} 
                                className={styles.cardUpdateButton}
                            >
                                    {
                                        openProductUpdateForm ? 'Complete' : 'Update Item'
                                    }
                            </Button>
                            {
                                !showDeleteButton &&
                                <Button
                                    onClick={handleShowDeleteButton} 
                                    className={styles.cardDeleteButton}
                                >
                                        Delete 
                                </Button>
                            }
                            { 
                                showDeleteButton && 
                                <>
                                    <Button
                                        onClick={handleHideDeleteButton}
                                        className={styles.cardUpdateButton}
                                    >
                                        Don't delete
                                    </Button>
                                    <Button 
                                        onClick={handleDelete} 
                                        className={styles.cardDeleteButton}
                                    >
                                        Yes, delete
                                    </Button>                                
                                </>
                            }
                            <Button 
                                onClick={() => handleSetProductOfTheMonthId(Number(product?.id))} 
                                className={styles.cardDeleteButton}
                                sx={{
                                    backgroundColor: 'orange !important'
                                }}
                            >
                                    P.O.M.
                            </Button>
                        </> : <></> }
                    <Button 
                        onClick={handleAddToCart}
                        className={styles.cardButton}
                    >
                        Add to cart
                    </Button>
                </Box>
                                
            </Container>
            { 
                openProductUpdateForm ?  <UpdateProduct product={product} /> : <></>            
            }  
        </>
    );
};

export default SingleProduct;