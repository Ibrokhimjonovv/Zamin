import "./login.scss";
import Logo from "../assets/images/logo-admin.svg";
import Form from "react-bootstrap/Form";
import { PostData } from "../hooks/fetchdata";
import { useState } from "react";
import { useUserContext } from "../contexts/users-context";
import { BounceLoader } from "react-spinners";
import { data, region } from "../data/data";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
// Images
import googleIcon from '../assets/images/login/googleIcon.png'

const Signup = () => {
  const { token, setLoading, loading } = useUserContext();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [middleName, setMiddleName] = useState();
  const [ password, setPassword ] = useState();
  const [ rePassword, setRePassword ] = useState();
  // const [agree, setAgree] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState();
  const [cityId, setCityId] = useState();
  const [you, setYou] = useState();
  const [you2, setYou2] = useState();
  const [provinceId, setProvinceId] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();

  // const navigate = useNavigate()

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
      
      // First, check if passwords match and handle the error
      if (password !== rePassword) {
        setError("Parollar mos emas");
        console.log(error);
        return; // Exit the function if passwords don't match
      }

      // Then, proceed with the PostData call
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
      navigate('/login')

    } catch (err) {
      setLoading(false);
      console.log(err);
    }
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
              width: '100px',
            }}
            src={Logo}
            alt=""
          />
        </Link>
        <Form style={{}} onSubmit={SubmitHandler}>
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
                  <option value={e?.id}>
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

                {data?.map((e) => (
                  <>
                    {e.region_id === cityId && (
                      <option value={e?.id}>
                        {e?.name_uz}
                      </option>
                    )}
                  </>
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
              {
                error ? (
                    <Form.Label>Parollar mos emas</Form.Label>
                ) : (
                  <Form.Label>Parol</Form.Label>
                )
              }
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Parolni takrorlang</Form.Label>
            <Form.Control
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
                  <option value={"teacher"}>
                    O'quvchi
                  </option>
                  <option value={"student"}>
                    Talaba
                  </option>
                  <option value={"jurnalist"}>
                    Jurnalist
                  </option>
                  <option value={"ecofaol"}>
                    Eco faol
                  </option>
                  <option value={"volantyor"}>
                    Volontyor
                  </option>
                  <option value={"worker"}>
                    Ishchi xodim
                  </option>
                  <option value={"other"}>Boshqa</option>
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
        </Form>

        <div className="otherLoginForm">
          <span id="line"></span>
          <span id="or">yoki</span>
          <Link to="#google">
              <img src={googleIcon} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;