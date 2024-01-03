import React from "react";

import { UserCardProps } from "../types/User";
import { Card, CardContent, Typography } from '@mui/material';
import styles from '../styles/styles.module.css'

const UserCard: React.FC<UserCardProps> = ({ user}) => {

    return(
        <>
            <Card key={Number(user?.id)} className={styles.card}>
                <CardContent>
                    <Typography variant="h5">
                        {user?.FirstName} {user?.LastName}
                    </Typography>
                    <Typography>
                        {user?.Role}
                    </Typography>
                    <Typography>
                        {user?.Email}
                    </Typography>
                </CardContent>
            </Card>   
        </>

    )
}

export default UserCard