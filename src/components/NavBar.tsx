import * as React from 'react';
import { Link } from 'react-router-dom';
import {Box, Typography} from '@mui/material';


const NavBar: React.FC = () => {
    
    const navItems = [
      { id: 1,  label: 'All products', path: '/products' },
      { id: 2,  label: 'Checkout', path: '/checkout' },
      { id: 3,  label: 'Contact us', path: '/contact' },
    ];
    return (
      <Box
        sx={{
          backgroundColor: 'rgb(0, 0, 0)',
          height: '40px'
        }}
      >
        <Box 
          sx={{
            width: '80%', 
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {navItems.map((navItem) => 
          <Link key={navItem.id} to={navItem.path} style={{textDecoration:'none'}}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                color: 'white',
                fontWeight: 600,
                mx: {xs: '1em', md:'5em'},
                padding: {xs: '1.75em', md: '0.5em'},
                fontSize: {xs: '9px', md: '1em'}
              }}
            >
              {navItem.label} 
            </Typography>
          </Link>
          )}
        </Box>
      </ Box>
    );
}

export default NavBar;