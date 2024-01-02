import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Product, AddProductData, ProductData, ProductState } from '../../types/Product'

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
      const res = await fetch('https://fakestoreinc.azurewebsites.net/api/v1/products')
      const data = await res.json()
      return data as Product[]
  } catch (err) {
      throw err;
  }
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId: Number) => {
  
  try {
    const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/products/${productId}`)
    const data = await res.json()
    return data as Product[]
  } catch (err) {
      throw err;
  }
});

export const fetchProductsByPriceRange = createAsyncThunk(
  'products/fetchProductsByPriceRange',
  async ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
    try {
      const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/products/?price_min=${minPrice}&price_max=${maxPrice}`);
      const data = await res.json();
      return data as Product[];
    } catch (err) {
      throw err;
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: number) => {
    try {
      const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/products/?categoryId=${categoryId}`);
      const data = await res.json();
      return data as Product[];
    } catch (err) {
      throw err;
    }
  }
)

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: AddProductData) => {
  try { 
    const res = await fetch('https://fakestoreinc.azurewebsites.net/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newProduct), 
    })
    const data = await res.json();
    console.log(data)
    return data as Product;
  } catch (err) {
        throw err;
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct: ProductData) => {
  try { 
    const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(updatedProduct), 
    })
    const data = await res.json();
    console.log(data)
    return data as Product;
  } catch (err) {
        throw err;
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string) => {
  try {
    const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data === true) {
        console.log(`Product with id of ${productId} successfully deleted.`);
        return productId; // Return the productId on success
      } else {
        console.error('Delete Product API Error:', data);
        throw new Error(`Failed to delete product with id of ${productId}`);
      }
    } else {
      console.error('Delete Product API Error:', res.statusText);
      throw new Error(`Failed to delete product with id of ${productId}`);
    }
    
  } catch (err) {
    console.error('Delete Product Error:', err);
    throw err;
  }
});



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message || 'An error occurred.';
          })
          .addCase(fetchProductsByPriceRange.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductsByPriceRange.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
          })
          .addCase(fetchProductsByPriceRange.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message || 'An error occurred while fetching products by price range.';
          })      
          .addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
          })
          .addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred while fetching products by category.';
          })    
          .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message || 'An error occurred.';
        })
        .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = [...state.products, action.payload]
            state.error = null;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred while creating the product.';
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProductIndex = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            if (updatedProductIndex !== -1) {
                state.products[updatedProductIndex] = action.payload;
            }
            state.error = null;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred while updating the product.';
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id?.toString() !== action.payload);
            state.error = null;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred while deleting the product.';
        });
      },
      
})

export default productSlice.reducer