import { Link, useNavigate } from "react-router-dom";
import NewsImg from "../../assets/images/news.png";
import "./news-card.scss";
import { useUserContext } from "../../contexts/users-context";
import { Button, Form, Modal } from "react-bootstrap";
import GalleryImg from "../../assets/images/gallery.png";
import { useState } from "react";
import { PostData } from "../../hooks/fetchdata";
import Spinner from "../loading/loading";
const NewsCard = ({ data }) => {
    const imgPath = "http://192.168.1.6:8000/api/news-category/news_image";
    const {
        token,
        loading,
        setLoading,
        GetNewsEco,
        galleryId,
        setGalleryId,
        GetGalleryIdEco,
    } = useUserContext();
    const [show, setShow] = useState(false);
    const [img, setImg] = useState();
    const [newsId, setNewsId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCourse = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://backend.zamineducation.uz/api/news/${data.id}`, {
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
                GetNewsEco();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const ImageUploader = (e) => {
        if (e.target.files) {
            const files = e.target.files[0];
            setImg(files);
            // formData.append('image', files)
        }
    };
    const navigateInner = (id) => {
        setGalleryId(id);
        navigate(`/eco/inner/${id}`);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const sendFileHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("formFile", img);
        fetch(`https://backend.zamineducation.uz/api/gallery/${newsId}`, {
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
                    handleClose();
                    GetNewsEco();
                    setShow(false);
                    return response.json();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const navigate = useNavigate();
    const location = window.location.pathname;

    return (
        <>
            <div className="news-card mb-2">
                <div>
                    <img src={data.image} alt="" />
                </div>
                <div className="titles">
                    <p>{data.title}</p>
                    {/* <p>{data.description}</p> */}
                    <div className="titles-buttons">
                        {/* <span>18.02.2021</span> */}
                        {token && (
                            <Button variant="dark" onClick={removeCourse}>
                                O'chirish
                            </Button>
                        )}
                        {token && (
                            <button
                                onClick={() =>
                                    // setShow(true)
                                    setNewsId(data.id)
                                }
                                className="gallery-img"
                            >
                                <img
                                    onClick={() => setShow(true)}
                                    width={25}
                                    height={25}
                                    src={GalleryImg}
                                    alt=""
                                />
                            </button>
                        )}
                        <button
                            onClick={() => navigateInner(data.id)}
                            className="about-button"
                        >
                            Batafsil
                        </button>
                    </div>
                </div>
            </div>
            {loading && (
                <>
                    <Spinner />
                    <div
                        style={{
                            height: "100vh",
                        }}
                    ></div>
                </>
            )}
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={sendFileHandler}>
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
                    <button
                        className="primary-button"
                        variant="primary"
                        type="submit"
                    >
                        Kirish
                    </button>
                </Form>
            </Modal>
        </>
    );
};
export default NewsCard;
