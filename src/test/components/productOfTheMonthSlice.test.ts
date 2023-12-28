

// import productOfTheMonthSlice, {
//     fetchProductOfTheMonthById,
//     removeProductOfTheMonth,
//     initialState
// } from "../../redux/slices/productOfTheMonthSlice";

// describe('productOfTheMonth reducer', () => {

//     it('should handle fetchProductOfTheMonthById.pending', () => {
//         const state = productOfTheMonthSlice(initialState, fetchProductOfTheMonthById.pending)
//         expect(state.loading).toBe(true);
//         expect(state.productOfTheMonth).toBeNull();
//         expect(state.error).toBeNull()
//     })

//     it('it should handle fetchProductById.fulfilled', () => {

//         const mockProduct = {
//                 id: 1,
//                 title: 'Product 1',
//                 price: 10,
//                 description: 'Description for Product 1',
//                 images: ['image1.jpg', 'image2.jpg'],
//                 creationAt: '2023-09-20T10:00:00Z',
//                 updatedAt: '2023-09-20T10:00:00Z',
//                 category: {
//                   id: 1,
//                   name: 'Category 1',
//                   image: 'category1.jpg',
//                   creationAt: '2023-09-20T10:00:00Z',
//                   updatedAt: '2023-09-20T10:00:00Z',
//                 },
//             };
        
//         const action = fetchProductOfTheMonthById.fulfilled(mockProduct, '', 1);

//         const state = productOfTheMonthSlice(initialState, action)

//         expect(state.loading).toBe(false);
//         expect(state.productOfTheMonth).toEqual(mockProduct)
//         expect(state.error).toBeNull()
//     })

//     it('should handle fetchProductOfTheMonthById.rejected', () => {

//         const error = new Error('Rejected')
//         const mockProductId = 13
        
//         const state = productOfTheMonthSlice(initialState, fetchProductOfTheMonthById.rejected(error, '', mockProductId, undefined))

//         expect(state.loading).toBe(false);
//         expect(state.productOfTheMonth).toBeNull();
//         expect(state.error).toBe('Rejected')
//     })

//     it('should handle removeProductOfTheMonth action', () => {
//         const mockProduct =         
//             {
//                 id: 1,
//                 title: 'Product 1',
//                 price: 10,
//                 description: 'Description for Product 1',
//                 images: ['image1.jpg', 'image2.jpg'],
//                 creationAt: '2023-09-20T10:00:00Z',
//                 updatedAt: '2023-09-20T10:00:00Z',
//                 category: {
//                   id: 1,
//                   name: 'Category 1',
//                   image: 'category1.jpg',
//                   creationAt: '2023-09-20T10:00:00Z',
//                   updatedAt: '2023-09-20T10:00:00Z',
//                 },
//             }

//         const state = {
//             productOfTheMonth: mockProduct,
//             loading: false,
//             error: null
//         }

//         const nextState = productOfTheMonthSlice(state, removeProductOfTheMonth());

//         expect(nextState.productOfTheMonth).toBeNull();
//     })
// })

export {}