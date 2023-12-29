import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { User, UserState } from '../../types/User'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const res = await fetch('https://fakestoreinc.azurewebsites.net/api/v1/users/')
        const data = await res.json()
        return data as User[]
    } catch (err) {
        throw err;
    }
})

export const registerUser = createAsyncThunk('users/registerUser', async (userData: User) => {
  try {
    const res = await fetch('https://fakestoreinc.azurewebsites.net/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('User created successfully')
      return data as User;
    } else {
      throw new Error('User registration failed');
    }
  } catch (error) {
    throw error;
  }
});


export const updateUser = createAsyncThunk('users/updateUser', async (userData: User) => {
  try {
    const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/users/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`User ${data.name} updated successfully`);
      return data as User;
    } else {
      throw new Error('User update failed');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
});

export const initialState: UserState = {
    users: [],
    loading: true,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message || 'An error occurred.';
          })
          .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.error = null;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'User registration failed.';
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUserIndex = state.users.findIndex((user) => user.id === action.payload.id);
            if (updatedUserIndex !== -1) {
                state.users[updatedUserIndex] = action.payload;
            }
            state.loading = false;
            state.error = null;
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'User update failed.';
          });
      },
      
})

export default userSlice.reducer