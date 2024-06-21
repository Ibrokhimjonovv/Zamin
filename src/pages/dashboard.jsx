import Table from "react-bootstrap/Table";
import UsersIcon from "../assets/images/users.svg";
import VideosIcon from "../assets/images/videos.svg";
import NewsIcon from "../assets/images/newsicon.svg";
import TestsIcon from "../assets/images/tests.svg";
import "./login.scss";
import Logo from "../assets/images/logo-admin.svg";
import Form from "react-bootstrap/Form";
import { GetData, PostData } from "../hooks/fetchdata";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/users-context";
import { useNavigate } from "react-router";
import { BounceLoader } from "react-spinners";
import "./dashboard.scss";
import Sidebar from "../components/sidebar/sidebar";
import { Button, Modal } from "react-bootstrap";
import CountUp from "react-countup";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  const handleShow = () => setShow(true);
  const [ loading, setLoading ] = useState(false)
  const {
    token,
    setToken,
    courseCount,
    courseCreative,
    news,
    econews,
    tests,
  } = useUserContext();
  const { users, faollar } = useUserContext();
  // Users Length
  const totalEcoFaollarLength = faollar?.length || 0;

  // News Length
  const econewsLength = econews?.length || 0;
  const newsLength = news?.length || 0;
  const totalNewsLength = econewsLength + newsLength;

  // Course Length
  const courseLength = courseCount?.length || 0;
  const courseCreativeLength = courseCreative?.length || 0;
  const totalCourseLength = courseLength + courseCreativeLength;
  
  // Tests Length
  const totalTestsLength = tests?.length || 0;


  const handleClose = () => setShow(false);
  const GetCount = () => {
    GetData(`/api/users/`, token)
      .then((data) => {
        setCount(data?.length);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    GetCount();
  }, [token]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [bio, setBio] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function SignInHandler(e) {
    e.preventDefault();
    setLoading(true);
    const formattedDateOfBirth = formatDate(dateOfBirth);


    PostData(
      "/api/users/",
      {
        ism: firstName,
        familiya: lastName,
        username: username,
        password: password,
        bio: bio,
        date_of_birth: formattedDateOfBirth,
      },
      token
    )
      .then((data) => {
        if (data.message) {
          setText(data.message);
        }
        setLoading(false);
        if (data.code !== 400 && data.code !== 500) {
          setToken(data.token);
          navigate("/dashboard/");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="dashboard-section load-anim">
        <h2 className="dashboard-title">Admin Panel</h2>
        <div className="dashboard-header container">
          <div className="header-item">
            <div className="icon">
              <img src={UsersIcon} alt="" />
            </div>
            <div className="title">
              <h2>Barcha o’quvchilar</h2>
              <span>{totalEcoFaollarLength}</span>
            </div>
          </div>
          <div className="header-item">
            <div className="icon">
              <img src={VideosIcon} alt="" />
            </div>
            <div className="title">
              <h2>Barcha video-darslar</h2>
              <span>{totalCourseLength}</span>
            </div>
          </div>
          <div className="header-item">
            <div className="icon">
              <img src={NewsIcon} alt="" />
            </div>
            <div className="title">
              <h2>Barcha yangiliklar</h2>
              <span>{totalNewsLength}</span>
            </div>
          </div>
          <div className="header-item">
            <div className="icon">
              <img src={TestsIcon} alt="" />
            </div>
            <div className="title">
              <h2>Barcha testlar</h2>
              <span>{totalTestsLength}</span>
            </div>
          </div>
        </div>
        <div className="carousel-inner-zamin mb-5">
          <div className="titles">
            <h3>
              Iqlim o’zgardi biz ham <br /> o’zgarishimiz shart
            </h3>
            <p>
              “Zamin” fondi va YUNISЕF tomonidan Butunjahon bolalar kuniga
              bag‘ishlab gibrid formatda “Bolalarning sog‘lom atrof-muhitga
              bo‘lgan huquqlarini ta’minlash” mavzusida xalqaro forum
              o‘tkazildi.
            </p>
          </div>
          <div className="countup">
            <CountUp
              start={0}
              duration={1}
              className="countup-num"
              end={count}
            />
            {/* <img src={EcoImg} alt="First slide" /> */}
          </div>
        </div>
        <div className="users-tables">
          <h2>O’quvchilar</h2>
          <div className="users">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Ism</th>
                  <th>Familiya</th>
                  <th>Otasini ismi</th>
                  <th>Tel raqami</th>
                  <th>Tug'ilgan sanasi</th>
                  <th>Manzil</th>
                  <th>Siz</th>
                </tr>
              </thead>
              <tbody>

                {
                  faollar && faollar.map((item, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{item?.first_name}</td>
                      <td>{item?.last_name}</td>
                      <td>{item?.father_name}</td>
                      <td>{item?.phone_number}</td>
                      <td>{item?.birth_date.slice(0, 10)}</td>
                      <td>{item?.city}, {item?.province}</td>
                      <td>{item?.user_type}</td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>

        <Button onClick={() => setShow(true)} style={{
                    float: "right"
                }} variant='dark'>Create user</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={SignInHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ismingiz</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Ismingiz"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Familiya</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Familiya"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tug'ulgan sana</Form.Label>
            <Form.Control
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              placeholder="Tug'ulgan sana"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              onChange={(e) => setBio(e.target.value)}
              type="text"
              placeholder="Bio"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Parol</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </Form.Group>
          <button className="primary-button" variant="primary" type="submit">
            Kirish
          </button>
          <h2>{text}</h2>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
