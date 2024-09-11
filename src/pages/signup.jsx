import "./login.scss";
import Logo from "../assets/images/log.png";
import Form from "react-bootstrap/Form";
import { PostData, URL } from "../hooks/fetchdata";
import { useState } from "react";
import { useUserContext } from "../contexts/users-context";
import { BounceLoader } from "react-spinners";
import { data, region } from "../data/data";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import googleIcon from '../assets/images/login/googleIcon.png';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';  // Correct import

const Signup = () => {
  const { token, setLoading, loading } = useUserContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cityId, setCityId] = useState(null);
  const [you, setYou] = useState('');
  const [you2, setYou2] = useState('');
  const [provinceId, setProvinceId] = useState(null);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useUserContext();
  const [user, setUser] = useState(null);



  const navigate = useNavigate();

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedDateOfBirth = formatDate(dateOfBirth);

      let city = region?.find((e) => e.id === cityId);
      let province = data?.find((e) => e.id === provinceId);

      if (password !== rePassword) {
        setError("Parollar mos emas");
        setLoading(false);
        return;
      }

      await PostData(
        "/api/users/",
        {
          first_name: firstName,
          last_name: lastName,
          father_name: middleName,
          birth_date: formattedDateOfBirth,
          city: city.name_uz,
          province: province.name_uz,
          phone_number: phone,
          password: password,
          user_type: you === "other" ? you2 : you,
        },
        token
      );
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const datas = {};

  const loginWithGoogle = async () => {
    try {
      const response = await fetch(`${URL}/accounts/google/login/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      const data = await response.json();
      console.log('Google orqali kirish muvaffaqiyatli amalga oshgan:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginWithGoogle();
      // Muvaffaqiyatli ro'yxatdan o'tishdan so'ng kerak bo'lgan har qanday qadamlar
    } catch (error) {
      console.error('Google orqali ro\'yxatdan o\'tishda xatolik:', error);
      // Xatolik holatida kerak bo'lgan har qanday qadamlar
    }
  };

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    const decoded = jwtDecode(response.credential);
    setUser(decoded); // Save the decoded user information

    // Extract and store the access token
    const accessToken = response.credential;
    localStorage.setItem('accessToken', accessToken);
    setToken(accessToken);

    navigate('/');
  };

  const onFailure = (error) => {
    console.log('Login Failed:', error);
  };
  


  return (
    <>
      {loading && (
        <BounceLoader
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            background: "red",
          }}
          color="#36d7b7"
        />
      )}
      <div className="login container w-25 signup-container">
        <Link to="/">
          <img
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
              width: '180px',
            }}
            src={Logo}
            alt=""
          />
        </Link>
        <Form onSubmit={SubmitHandler}>
          <div className="form-inputs">
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Ism</Form.Label>
              <Form.Control
                required
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                type="text"
                placeholder="Ism"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail2"
            >
              <Form.Label>Familiya</Form.Label>
              <Form.Control
                required
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                type="text"
                placeholder="Familiya"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail3"
            >
              <Form.Label>Otasini ismi</Form.Label>
              <Form.Control
                required
                onChange={(e) =>
                  setMiddleName(e.target.value)
                }
                type="text"
                placeholder="Otasini ismi"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 date-input"
              controlId="formBasicEmail4"
            >
              <Form.Label>Tug'ilgan kun</Form.Label>
              {!dateOfBirth && (
                <div className="before before-style">
                  <Form.Label>Kun.Oy.Yil</Form.Label>
                </div>
              )}
              <Form.Control
                placeholder="Kun.Oy.Yil"
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
                type="date"
                title="Oy.Kun.Yil"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Label>Viloyat</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCityId(parseInt(e.target.value));
                }}
                className="mb-3"
                aria-label="Default select example"
              >
                <option>Viloyat</option>
                {region?.map((e, k) => (
                  <option key={k} value={e?.id}>
                    {e?.name_uz}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox2"
            >
              <Form.Label>Shahar/Tuman</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setProvinceId(parseInt(e.target.value));
                }}
                className="check"
                aria-label="Default select example"
              >
                <option>Shahar</option>
                {data?.map((e, k) => (
                  e.region_id === cityId && (
                    <option key={k} value={e?.id}>
                      {e?.name_uz}
                    </option>
                  )
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail5"
            >
              <Form.Label>Telefon raqami</Form.Label>
              <Form.Control
                required
                onChange={(e) => setPhone(e.target.value)}
                type="tell"
                placeholder="+998 *******"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              {error ? (
                <Form.Label style={{ color: 'red' }}>Parollar mos emas</Form.Label>
              ) : (
                <Form.Label>Parol</Form.Label>
              )}
              <Form.Control
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Parolni takrorlang</Form.Label>
              <Form.Control
                required
                onChange={(e) => setRePassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicEmail6"
            >
              <Form.Label>Siz - ....</Form.Label>
              {you !== "other" ? (
                <Form.Select
                  onChange={(e) => setYou(e.target.value)}
                  className="mb-3"
                  aria-label="Default select example"
                >
                  <option value="teacher">O'quvchi</option>
                  <option value="student">Talaba</option>
                  <option value="jurnalist">Jurnalist</option>
                  <option value="ecofaol">Eco faol</option>
                  <option value="volantyor">Volontyor</option>
                  <option value="worker">Ishchi xodim</option>
                  <option value="other">Boshqa</option>
                </Form.Select>
              ) : (
                <Form.Control
                  required
                  onChange={(e) =>
                    setYou2(e.target.value)
                  }
                  type="text"
                  placeholder="O'quvchi, Talaba, Ishchi xodim..."
                />
              )}
            </Form.Group>
          </div>

          <div
            style={{
              textAlign: "center",
            }}
            className="button"
          >
            <Button
              style={{
                height: "52px",
                textAlign: "center",
              }}
              className=" mb-4"
              variant="dark"
              type="submit"
            >
              Ro'yxatdan o'tish
            </Button>
          </div>
          <div className="signupContainer">
            Akkountingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </Form>

        <div className="otherLoginForm">
          <span id="line"></span>
          <span id="or">yoki</span>
          {/* <button type="submit" onClick={handleSubmit}>
            <img src={googleIcon} alt="Google Icon" />
            Google orqali ro'yxatdan o'tish
          </button>
          <Link to="http://bk.zamineducation.uz/accounts/google/login/">Allaqachon ro'yxatdan o'tganmisiz?</Link> */}
          <GoogleLogin
              className="google-auth"
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
        </div>
      </div>
    </>
  );
};

export default Signup;
