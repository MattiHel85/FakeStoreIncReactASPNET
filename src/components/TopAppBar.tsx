import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person'
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

import { AppDispatch } from '../redux/store';
import { RootState } from "../redux/slices/rootSlice";
import { logout } from '../redux/slices/authSlice';
import Cart from './Cart';
import SignIn from './SignIn';

import LanguageSwitcher from './LanguageSwitcher';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function TopAppBar() {
  const { language } = useLanguage()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null); // Add state for cart menu
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null); // Add state for cart menu

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => { 
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCartMenu = () => { 
    setAnchorElCart(null);
  };
  
  const { items } = useSelector((state: RootState) => state.cart)

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    handleCloseUserMenu(); 

    //reroute after slight delay
    setTimeout(() => {
      navigate('/');
    }, 1000)
  };

  return (

    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center', 
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.1rem',
              fontSize: {xs: '1em', md: '2.25em'},
              color: 'black',
              textDecoration: 'none',
              flexGrow: 1, // Expand to fill available space
            }}
          >
            FakeStore Inc
          </Typography>

          {/* Language switch*/}
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <LanguageSwitcher />
          </Box>  
          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            { isAuthenticated ? (
              <Tooltip title={getTranslation(language, 'user')}>
                <>
                    <IconButton onClick={handleOpenNavMenu} sx={{ p: 0, color: 'black', mr: '0.05em' }}>
                        <PersonIcon sx={{ fontSize: {xs: '1em', md: '1.5em'}}} />
                        <Typography sx={{mr: '.25em',fontSize: {xs: '.5em', md: '.75em'}}} >{getTranslation(language, 'Hello')}, {user?.FirstName }</Typography>
                    </IconButton>
                    <Menu
                      sx={{ mt: '45px'}}
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                    >
                      <Box
                        sx={{
                          padding: '16px'
                        }}
                      >
                        {
                          user?.Role === 'admin' && 
                          <Link to={'/admin'} style={{textDecoration: 'none', color: 'black'}}>
                            <Typography sx={{mr: '.25em',fontSize: {xs: '1rem', md: '1.5rem'}}} >{getTranslation(language, 'Admin')} </Typography>
                          </Link>
                        }

                        <Link to={`/users/${user?.id}`} style={{textDecoration: 'none', color: 'black'}}>
                          <Typography sx={{mr: '.25em',fontSize: {xs: '1rem', md: '1.5rem'}}} >{getTranslation(language, 'My Profile')}</Typography>
                        </Link>

                        <IconButton sx={{ p: 0, color: 'black', mr: '0.05em' }} onClick={handleLogout}>
                          <Typography sx={{mr: '.25em',fontSize: {xs: '1rem', md: '1.5rem'}}} >{getTranslation(language, 'Sign out')}</Typography>
                        </IconButton>
                      </Box>
                    </Menu>
                </>              
            </Tooltip>
            ) : 
            <>
            <Tooltip title="sign in">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black', mr: '0.05em' }}>
                <Typography sx={{mr: '.25em',fontSize: {xs: '1rem', md: '1.5rem'}}} >
                {getTranslation(language, 'sign in')} 
                </Typography>
                <LoginIcon 
                  sx={{
                    color: 'black',
                    mr: '.5em'
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  padding: '16px'
                }}
              >
                <SignIn />
              </Box>
            </Menu>
            </>
          }
            
            
          </Box>

          {/* Cart Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open cart">
              <IconButton onClick={handleOpenCartMenu} sx={{ p: 0 }}>
                <StyledBadge badgeContent={items.reduce((total: any, item: any) => total + item.quantity, 0)} color="secondary">
                  <ShoppingCartIcon 
                  sx={{
                    color: 'black'
                  }}
                  />
                </StyledBadge>
              </IconButton>
            </Tooltip>
             
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElCart}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
              <Cart />
              { items.length > 0 && <Link style={{ textDecoration: 'none', color: 'rgb(0, 209, 255', fontWeight: 700, display: 'flex', justifyContent: 'flex-end', padding: '0.75em'}} to={'/checkout'}>
                <Typography variant='body1'>{getTranslation(language, 'Go to checkout')}</Typography>
              </Link>}
            </Menu>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopAppBar;
