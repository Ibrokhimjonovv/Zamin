import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useUserContext } from "../contexts/users-context";
import { GetData } from "../hooks/fetchdata";
import YoutubeCard from "../components/youtube-card";
import Spinner from "../components/loading/loading";
import { GetDataCreative } from "../hooks/fetch-creative";
import SecondSection from "../sections/SecondSection";

const HomeCreativeVideosInner = () => {
  const { creativeVideoId } = useParams();
  const [videos, setVideos] = useState();
  const { token, setLoading, loading } = useUserContext();
  const GetVideos = () => {
    setLoading(true);
    GetDataCreative(`/api/course/${creativeVideoId}`, token)
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    GetVideos();
  }, [token]);
  return (
    <>
      {loading && (
        <>
          <Spinner />
          <div
            style={{
              height: "100vh",
            }}></div>
        </>
      )}
      <div className="container videos load-anim">
        {videos?.videos?.map((item, key) => (
          <div className="videos-card mb-3">
            <YoutubeCard data={item} />
          </div>
        ))}
      </div>
    </>
  );
};
export default HomeCreativeVideosInner;
