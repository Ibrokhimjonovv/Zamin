import EcoImg from "../assets/Rectangle 5.png";
import "./inner.scss";
import { creativenews } from "../data/data";
import { useParams } from "react-router";
import { GetDataCreative } from "../hooks/fetch-creative";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/users-context";
import { GetData, URL } from "../hooks/fetchdata";
const CreativeInner = () => {
  const { cid } = useParams();
  const [news, setNews] = useState();
  const imgPath = URL;

  const { token } = useUserContext();
  const GetNews = () => {
    GetDataCreative(`/api/news/${cid}`)
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.error(err));
  };
  const [galleryCreative, setGalleryCreative] = useState();

  useEffect(() => {
    GetNews();
  }, []);
  useEffect(() => {
    if (cid) {
      GetDataCreative(`/api/gallery/${cid}`, token)
        .then((data) => {
          setGalleryCreative(data);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);
  return (
    <div className="container">
      <div className="eco-inner ">
        <h2>{news?.title}</h2>
        <img src={imgPath + news?.banner?.path} alt="" />
        <p className="description">{news?.description.split("—")[0]}</p>
        <br />
        <p className="description">{news?.description.split("—")[1]}</p>
        <div className="images">
          {news?.galleries?.map((i, k) => (
            <img src={imgPath + i?.attachment?.path} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CreativeInner;
