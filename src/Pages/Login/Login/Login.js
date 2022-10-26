import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/Authprovider';


const Login = () => {
    const [error, setError] = useState('');
    const {signIn, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email,password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                if(user.emailVerified){
                    navigate(from, { replace: true });
                }
                else{
                    toast.error("Verify your email address before login");
                }
                setError('');
            })
            .catch(error => {
                console.error("Error: ", error);
                setError(error.message);    
            })
            .finally(()=>{
                setLoading(false);
            })
            
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Text className="text-danger fw-bold">
                    {error}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;