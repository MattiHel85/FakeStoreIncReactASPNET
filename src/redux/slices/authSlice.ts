import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, UserProfile } from "../../types/Auth";

interface LoginResponse {
    accessToken: string;
    user: UserProfile;
}

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ email, password }: LoginPayload) => {
    const auth_url = 'https://fakestoreinc.azurewebsites.net/api/v1/auth';
    const userData = { email, password}
    try {
      const res = await fetch(auth_url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const loginData: LoginResponse = await res.json();
      console.log(loginData);
      const { accessToken, user } = loginData;

      return {
        accessToken: accessToken,
        user: user
      }
    } catch (error) {
       return error
    }
})

export const logout = createAction('auth/logout')
export const loginFailure = createAction<string>('auth/loginFailure')

export const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const payload = action.payload as LoginResponse;
                state.isAuthenticated = true;
                state.accessToken = payload.accessToken;
                state.user = payload.user;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload as string || 'An error occurred.';    
            })
            .addCase(logout, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginFailure, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default authSlice.reducer;
