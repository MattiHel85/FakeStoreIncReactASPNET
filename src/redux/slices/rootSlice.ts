import { combineReducers } from 'redux'

import productSlice from './productSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import cartSlice from './cartSlice'
import authSlice from './authSlice'

export const rootReducer = combineReducers({
    products: productSlice,
    users: userSlice,
    categories: categorySlice,
    cart: cartSlice,
    auth: authSlice
})

export type RootState = ReturnType<typeof rootReducer>