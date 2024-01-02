import React from 'react';

import { Typography } from "@mui/material"
import styles from '../styles/styles.module.css'
import { HeaderProps } from '../types/types';

const Header: React.FC<HeaderProps> = ({ title, body }) => {
  return (
    <>
      <Typography variant='h4' className={styles.headerText}>
        {title.toUpperCase()}
      </Typography>
      <Typography variant='h5' className={styles.headerBody}>
        {body}
      </Typography>
    </>
  )
}

export default Header