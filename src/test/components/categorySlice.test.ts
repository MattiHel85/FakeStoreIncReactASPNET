// import 
//     categorySlice, 
//     { 
//         fetchCategories, 
//         initialState
//     } 
// from "../../redux/slices/categorySlice";

// describe('categoryApi', () => {

//     it('should handle fetchCategories.pending', () => {
        
//         const state = categorySlice(initialState, fetchCategories.pending)

//         expect(state.categories).toEqual([])
//         expect(state.loading).toBe(true)
//         expect(state.error).toBeNull()
//     })

//     it('should handle fetchCategories.fulfilled', () => {

//         const mockCategories = [{id: 1, name: 'Mock Category', image: 'image.jpg'}]

//         const action = fetchCategories.fulfilled(mockCategories, '', undefined, '')
//         const state = categorySlice(initialState, action)

//         expect(state.categories).toEqual(mockCategories)
//         expect(state.loading).toBe(false)
//         expect(state.error).toBeNull()
//     })

//     it('should handle fetchCategories.rejected', () => {

//         const error = new Error('Rejected')

//         const action = fetchCategories.rejected(error, '')
//         const state = categorySlice(initialState, action)

//         expect(state.categories).toEqual([])
//         expect(state.loading).toBe(false)
//         expect(state.error).toBe('Rejected')
//     })
// });

export {}