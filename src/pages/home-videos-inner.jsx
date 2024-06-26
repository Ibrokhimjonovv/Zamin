import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../contexts/users-context";
import { GetData, URL } from "../hooks/fetchdata";
import Spinner from "../components/loading/loading";
import Modal from '@mui/material/Modal';

// Icons
import 'boxicons/css/boxicons.min.css';

// SCSS
import "./home-videos-inner.scss";

// Images
import bgImage from '../assets/images/courseAbout/bgImage.png';
import star from '../assets/images/star.png';
import emptyStar from '../assets/images/emptyStar.png';
import shareImage from '../assets/images/courseAbout/shareImage.png';
import bookmarkImage from '../assets/images/courseAbout/bookmark.png';
import done from '../assets/images/courseAbout/Done.png';

const HomeVideosInner = ({ data, handleOpen, setVideoSrc }) => {
  const { videoId } = useParams();
  const [videos, setVideos] = useState(null);
  const { token, setLoading, loading } = useUserContext();
  const [error, setError] = useState('');
  const [courseTitles, setCourseTitle] = useState([]);
  const [titles, setTitles] = useState([]);
  const [titlesLinks, setTitlesLinks] = useState([]);
  const [openIndexes, setOpenIndexes] = useState([]);
  const [accessToken, setAccessToken] = useState(false);
  const [testsTitle, setTestsTitle] = useState([])

  const GetVideos = () => {
    setLoading(true);
    GetData(`/api/course-part/${videoId}/`, token)
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetVideos();
  }, [token]);

  useEffect(() => {
    const userToken = localStorage.getItem('accessToken');
    setAccessToken(!!userToken);
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/course-department/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        let sdata = [];
        data.forEach((v) => { if (Number(v.course) === Number(videoId)) { sdata.push(v); } });
        setTitles(sdata);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTitlesLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/course-part/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTitlesLinks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    const courseTitle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/course/${videoId}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("q: ", data);
        setCourseTitle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("Course-title", courseTitles);
    console.log("Course-department", titles);
    console.log("Course-part", titlesLinks);

    const testTitle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/tests/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        let cdata = [];
        data.forEach((v) => { if (Number(v.course) === Number(videoId)) { cdata.push(v); } });
        setTestsTitle(cdata);
        console.log(testsTitle, '-----------------1111111111');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTitles();
    fetchTitlesLinks();
    courseTitle();
    testTitle();

  }, [setLoading]);

  const toggleAnswer = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      {loading && (
        <>
          <Spinner />
          <div style={{ height: "100vh" }}></div>
        </>
      )}
      {videos ? (
        <div className="videos-card mb-3">
          <div className="doubleContainer">
            <div className="first">
              <div className="aboutContainer" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="typeCourse">
                  Grafik dizayner
                </div>
                <div className="courseHeading">
                  <div>
                    <h2>
                      {courseTitles.title}
                    </h2>

                    <div className="courseDescription">
                      <p>
                        {courseTitles.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="starAndView">
                  <div className="courseStars">
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={emptyStar} alt="" />
                  </div>
                  <span>
                    4.0 (458 marta ko‘rildi)
                  </span>
                </div>
                <div className="threeInOne">
                  <div>
                    {accessToken ? (
                      <Link>
                        Davom etish
                      </Link>
                    ) : (
                      <Link to="/login">
                        Xisobga kirish
                      </Link>
                    )}
                  </div>
                  <div>
                    <Link>
                      <img src={shareImage} alt="" />
                    </Link>
                  </div>
                  <div>
                    <Link>
                      <img src={bookmarkImage} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="courseDuration">
                <ul className="faq">
                  {titles.map((title, index) => (
                    <li key={index}>
                      <div className="q" onClick={() => toggleAnswer(index)}>
                        <span>{title.title}</span>
                        <span className={`arrow ${openIndexes.includes(index) ? 'arrow-rotated' : ''}`}>
                          <i className='bx bx-x'></i>
                        </span>
                      </div>
                      <div className={`a ${openIndexes.includes(index) ? 'a-opened' : ''}`}>
                        {titlesLinks
                          .filter(link => link.course_department === title.id)
                          .map((link, idx) => (
                            <Link to="#" key={idx} onClick={() => { setVideoSrc(`${link.video_link}`); handleOpen(); }}>
                              <div> <p><span>{idx + 1}</span> {link.title} </p> <p></p></div>
                            </Link>
                          ))}
                      </div>
                    </li>
                  ))}
                  {accessToken && (
                    <div id="testCc">
                      {testsTitle.map((test, index) => (
                        <li key={index + 1}>
                          <Link to={`testing/${test.id}`}>
                            {test.title}
                          </Link>
                        </li>
                      ))}
                    </div>
                  )}

                </ul>
              </div>
              <div className="aboutLessons">
                <h3>What you'll learn from this lesson</h3>
                <div className="moreLessons">
                  {/* {
                    courseTitles.map((courseDes, index) => (
                      <p> <img src={done} alt="" /> { courseDes.description }</p>
                    ))
                  } */}

                  {courseTitles.description}
                </div>
              </div>
            </div>
            <div className="second">
              <div className="rating">
                <h1>4.2</h1>
                <div>
                  <div className="ratingStars">
                    <div className="courseStars">
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={star} alt="" />
                      <img src={emptyStar} alt="" />
                    </div>
                    <span>
                      4.0 (458 marta ko‘rildi)
                    </span>
                  </div>
                </div>
              </div>
              <div className="ratingContainer">
                <div className="ratingLine">
                  <img src={star} alt="" />
                  5
                  <div className="line">
                    <span></span>
                  </div>
                  70%
                </div>
                <div className="ratingLine">
                  <img src={star} alt="" />
                  4
                  <div className="line">
                    <span></span>
                  </div>
                  50%
                </div>
                <div className="ratingLine">
                  <img src={star} alt="" />
                  3
                  <div className="line">
                    <span></span>
                  </div>
                  40%
                </div>
                <div className="ratingLine">
                  <img src={star} alt="" />
                  2
                  <div className="line">
                    <span></span>
                  </div>
                  30%
                </div>
                <div className="ratingLine">
                  <img src={star} alt="" />
                  1
                  <div className="line">
                    <span></span>
                  </div>
                  20%
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span>Malumotlar yuklanmoqda</span>
        </>
      )}
    </>
  );
};

const DashboardVideoCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="dashboard-video-card">
        <div className="img">
          <HomeVideosInner data={data?.title} handleOpen={handleOpen} setVideoSrc={setVideoSrc} />
        </div>
        <div className="titles-videos">
          <div className="name">
            {/* <h2>{data?.title}</h2> */}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="youtube-container">
          <iframe width="100%" height="100%" src={videoSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </Modal>
    </>
  );
};

export default DashboardVideoCard;
