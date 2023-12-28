// import cartSlice, {
//     addToCart,
//     removeFromCart,
//     clearCart,
//     decreaseQuantity,
//     increaseQuantity,
//   } from "../../redux/slices/cartSlice";
  
//   describe('cart reducer', () => {
//     it('should handle addToCart', () => {
//       const initialState = {
//         items: [],
//         loading: false,
//         error: null,
//       };
  
//       const mockCartItem = {
//         id: 1,
//         name: 'Product 1',
//         price: 10,
//         quantity: 1,
//       };
  
//       const action = addToCart(mockCartItem);
//       const state = cartSlice(initialState, action);
  
//       expect(state.items).toEqual([mockCartItem]);
//     });
  
//     it('should handle removeFromCart', () => {
//       const initialState = {
//         items: [
//           {
//             id: 1,
//             name: 'Product 1',
//             price: 10,
//             quantity: 1,
//           },
//         ],
//         loading: false,
//         error: null,
//       };
  
//       const action = removeFromCart(1);
//       const state = cartSlice(initialState, action);
  
//       expect(state.items).toEqual([]);
//     });
  
//     it('should handle clearCart', () => {
//       const initialState = {
//         items: [
//           {
//             id: 1,
//             name: 'Product 1',
//             price: 10,
//             quantity: 1,
//           },
//         ],
//         loading: false,
//         error: null,
//       };
  
//       const action = clearCart();
//       const state = cartSlice(initialState, action);
  
//       expect(state.items).toEqual([]);
//     });
  
//     it('should handle decreaseQuantity', () => {
//       const initialState = {
//         items: [
//           {
//             id: 1,
//             name: 'Product 1',
//             price: 10,
//             quantity: 2,
//           },
//         ],
//         loading: false,
//         error: null,
//       };
  
//       const action = decreaseQuantity(1);
//       const state = cartSlice(initialState, action);
  
//       expect(state.items[0].quantity).toEqual(1);
//     });
  
//     it('should handle increaseQuantity', () => {
//       const initialState = {
//         items: [
//           {
//             id: 1,
//             name: 'Product 1',
//             price: 10,
//             quantity: 1,
//           },
//         ],
//         loading: false,
//         error: null,
//       };
  
//       const action = increaseQuantity(1);
//       const state = cartSlice(initialState, action);
  
//       expect(state.items[0].quantity).toEqual(2);
//     });
//   });

export {}