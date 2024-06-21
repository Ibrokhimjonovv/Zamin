import { useEffect, useState } from "react";
import "./videos.scss";
import DashboardVideoCard from "../components/dashboard-video/dashboard-video-card";
import PlusIcon from "../assets/images/plus.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "../assets/images/img.png";
import { Form } from "react-bootstrap";
import DeleteBtn from "../assets/images/delete.svg";
import { useUserContext } from "../contexts/users-context";
import { GetData, PostData } from "../hooks/fetchdata";
import { useNavigate } from "react-router";
import Spinner from "../components/loading/loading";
import { URL } from "../hooks/fetchdata"


const Videos = () => {
  const [active, setActive] = useState("barchasi");
  const [show, setShow] = useState(false);
  const {
    showdelete,
    users,
    token,
    course,
    GetCourse,
    setCourseById,
    deleteId,
    handleCloseDelete,
    setLoading,
    courseById,
    loading,
  } = useUserContext();
  const [categoryShow, setCategoryShow] = useState(false);
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [authorId, setAuthorId] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [categoryId, setCategoryId] = useState();
  const handleClose = () => setShow(false);
  const handleCloseCategory = () => setCategoryShow(false);
  const handleShow = () => setShow(true);
  const handleShowCategory = () => setCategoryShow(true);
  const [value, setValue] = useState();
  const [categorys, setCategorys] = useState();
  const [dagree, setDegree] = useState();
  const [caregoryDelete, setCategoryDelete] = useState(false);
  const handleCloseCategoryDelete = () => setCategoryDelete(false);
  const GetCategory = () => {
    GetData(`/api/category/`, token)
      .then((data) => {
        setCategorys(data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const GetCategory = () => {
      GetData(`/api/category/`, token)
        .then((data) => {
          console.log("Kategoriyalar:", data);
          setCategorys(data);
        })
        .catch((err) => console.error(err));
    };
    GetCategory();
  }, [token]);
  
  const ImageUploader = (e) => {
    if (e.target.files) {
      const files = e.target.files[0];
      setImg(files);
    }
  };
  const removeCategory = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `${ URL }/api/category/${courseById}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        ("removed");
        setLoading(false);
        GetCategory();
        handleCloseCategoryDelete();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const removeCourse = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${ URL }/api/category/${deleteId}`, { 
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        ("removed");
        setLoading(false);
        GetCourse();
        handleCloseDelete();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const navigate = useNavigate();
  const sendFileHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("AuthorId", authorId);
    formData.append("Image", img);
    formData.append("CategoryId", categoryId);
    formData.append("YouTubePlaylistLink", videoUrl);
    formData.append("Level", dagree);
    fetch(`${ URL }/api/course/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        GetCourse();
        setLoading(false);
        if (response.status === 401) {
          navigate("/login");
        }
        if (response.status === 200) {
          GetCourse();
          return response.json();
        }
      })
      .catch((err) => {
        console.err(err);
      });
  };
  const AddCategory = (e) => {
    e.preventDefault();
    PostData(
      "/api/category/",
      {
        name: value,
      },
      token
    )
      .then((data) => {
        GetCategory();
        handleCloseCategory();
      })
      .catch((err) => console.error(err));
  };
  const ActiveHanadler = () => {
    setActive("barchasi");
    setCourseById(0);
  };
  const CourseById = (id, name) => {
    setCourseById(id);
    setActive(name);
  };
  return (
    <div>
      <div className="dashboard-section load-anim">
        <div className="categorys">
          <div className="titles d-flex justify-content-between">
            <h2>Video-darslar</h2>
            <button onClick={handleShow} className="primary-button w-25">
              <img src={PlusIcon} alt="" /> Video-dars qo’shish
            </button>
          </div>

          <div className="category-cards">
            <div
              onClick={ActiveHanadler}
              className={
                active === "barchasi" ? "category-card active" : "category-card"
              }>
              <h2>Barchasi</h2>
            </div>
            {categorys ? (
              categorys?.map((item, key) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => CourseById(item.id, item.name)}
                  className={
                    active === item?.name
                      ? "category-card active"
                      : "category-card"
                  }>
                  <h2>{item?.name}</h2>
                  <Button
                    onClick={() => setCategoryDelete(true)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0px  0px  0px 10px",
                    }}>
                    {" "}
                    <img src={DeleteBtn} alt="" />
                  </Button>
                </div>
              ))
            ) : (
              <>
                <h2>Malumotlar yuklanmoqda</h2>
              </>
            )}
            <div className={"category-card active"}>
              <img onClick={handleShowCategory} src={PlusIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="videos">
          {loading && <Spinner />}
          {course ? (
            course?.map((item, key) => <DashboardVideoCard data={item} key={key} />)
          ) : (
            <>
              <h2>Malumotlar yuklanmoqda</h2>
            </>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <h2>Video-dars qo’shish</h2>
        <Form onSubmit={sendFileHandler}>
          <label className="image-cover" htmlFor="img">
            <input onChange={ImageUploader} type="file" name="img" id="img" />
            <img src={Image} alt="" />
            <p>Cover rasm qo’shish</p>
          </label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Havola</Form.Label>
            <Form.Control
              onChange={(e) => setVideoUrl(e.target.value)}
              type="text"
              placeholder="https://youtu.be/d456-7u4Io8"
            />
          </Form.Group>
          <Form.Select
            className="mb-3"
            onChange={(e) => setAuthorId(e.target.value)}
            aria-label="Default select example">
            <option>O'qituvchi</option>
            {users?.map((item, key) => (
              <>
                {item?.role === 2 && (
                  <option value={item.id}>
                    {item?.firstName} {item?.lastName}
                  </option>
                )}
              </>
            ))}
          </Form.Select>
          <Form.Select
            className="mb-3"
            onChange={(e) => setCategoryId(e.target.value)}
            aria-label="Default select example">
            <option>Category</option>
            {categorys?.map((item, key) => (
              <option value={item.id}>{item?.name}</option>
            ))}
          </Form.Select>
          <h2>Qiyinlik darajasi</h2>
          <Form.Select
            className="mb-3"
            onChange={(e) => setDegree(e.target.value)}
            aria-label="Default select example">
            <option value="1">Oson</option>
            <option value="2">O'rtacha</option>
            <option value="3">Qiyin</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nomi</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Frontend (2021)"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Izoh</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Yes, we will create our own ui kit in Figma. "
            />
          </Form.Group>
          <div className="modal-btns">
            <Button className="close-btn me-4" onClick={handleClose}>
              Bekor qilish
            </Button>
            <Button type="submit" className="save-btn" onClick={handleClose}>
              Saqlash
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal show={showdelete} onHide={handleCloseDelete}>
        <h2>Kursni o’chirish</h2>
        <p>Siz rostdan ham ushbu video-darsni o’chirmoqchimisiz?</p>
        <Form onSubmit={removeCourse}>
          <div className="modal-btns">
            <Button className="close-btn me-4" onClick={handleCloseDelete}>
              Bekor qilish
            </Button>
            <Button variant="danger" type="submit">
              <img src={DeleteBtn} alt="" /> O’chirish
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal show={categoryShow} onHide={handleCloseCategory}>
        <h2>Category qo'shish</h2>
        <Form onSubmit={AddCategory}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Havola</Form.Label>
            <Form.Control
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Category"
            />
          </Form.Group>
          <div className="modal-btns">
            <Button className="close-btn me-4" onClick={handleClose}>
              Bekor qilish
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Saqlash
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal show={caregoryDelete} onHide={handleCloseCategoryDelete}>
        <h2>Kursni o’chirish</h2>
        <p>Siz rostdan ham ushbu categoryni o’chirmoqchimisiz?</p>
        <Form onSubmit={removeCategory}>
          <div className="modal-btns">
            <Button
              className="close-btn me-4"
              onClick={handleCloseCategoryDelete}>
              Bekor qilish
            </Button>
            <Button variant="danger" type="submit">
              <img src={DeleteBtn} alt="" /> O’chirish
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default Videos;
