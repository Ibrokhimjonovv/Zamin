import { createContext, useContext, useEffect, useState } from "react";
import { GetData } from "../hooks/fetchdata";
import { GetDataCreative } from "../hooks/fetch-creative";
import axios from "axios";
import { useParams } from "react-router";
import { URL } from '../hooks/fetchdata';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [showdelete, setShowdelete] = useState(false);
  const handleCloseDelete = () => setShowdelete(false);
  const handleShowDelete = () => setShowdelete(true);
  const [course, setCourse] = useState();
  const [courseCreative, setCourseCreative] = useState();     
  const [courseById, setCourseById] = useState();
  const [courseByIdCreative, setCourseByIdCreative] = useState();
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState();
  const [econews, setEcoNews] = useState();
  const [tests, setTests] = useState();
  const [galleryId, setGalleryId] = useState();
  const [ faollar, setFaollar ] = useState();
  const [ courseCount, setCourseCount ] = useState();

  useEffect(() => {
    if (token) {
      GetData(`/api/users/`, token)
        .then((data) => {
          setFaollar(data)
        })
        .catch((err) => console.error(err));
    }
  }, [token]);
  const GetCourse = () => {
    GetData(
      courseById > 0
        ? `/api/category${courseById}`
        : `/api/course-part/`,
      token
    )
      .then((data) => {
        setCourseCount(data)
        if (courseById > 0) {
          setCourse(data.courses);
        } else {
          setCourse(data);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    GetCourse();
  }, [token, courseById]);

  const GetCourseCreative = () => {
    GetDataCreative(
      courseByIdCreative > 0
        ? `/api/category/${courseByIdCreative}`
        : `/api/course/`,
      token
    )
      .then((data) => {
        if (courseByIdCreative > 0) {
          setCourseCreative(data.courses);
        } else {
          setCourseCreative(data);
        }
      })
      .catch((err) => console.error(err));
  };
  const GetNews = () => {
    GetDataCreative(`/api/news/`)
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    GetNews();
  }, []);
  const GetNewsEco = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.get(`${ URL }/api/news-category/`).then((response) => {
      setEcoNews(response.data);
    });
  };

  useEffect(() => {
    GetNewsEco();
  }, []);

  useEffect(() => {
    GetCourseCreative();
  }, [token, courseByIdCreative]);

  useEffect(() => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user))
    } if (!user) {
        localStorage.removeItem("user")
    }
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    if (!token) {
      localStorage.removeItem("token");
    }
  }, [users, token]);

  const value = {
    users,
    setUsers,
    token,
    setToken,
    showdelete,
    setShowdelete,
    handleCloseDelete,
    handleShowDelete,
    course,
    setCourse,
    GetCourse,
    GetCourseCreative,
    courseById,
    setCourseById,
    deleteId,
    setDeleteId,
    loading,
    setLoading,
    courseCreative,
    setCourseCreative,
    courseByIdCreative,
    setCourseByIdCreative,
    news,
    setNews,
    GetNews,
    econews,
    setEcoNews,
    GetNewsEco,
    galleryId,
    setGalleryId,
    tests,
    setTests,
    faollar,
    courseCount
  };

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      users,
      setUsers,
      course,
      setCourse,
      faollar,
      setLoading,
      courseCount,
      news,
      econews,
   }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

