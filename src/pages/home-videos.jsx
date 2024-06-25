import { useEffect, useState } from "react";
import DashboardVideoCard from "../components/dashboard-video/dashboard-video-card";
import { GetData } from "../hooks/fetchdata";

const HomeVideos = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("barchasi");
  const [sortOrder, setSortOrder] = useState("");

  const getCategories = () => {
    GetData(`/api/category/`)
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setCourses(data[0].courses);
          setActiveCategory(data[0].title);
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCourses = (id) => {
    GetData(id === "all" ? `/api/category/` : `/api/category/${id}/`)
      .then((data) => {
        const sortedCourses = sortCourses(data.courses, sortOrder);
        setCourses(sortedCourses);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleActiveCategory = () => {
    setActiveCategory("barchasi");
    updateCourses("all");
  };

  const handleCourseById = (id, name) => {
    updateCourses(id);
    setActiveCategory(name);
    console.log(activeCategory);
  };

  const sortCourses = (courses, order) => {
    if (order === "id") {
      return [...courses].sort((a, b) => a.id - b.id);
    } else if (order === "date") {
      return [...courses].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "enrolment") { 
      return [...courses].sort((a, b) => b.enrolment - a.enrolment); // foydalanuvchi soni boyicha kamayishi
    }
    return courses;
  }

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedCourses = sortCourses(courses, order);
    setCourses(sortedCourses);
  }
  

  return (
    <div className="video container">
      <div className="category-sidebar">
        {/* <div
          onClick={handleActiveCategory}
          className={activeCategory === "barchasi" ? "category-card active" : "category-card"}
        >
          <button>Barchasi</button>
        </div> */}
        {categories.length > 0 ? (
          categories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCourseById(item.id, item.title)}
              className={activeCategory === item.title ? "category-card active" : "category-card"}
            >
              <button>{item.title}</button>
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
              <option value="">Saralash</option>
              <option value="date">Sana bo'yicha filtrlash</option>
              <option value="id">Id bo'yicha filtrlash</option>
              <option value="enrolment">Foydalanuvchi soni bo'yicha filtrlash</option>
            </select>
            </div>  
          </div>
        ) : (
          <h2></h2>
        )}
        <div className="videos load-anim">
          {courses && courses.length > 0 ? (
            courses.map((item) => <DashboardVideoCard data={item} key={item.id} />)
          ) : (
            <h2>Malumotlar yuklanmoqda</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeVideos;