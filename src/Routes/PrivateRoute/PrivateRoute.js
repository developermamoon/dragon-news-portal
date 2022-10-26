import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/Authprovider';
import Spinner from 'react-bootstrap/Spinner';

/*
1. only allow authenticated user to visit the route
2.
3.Redirect user to the route they wanted to go before login
 */

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation(); //get the location before going to the login page

    
    if(loading){
        return <Spinner animation="border" variant="primary" />;  
    }

    if(!user){
        return <Navigate to = '/login' state={{from: location}} replace></Navigate>
    }
    return children;
    
};

export default PrivateRoute;