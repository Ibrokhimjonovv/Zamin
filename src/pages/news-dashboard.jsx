import { useEffect, useState } from "react";
import { GetDataCreative } from "../hooks/fetch-creative";
import NewsCardCreative from "../components/news-card/creative-new";
import { Button, Form, Modal } from "react-bootstrap";
import { useUserContext } from "../contexts/users-context";
import { useNavigate } from "react-router";
import { URL } from '../hooks/fetchdata';


import "./videos.scss";
const NewsDashboard = () => {
  const [show, setShow] = useState(false);
  const { token, loading, news, setLoading, GetNews } = useUserContext();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const ImageUploader = (e) => {
    if (e.target.files) {
      const files = e.target.files[0];
      setImg(files);
      // formData.append('image', files)
    }
  };
  const sendFileHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("formFile", img);
    formData.append("Title", title);
    formData.append("Description", description);
    fetch(`${ URL }/api/news-category/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 401) {
          navigate("/login");
        }
        if (response.status === 200) {
          GetNews();
          setShow(false);
          return response.json();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="dashboard-section load-anim">
        <Button
          style={{
            marginBottom: "20px",
          }}
          variant="dark"
          onClick={handleShow}>
          Yangilik qo'shish
        </Button>
        <div className="news-creative">
          {news?.map((i, k) => (
            <NewsCardCreative data={i} />
          ))}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form onSubmit={sendFileHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Description"
                />
              </Form.Group>

              <label className="image-cover" htmlFor="img">
                <input
                  multiple="multiple"
                  onChange={ImageUploader}
                  type="file"
                  name="img"
                  id="img"
                />
                <img src={Image} alt="" />
                <p>Yangilik uchun rasm</p>
              </label>
              <Button className="w-100" variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default NewsDashboard;
