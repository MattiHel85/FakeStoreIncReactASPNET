import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Box, ButtonGroup, Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import styles from '../styles/styles.module.css';

import { RootState } from '../redux/slices/rootSlice';
import Users from './Users';
import UserCard from './UserCard';
import UpdateUser from './UpdateUser';
import AddProduct from './AddProduct';
import ProductSearch from './Products';

const AdminPanel: React.FC = () => {
  const [chooseProducts, setChooseProducts] = useState(false)
  const [chooseAddProduct, setChooseAddProduct] = useState(false)
  const [chooseUpdateProduct, setChooseUpdateProduct] = useState(false)

  const [chooseCurrentUser, setChooseCurrentUser] = useState(false)
  const [viewCurrentUser, setViewCurrentUser] = useState(false)
  const [updateCurrentUser, setUpdateCurrentUser] = useState(false)

  const [chooseUsers, setChooseUsers] = useState(false)
  const [viewUsers, setViewUsers] = useState(false)

  const user = useSelector((state: RootState) => state.auth.user);

  const closeUsers = () => {
    setViewUsers(false)
    setChooseUsers(false)
    setViewCurrentUser(false)
    setChooseCurrentUser(false)
  }

  const closeProducts = () => {
    setChooseProducts(false)
    setChooseAddProduct(false)
    setChooseUpdateProduct(false)
  }
  

  const openMyInfo = () => {
    closeAll()
    setChooseCurrentUser(true)
  }

  const openUsers = () => {
    closeAll()
    setChooseUsers(true)
  }

  const openProducts = () => {
    closeAll()
    setChooseProducts(true)
  }

  const closeAll = () => {
    closeProducts()
    closeUsers()
  }

  return (
    <>
      <Typography variant='h3' className={styles.adminHeader}>
        Admin Panel for {user?.name}
      </Typography>
      <Container
        className={styles.adminContainer}
      >
        <Box>
          <PersonIcon onClick={openMyInfo} className={styles.icon} />
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>My Info</Typography>
        </Box>
        <Box>
          <GroupIcon onClick={openUsers} className={styles.icon} />
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>Users</Typography>
        </Box>
        <Box>
          <Inventory2Icon onClick={openProducts} className={styles.icon} />
          <Typography variant='subtitle1' sx={{ textAlign: 'center', fontWeight: '700'}}>Products</Typography>
        </Box>
      </Container>
      
      { chooseProducts && (
          <Container className={styles.adminInnerContainer} >
            <Typography variant='h5' className={styles.containerHeader}>What do you want to do?</Typography>
          
            <ButtonGroup className={styles.buttonGroup}>
              <Button onClick={() => setChooseAddProduct(true)} className={styles.primaryButton}>Add Product</Button>
              <Button onClick={() => setChooseUpdateProduct(true)} className={styles.secondaryButton}>Edit Product</Button>
              <Button onClick={() => setChooseProducts(false)} className={styles.tertiaryButton}>Done</Button>
            </ButtonGroup>
            
            { chooseAddProduct && ([<AddProduct />, <Button onClick={() => setChooseAddProduct(false)} sx={{margin: '1em'}}>Done</Button>]) }
            { chooseUpdateProduct && ([<ProductSearch />, <Button onClick={() => setChooseUpdateProduct(false)} sx={{margin: '1em'}}>Done</Button>]) }
          </Container>
        ) 
      }

      { chooseUsers && (
          <Container className={styles.adminInnerContainer} >
            <Typography variant='h5' className={styles.containerHeader}>What do you want to do?</Typography>
          
            <ButtonGroup className={styles.buttonGroup}>
              <Button onClick={() => setViewUsers(true)} className={styles.primaryButton}>View Users</Button>
              <Button onClick={() => setChooseUsers(false)} className={styles.tertiaryButton}>Done</Button>
            </ButtonGroup>
            
            { viewUsers && ([<Button onClick={() => setViewUsers(false)} className={styles.tertiaryButton}>Close Users</Button>, <Users />]) }
          </Container>
        ) 
      }

      { chooseCurrentUser && (
          <Container className={styles.adminInnerContainer}>
            <Typography variant='h5' className={styles.containerHeader}>What do you want to do?</Typography>
          
            <ButtonGroup className={styles.buttonGroup}>
              <Button onClick={() => setViewCurrentUser(true)} className={styles.primaryButton}>View profile</Button>
              <Button onClick={() => setUpdateCurrentUser(true)} className={styles.secondaryButton}>Update</Button>
              <Button onClick={() => setChooseCurrentUser(false)} className={styles.tertiaryButton}>Done</Button>
            </ButtonGroup>
            
            { viewCurrentUser && 
              <>
                <Button onClick={() => setViewCurrentUser(false)} className={styles.closeButton}>Close Info</Button>, 
                <UserCard user={user}/>
              </>
            }

            { updateCurrentUser && 
              <>
                <Button onClick={() => setUpdateCurrentUser(false)} className={styles.closeButton}>Close form</Button>,
                <UpdateUser user={user} />
              </>
            }

          </Container>
        ) 
      }
    </>
  );
};

export default AdminPanel;