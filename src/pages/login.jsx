import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './login.scss';
import Logo from '../assets/images/logo-admin.svg';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../contexts/users-context';
import { useNavigate } from 'react-router';
import Spinner from '../components/loading/loading';
import { URL } from '../hooks/fetchdata';

// Images
import googleIcon from '../assets/images/login/googleIcon.png'


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useUserContext();
  const navigate = useNavigate();

  async function SignInHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch(`${URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number: phoneNumber, password: password }),
        });

        const data = await response.json();
        setLoading(false);

        console.log(data);

        if (response.status === 200) {
            localStorage.setItem('accessToken', data.access);
            setToken(data.token);
            console.log(data)

            if (data.is_staff) {
                console.log("User is staff or superuser.");
                navigate('/dashboard/');
            } else {
                console.log("User is not staff.");
                navigate('/');
            }
        } else {
            setError(data.detail || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        setError('An error occurred. Please try again later.');
    }
}

  return (
    <>
      {loading && <Spinner />}
      <div className="login container w-25">
        <Link to="/">
          <img
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
            src={Logo}
            alt=""
          />
        </Link>
        <Form onSubmit={SignInHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Parol</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              value={password}
              required
            />
          </Form.Group>
          <button className="primary-button" variant="primary" type="submit">
            Kirish
          </button>
          <div className="signupContainer">
          Akkountingiz yo'qmi? <Link to="/signup">Ro'yxatdan o'tish</Link>
          </div>
          <div className="otherLoginForm loginForm">
            <span id="line"></span>
            <span id="or">yoki</span>
            <Link to="#google" id='googleFormLink'>
                <img src={googleIcon} alt="" />
            </Link>
          </div>
          {error && <div className="error">{error}</div>}
        </Form>
      </div>
    </>
  );
};

export default Login;
