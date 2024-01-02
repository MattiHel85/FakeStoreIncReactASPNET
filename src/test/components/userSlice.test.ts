import userSlice, { fetchUsers, registerUser, updateUser, initialState } from "../../redux/slices/userSlice"
import { User } from "../../types/User"

describe('userSlice', () => {
  it('should handle fetchUsers.pending', () => {
    const state = userSlice(initialState, fetchUsers.pending)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  });

  it('should handle fetchUsers.fulfilled', () => {
    const mockUsers: User[] = [{ id: 1, firstName: 'User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }]
    const action = fetchUsers.fulfilled(mockUsers, '', undefined, '')
    const state = userSlice(initialState, action)

    expect(state.users).toEqual(mockUsers)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  });

  it('should handle fetchUsers.rejected', () => {
    const error = new Error('Rejected')
    const action = fetchUsers.rejected(error, '', undefined, '')
    const state = userSlice(initialState, action)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Rejected')
  });

  it('should handle registerUser.pending', () => {
    const state = userSlice(initialState, registerUser.pending)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  });

  it('should handle registerUser.fulfilled', () => {
    const mockUser: User = { id: 1, firstName: 'User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }
    const action = registerUser.fulfilled(mockUser, '', mockUser)

    const state = userSlice(initialState, action)
    expect(state.users).toEqual([mockUser])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  });

  it('should handle registerUser.rejected', () => {
    const mockUser: User = { id: 1, firstName: 'User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }
    const error = new Error('Registration Failed')
    const action = registerUser.rejected(error, '', mockUser)
    const state = userSlice(initialState, action)
    expect(state.users).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Registration Failed')
  });

  it('should handle updateUser.pending', () => {
    const state = userSlice(initialState, updateUser.pending)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  });

  it('should handle updateUser.fulfilled', () => {
    const mockUser: User = { id: 1, firstName: 'User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }
    const updatedUserData: User = {id: 1, firstName: 'Upated User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }

    const action = updateUser.fulfilled(updatedUserData, '', mockUser)

    const state = userSlice({ ...initialState, users: [mockUser] }, action)
    expect(state.users).toEqual([updatedUserData])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  });

  it('should handle updateUser.rejected', () => {
    const mockUser: User = { id: 1, firstName: 'User 1', lastName: "Simp", email: 'user1@example.com', phoneNumber: '1', password: 'password123', role: 'admin', addresses: [] }
    const error = new Error('Update Failed')

    const action = updateUser.rejected(error, '', mockUser)
    const state = userSlice({ ...initialState, users: [mockUser] }, action)

    expect(state.users).toEqual([mockUser])
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Update Failed')
  });

});
