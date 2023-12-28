import React from "react";
import { useNavigate } from "react-router-dom";

import { UserCardProps } from "../types/User";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from '../styles/styles.module.css'

const UserCard: React.FC<UserCardProps> = ({ user}) => {
    const navigate = useNavigate()

    const navigateToUser = () => {
        navigate(`/users/${user?.id}`)
    }

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