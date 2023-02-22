import React from 'react';
import {
    Navigate,
    Routes,
    Route
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

const App = () => {

    const mode = useSelector((state) => state.mode);

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/home"
                        element={isAuth ? <Home /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/profile/:userId"
                        element={isAuth ? <Profile /> : <Navigate to="/" />}
                    />
                </Routes>
            </ThemeProvider>
        </div>
    )
};

export default App;