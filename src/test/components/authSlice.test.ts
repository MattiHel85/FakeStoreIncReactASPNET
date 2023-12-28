// import authSlice, {
//     loginUser,
//     logout,
//     loginFailure,
//     initialState
//   } from '../../redux/slices/authSlice';
// import { LoginPayload } from '../../types/Auth';
  
//   describe('authSlice reducers', () => {
//     it('should handle loginUser.pending', () => {
//       const state = authSlice(initialState, loginUser.pending);
//       expect(state.loading).toBe(true);
//     });
  
//     it('should handle loginUser.fulfilled', () => {
//       const mockUser = {
//         access_token: 'mockAccessToken',
//         refresh_token: 'mockRefreshToken',
//         user: { id: 1, email: 'mock@example.com' },
//       };
//     const action = loginUser.fulfilled(mockUser, '', { email: 'mock@example.com', password: 'mockPassword' }, '');
//     const state = authSlice(initialState, action);

//     expect(state.isAuthenticated).toBe(true);
//     expect(state.accessToken).toBe('mockAccessToken');
//     expect(state.refreshToken).toBe('mockRefreshToken');
//     expect(state.user).toEqual(mockUser);
//     expect(state.loading).toBe(false);
//     });
  
//     it('should handle loginUser.rejected', async () => {
//         const error = new Error('An error occurred.')
//         const loginPayload: LoginPayload = { email: 'mock@example.com', password: 'mockPassword' }  

//         const action = loginUser.rejected(error, '', loginPayload, undefined);
        
//         const state = authSlice(initialState, action);  
        
//         expect(state.isAuthenticated).toBe(false);
//         expect(state.accessToken).toBe(null)
//         expect(state.refreshToken).toBe(null)
//         expect(state.user).toBe(null)
//         expect(state.error).toBe(error.message);
//     });
  
//     it('should handle logout', () => {
//       const state = authSlice(initialState, logout());
//       expect(state.isAuthenticated).toBe(false);
//       expect(state.accessToken).toBeNull();
//       expect(state.refreshToken).toBeNull();
//       expect(state.user).toBeNull();
//       expect(state.loading).toBe(false);
//       expect(state.error).toBeNull();
//     });
  
//     it('should handle loginFailure', () => {
//       const error = 'Login failed';
//       const state = authSlice(initialState, loginFailure(error));
//       expect(state.loading).toBe(false);
//       expect(state.error).toBe(error);
//     });
//   });  
export {}