import React, { useEffect, useState } from 'react';
import Navbar from 'Pages/Navbar';
import FriendListWidget from "../Widgets/FriendListWidget";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import UserWidget from "../Widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {

    const [user, setUser] = useState(null);

    const { userId } = useParams();

    const token = useSelector((state) => state.token);

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {

        const response = await fetch(`http://localhost:4000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
};

export default Profile;