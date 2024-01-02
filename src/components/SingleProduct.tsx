import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/slices/rootSlice";
import { AppDispatch } from '../redux/store';
import { fetchProductById } from "../redux/slices/productSlice";
import { fetchCategoryById } from "../redux/slices/categorySlice";
import { Product } from "../types/Product";
import UpdateProduct from "./UpdateProduct";
import { ImageList, Typography, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deleteProduct } from "../redux/slices/productSlice";
import styles from '../styles/styles.module.css';
import debouncedHandleAddToCart from '../utils/cartHelpers';
import Header from "./Header";
import { Category } from "../types/Category";

const SingleProduct: React.FC = () => {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [openProductUpdateForm, setOpenProductUpdateForm] = useState(false)
    const [adminFunctions, setAdminFunctions] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)

    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();    
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await dispatch(fetchProductById(Number(id)));
                    const data = response.payload as Product
                    setProduct(data); 
                } catch (error) {
                    console.error("Error fetching product data:", error);
                }
            }
        };

        fetchProduct();
    }, [dispatch, id]);

    useEffect(() => {
        const fetchCategory = async () => {
          if (product && product.CategoryId) {
            try {
              const response = await dispatch(fetchCategoryById(product.CategoryId));
              const categoryData = response.payload as Category;
              setCategory(categoryData);
            } catch (error) {
              console.error("Error fetching category data:", error);
            }
          }
        };
    
        fetchCategory();
      }, [dispatch, product]);

    const { items } = useSelector((state: RootState) => state.cart);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleToggleProductUpdateForm = () => {
        openProductUpdateForm && setOpenProductUpdateForm(false)
        !openProductUpdateForm && setOpenProductUpdateForm(true)
    }

    const handleAddToCart = () => {
        if (product) {
            debouncedHandleAddToCart(product, items, dispatch);
        }
    };

    const handleDelete = async () => {
      try {
        const productId = product?.id?.toString();
        if (productId) {
          await dispatch(deleteProduct(productId));
          navigate('/products');
        } else {
          console.error('Product ID is undefined or null.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
    

    const handleShowDeleteButton = () => {
        setShowDeleteButton(true)
    }
    
    const handleHideDeleteButton = () => {
        setShowDeleteButton(false)
    }

    if (!product) {
        return <p>{'Product not found'}</p>;
      }

    return (
        <>
            <Typography sx={{ textAlign: 'center', margin: '50px'}} variant="h4">{product.ProductName}</Typography>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '50px'
                }}
            >
                <ImageList sx={{  minWidth: 250 }} cols={product.Image.length} rowHeight={164}>

                    {product.Image.map((item: string, index: number ) => (
                            <img 
                                key={index}
                                className={styles.productImages}
                                src={item}
                                alt=''
                                loading="lazy"
                            />
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
                    variant="h4">€{product.Price}
                </Typography>
                <Typography
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="h6">{'Category'}: {category?.categoryName}
                </Typography>
                <Typography
                    sx={{
                        marginBottom: '15px'
                    }}
                    variant="body1">{product.Description}
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
                        className={styles.secondaryButton}
                    >
                            {'Back'}
                    </Button>
                    { user?.role === 'admin' && <Button 
                        onClick={() => setAdminFunctions(true)} 
                        className={styles.secondaryButton}
                    >
                            {'Admin'}
                    </Button>}
                    <Button 
                        onClick={handleAddToCart}
                        className={styles.primaryButton}
                    >
                        {'Add to cart'}
                    </Button>
                </Box>
                { adminFunctions && user?.role === 'admin' ?
                        <Box className={styles.adminButtonsBox}>
                            <Header title="Admin functions"/>
                            <Box className={styles.adminButtons}>
                                <Button 
                                    onClick={handleToggleProductUpdateForm} 
                                    className={styles.updateButton}
                                >
                                        {
                                            openProductUpdateForm && 'Done'
                                        }
                                        {
                                            !openProductUpdateForm && 'Update'
                                        }
                                </Button>
                                {
                                    !showDeleteButton &&
                                    <Button
                                        onClick={handleShowDeleteButton} 
                                        className={styles.cardDeleteButton}
                                    >
                                            {'delete'}
                                    </Button>
                                }
                                { 
                                    showDeleteButton && 
                                    <>
                                        <Button
                                            onClick={handleHideDeleteButton}
                                            className={styles.hideDeleteButton}
                                        >
                                            {"don't delete"}
                                        </Button>
                                        <Button 
                                            onClick={handleDelete} 
                                            className={styles.cardDeleteButton}
                                        >
                                            {'yes, delete'}
                                        </Button>                                
                                    </>
                                }                            
                                <Button 
                                    onClick={() => setAdminFunctions(false)} 
                                    className={styles.doneButton}
                                >
                                        {'Done'}
                                </Button>                                
                            </Box>
                        </ Box> : 
                        <></> 
                    }
            </Container>
            { 
                openProductUpdateForm ?  <UpdateProduct product={product} /> : <></>            
            }  
        </>
    );
};

export default SingleProduct;