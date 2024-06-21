import DashboardVideoCardCreative from "../components/dashboard-video/dashboard-creative-card";
import DashboardVideoCard from "../components/dashboard-video/dashboard-video-card";
import { useUserContext } from "../contexts/users-context";
import Carousel from "react-bootstrap/Carousel";
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";
import Rasm from "../assets/images/collage.png";
import slide1 from "../assets/images/slide1.png";
import slide2 from "../assets/images/slide2.png";
import slide3 from "../assets/images/slide3.png";
import slide4 from "../assets/images/slide4.png";
import "./home.scss";
import Gallery from "../sections/Gallery";
import GalleryCreative from "../sections/creative-gallery";
import { GetDataCreative } from "../hooks/fetch-creative";
import { useEffect, useState } from "react";
import { creativenews } from "../data/data";
import NewsCard from "../components/news-card/news-card";
import NewsCardCreative from "../components/news-card/creative-new";
const CreativeVideos = () => {
    const { courseCreative, setCourseByIdCreative } = useUserContext();
    const [categorysCreative, setCategorysCreative] = useState();
    const [active, setActive] = useState("barchasi");
    const [news, setNews] = useState();

    const CourseById = (id, name) => {
        setCourseByIdCreative(id);
        setActive(name);
    };
    const ActiveHnadler = () => {
        setActive("barchasi");
        setCourseByIdCreative(0);
    };
    const title = `“Zamin Creative” loyihasining muhim vazifasi — har bir inson o‘zaro muloqot qilish, ijodiy ko‘nikma va yangi kasblarni egallashi mumkin bo‘lgan inklyuziv muhit yaratishdan iborat.`;
    const GetCategory = () => {
        GetDataCreative(`/api/category/`)
            .then((data) => {
                setCategorysCreative(data);
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
        GetCategory();
        GetNews();
    }, []);
    return (
        <>
            <div className="container">
                <div className="d-flex">
                    <section className="slider container mb-3 firsec secondsec">
                        <Carousel>
                            <Carousel.Item className="slide">
                                <img
                                    className="d-block w-100"
                                    src={slide1}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item className="slide">
                                <img
                                    className="d-block w-100"
                                    src={slide2}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item className="slide">
                                <img
                                    className="d-block w-100"
                                    src={slide3}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item className="slide">
                                <img
                                    className="d-block w-100"
                                    src={slide4}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </section>
                    <div
                        className="firsec__left sec"
                        style={{
                            marginTop: "100px",
                            marginLeft: "30px",
                        }}
                    >
                        <h3 className="section-title">Zamin Creative haqida</h3>
                        <p className="section-desc">
                            O‘zbekiston yoshlarining salohiyatini aniqlash va
                            rivojlantirish uchun ijod maktablari qoshida
                            inklyuziv ijod studiyalarini tashkil etish. Loyiha
                            maqsadi – barcha xohlovchilar hamkorlikda ishlab,
                            ijodiy ko‘nikmalar va yangi kasblarni egallaydigan
                            inklyuziv muhitni yaratish.
                            <br />
                            <br />
                            Loyiha Qarshi shahrida boshlandi, so‘ng "Zamin
                            Creative" ijod studiyalari Toshkent, Andijon va
                            Nukusda ochildi. Ijod studiyalari "Aktyorlik
                            mahorati", "Dizayn", "Media" yo‘nalishlarida
                            ochilgan. Loyihaga O‘zbekistonning taniqli dizayner
                            va fotosuratchilari, xizmat ko‘rsatgan artistlari
                            jalb qilinmoqda.
                        </p>
                        <div className="firsec__left--buttons">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2
                    className="mb-5"
                    style={{
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    Video kurslar
                </h2>
            </div>
            <div className="video container load-anim mb-5">
                <div className="category-sidebar">
                    <div
                        onClick={ActiveHnadler}
                        className={
                            active === "barchasi"
                                ? "category-card active"
                                : "category-card"
                        }
                    >
                        <button>Barchasi</button>
                    </div>
                    {categorysCreative ? (
                        categorysCreative?.map((item, key) => (
                            <div
                                onClick={() => CourseById(item.id, item.name)}
                                className={
                                    active === item?.name
                                        ? "category-card active"
                                        : "category-card"
                                }
                            >
                                <button>{item?.name}</button>
                            </div>
                        ))
                    ) : (
                        <>
                            <span>hozcha yoq</span>
                        </>
                    )}
                </div>
                <div className="videos">
                    {courseCreative ? (
                        courseCreative?.map((item, key) => (
                            <DashboardVideoCardCreative data={item} />
                        ))
                    ) : (
                        <>
                            <h2>hozcha yoq</h2>
                        </>
                    )}
                </div>
            </div>
            <div className="container">
                <div className="news-creative">
                    {news?.map((i, k) => (
                        <NewsCardCreative data={i} />
                    ))}
                </div>
                <GalleryCreative />
            </div>
        </>
    );
};
export default CreativeVideos;
