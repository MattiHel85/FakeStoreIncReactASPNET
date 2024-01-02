import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { User } from "../types/User";
import { RootState } from "../redux/slices/rootSlice";
import UpdateUser from "./UpdateUser";
import { Button, Container, Box } from "@mui/material";
import UserCard from "./UserCard";
import styles from '../styles/styles.module.css'

const SingleUser: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [openUserUpdateForm, setOpenUserUpdateForm] = useState(false)


    const signedInUser = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // https://fakestoreinc.azurewebsites.net/api/v1/users/08c1cbd7-3956-4be9-8855-15fd638fe5ec
                console.log(id);
                const res = await fetch(`https://fakestoreinc.azurewebsites.net/api/v1/users/${id}`);
                if (!res.ok) {
                    console.error(`Danger, Will Robinson, there is an error! ${res.status}`);
                    console.log("Response details:", await res.text());
                    return;
                }
                const data = await res.json();
                console.log(data);
                setUser(data); 
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        
        fetchData(); 
    
    }, [id]);


    const toggleUpdateUserForm = () => {
        openUserUpdateForm && setOpenUserUpdateForm(false)
        !openUserUpdateForm && setOpenUserUpdateForm(true)
    }

    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <>
            <Container className={styles.userContainer}>
                <UserCard user={user} />
                <Box className={styles.buttonBox}>
                    <Button className={styles.primaryButton} onClick={handleGoBack}>{'Back'}</Button>
                    { 
                        signedInUser?.role === 'admin' || user?.id === signedInUser?.id ?
                            <Button className={styles.updateButton} onClick={toggleUpdateUserForm}>
                                {/* {openUserUpdateForm ? 'Done' : 'Update User'} */}
                                {openUserUpdateForm && 'Done'}
                                {!openUserUpdateForm && 'Update user'}
                            </Button> : 
                            <></> 
                    }
                </Box>
            </Container>
            { 
                openUserUpdateForm ?  <UpdateUser user={user} setUser={setUser}/> : <></>            
            }  
        </>
    );
};

export default SingleUser;