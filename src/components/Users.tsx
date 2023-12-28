import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/slices/userSlice';
import { User } from '../types/User';
import { AppDispatch } from '../redux/store';

import UserCard from './UserCard';
import { Container, TextField, MenuItem, Box, Pagination } from '@mui/material';
import { RootState } from '../redux/slices/rootSlice';
import styles from '../styles/styles.module.css';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const Users: React.FC = () => {
  const {language} = useLanguage();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [usersPerPage, setUsersPerPage] = useState<number>(5); // Number of users to display per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleUsersPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUsersPerPage(event.target.value as number);
    setCurrentPage(1); 
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user: User) =>
    user.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box className={styles.searchContainer}>
        <TextField
          label={getTranslation(language, 'Search by email')}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.textField}
        />
        <TextField
          select
          label={getTranslation(language, 'Users per page')}
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
          className={styles.textField}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </TextField>
      </Box>
      <Container className={styles.usersContainer}>

        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {currentUsers.map((user: User) => (
          <UserCard key={Number(user.id)} user={user} />
        ))}
        
      </Container>

      {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className={styles.pagination}
          />
        )}
    </>
  );
};

export default Users;
