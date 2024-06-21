import { Link, useNavigate } from "react-router-dom";
import NewsImg from "../../assets/images/news.png";
import "./news-card.scss";
import { useUserContext } from "../../contexts/users-context";
import { Button, Form, Modal } from "react-bootstrap";
import GalleryImg from "../../assets/images/gallery.png";
import { useState } from "react";
import Spinner from "../loading/loading";
const NewsCardCreative = ({ data }) => {
    const imgPath = "https://bk.zamineducation.uz/";
    const { token, loading, setLoading, GetNews } = useUserContext();
    const removeCourse = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://bk.zamineducation.uz/api/news/${data.id}`, {
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
                GetNews();
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const navigate = useNavigate();
    const [galleryId, setGalleryId] = useState();
    const [show, setShow] = useState(false);
    const [img, setImg] = useState();
    const [newsId, setNewsId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ImageUploader = (e) => {
        if (e.target.files) {
            const files = e.target.files[0];
            setImg(files);
            // formData.append('image', files)
        }
    };
    const navigateInner = (id) => {
        setGalleryId(id);
        navigate(`/creative/inner/${id}`);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const sendFileHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("formFile", img);
        fetch(`https://bk.zamineducation.uz/api/gallery/${newsId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        })
            .then((response) => {
                setLoading(false);

                if (response.status === 200) {
                    handleClose();
                    // GetNewsEco()
                    setShow(false);
                    return response.json();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const location = window.location.pathname;
    return (
        <>
            <div>
                <div className="news-card mb-2">
                    {/* <img src={imgPath + data?.banner?.path} alt="" /> */}
                    <img src={data.thumb} alt="" />
                    <div className="titles">
                        <p>{data.title}</p>
                        {/* <p>{data.description}</p> */}
                        <div className="titles-buttons">
                            {/* <Link onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }} to={`/creative/inner/${data.id}`}>Batafsil</Link> */}
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
export default NewsCardCreative;
