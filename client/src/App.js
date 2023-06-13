import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import UserContext from './context';
import CustomThemeProvider from './themes/cutomThemeProvider'
import { useAuth } from './utils';
import { Signup, Login, Rooms, ChattingRoom, Admin } from './pages';
import { PublicRoute, PrivateRoute, Loading } from './components';
import CreateRoom from './pages/CreateRoom';
import BlockUsers from './pages/Admin/BlockUsers';
import './App.css';
const App = () => {
    const { loading, auth, role, setAuth, setLoading, username, removeCurrentUser } = useAuth();

    if (loading) {
        return <Loading />;
    }
    return (
        <CustomThemeProvider>
            <UserContext.Provider
                value={{ auth, role, loading, setAuth, setLoading, username, removeCurrentUser }}
            >
            <div className="App" dir="rtl">
                <Switch>
                    <PublicRoute exact path="/">
                        <Rooms />
                    </PublicRoute>
                    <PublicRoute path="/signup">
                        <Signup />
                    </PublicRoute>
                    <PublicRoute path="/login">
                        <Login />
                    </PublicRoute>
                    <PrivateRoute path="/rooms/:room">
                        <ChattingRoom />
                    </PrivateRoute>
                    <PrivateRoute path="/room/create">
                        <CreateRoom />
                    </PrivateRoute>
                    <PrivateRoute path="/rooms">
                        <Rooms />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/rooms">
                        <BlockUsers />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/users">
                        <BlockUsers />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/bans">
                        <BlockUsers />
                    </PrivateRoute>
                    <Redirect from="/admin" to="/admin/rooms" />
                </Switch>
            </div>
            </UserContext.Provider>
        </CustomThemeProvider>
    );
};

export default App;
