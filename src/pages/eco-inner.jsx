import "./inner.scss";
import { useParams } from "react-router";
import { useUserContext } from "../contexts/users-context";
import { useEffect, useState } from "react";
import { GetData } from "../hooks/fetchdata";
import { URL } from '../hooks/fetchdata';


const EcoInner = () => {
  const [econews, setEcoNews] = useState();

  const { token } = useUserContext();
  const { id } = useParams();
  const [galleryEco, setGalleryEco] = useState();
  const GetNewsEco = () => {
    if (id) {
      fetch(`${ URL }/api/news/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          setEcoNews(data);
        })
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    GetNewsEco();
  }, []);
  useEffect(() => {
    if (id) {
      GetData(`/api/gallery/${id}`, token)
        .then((data) => {
          setGalleryEco(data);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);
  return (
    <div className="container">
      <div className="eco-inner ">
        <h2>{econews?.title}</h2>
        <img src={econews?.thumb} alt="" />

        <p className="description">{econews?.description.split("__")[0]}</p>
        <br />
        <p className="description">{econews?.description.split("__")[1]}</p>
        <div className="images">
        </div>
      </div>
    </div>
  );
};
export default EcoInner;
