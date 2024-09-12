import { useEffect, useState } from "react";
import DashboardVideoCard from "../components/dashboard-video/dashboard-video-card";
import { GetData } from "../hooks/fetchdata";

import "./home-videos.scss";

const HomeVideos = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const loadFromLocalStorage = () => {
    const savedCategories = localStorage.getItem("categories");
    const savedCourses = localStorage.getItem("courses");

    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(parsedCategories);

        if (parsedCategories.length > 0) {
          setActiveCategory(parsedCategories[0].title);
          setCourses(parsedCategories[0].courses || []);
        }
      } catch (error) {
        console.error("Error parsing categories from localStorage", error);
        localStorage.removeItem("categories");
      }
    }

    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error("Error parsing courses from localStorage", error);
        localStorage.removeItem("courses");
      }
    }
  };

  const getCategories = () => {
    GetData(`/api/category/`)
      .then((data) => {
        setCategories(data);
        localStorage.setItem("categories", JSON.stringify(data));
        if (data.length > 0) {
          setActiveCategory(data[0].title);
          const sortedCourses = sortCourses(data[0].courses, sortOrder);
          setCourses(sortedCourses);
          localStorage.setItem("courses", JSON.stringify(sortedCourses));
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCourses = (id) => {
    GetData(id === "all" ? `/api/category/` : `/api/category/${id}/`)
      .then((data) => {
        const sortedCourses = sortCourses(data.courses, sortOrder);
        setCourses(sortedCourses);
        localStorage.setItem("courses", JSON.stringify(sortedCourses));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    const savedCourses = localStorage.getItem("courses");

    if (!savedCategories || !savedCourses) {
      getCategories();
    } else {
      loadFromLocalStorage();
    }
  }, []);

  const handleCourseById = (id, name) => {
    updateCourses(id);
    setActiveCategory(name);
  };

  const sortCourses = (courses, order) => {
    console.log("Saralash parametrlari:", courses, order);

    if (order === "id") {
      return [...courses].sort((a, b) => b.id - a.id);
    } else if (order === "date") {
      return [...courses].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (order === "enrolment") {
      return [...courses].sort((a, b) => b.enrolment - a.enrolment);
    } else if (order === "default_count") {
      return [...courses].sort((a, b) => a.id - b.id);
    }
    return courses;
  };

  useEffect(() => {
    if (courses && courses.length > 0) {
      const sortedCourses = sortCourses(courses, sortOrder);
      setCourses(sortedCourses);
    }
  }, [sortOrder]);

  const handleSortChange = (e) => {
    const order = e.target.value;
    console.log("Saralash tartibi o'zgardi:", order);
    setSortOrder(order);
  };

  return (
    <div className="video container">
      <div className="category-sidebar">
        <h5 id="department">Bo'limlar</h5>
        {categories.length > 0 ? (
          categories.map((item) => (
            <div key={item.id} className="center">
              <label
                htmlFor={`check-${item.id}`}
                className={
                  activeCategory === item.title
                    ? "category-card form-control active"
                    : "category-card"
                }
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`check-${item.id}`}
                  checked={activeCategory === item.title} // Tanlangan kategoriya checkbox-da belgilansin
                  onChange={() => handleCourseById(item.id, item.title)} // Kategoriya tanlanganda o'zgaradi
                />
                <span>{item.title}</span>
                <span class="custom-checkbox"></span>
              </label>
            </div>
          ))
        ) : (
          <span>Malumotlar yuklanmoqda</span>
        )}
      </div>

      <div className="helperContainer">
        {courses && courses.length > 0 ? (
          <div className="videosNavbar">
            <h5>Kurslar soni: {courses.length} ta</h5>
            <div>
              <select name="" id="select_form" onChange={handleSortChange}>
                <option value="default_count">Saralash</option>
                <option value="id">Sana bo'yicha filtrlash</option>
              </select>
            </div>
          </div>
        ) : (
          <h2></h2>
        )}
        <div className="videos load-anim">
          {courses && courses.length > 0 ? (
            courses.map((item) => (
              <DashboardVideoCard data={item} key={item.id} />
            ))
          ) : (
            <h2>Ma'lumotlar yuklanmoqda</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeVideos;
