import { Route, Routes } from "react-router";
import Home from "../pages/home";
import ZaminEco from "../pages/zamineco";
import Header from "../components/header/header";
import Videos from "../pages/videos";
import HomeVideos from "../pages/home-videos";
import HomeVideosInner from "../pages/home-videos-inner";
import Footer from "../components/footer/footer";
import HomeCreativeVideosInner from "../pages/home-creative-course";
import CreativeVideos from "../pages/creative-videos";
import HeaderCreative from "../components/header/creative-header";
import EcoInner from "../pages/eco-inner";
import CreativeInner from "../pages/creative-inner";

const HomeLayout = () => {
  return (
    <>
      {window.location.pathname.includes("/creative") ? (
        <HeaderCreative />
      ) : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eco" element={<ZaminEco />} />
        <Route path="/videos" element={<HomeVideos />} />
        <Route path="/creative/videos" element={<CreativeVideos />} />
        <Route path="/eco/inner/:id" element={<EcoInner />} />
        <Route path="/creative/inner/:cid" element={<CreativeInner />} />
        <Route path="/videos/:videoId" element={<HomeVideosInner />} />
        <Route
          path="/creative/videos/:creativeVideoId"
          element={<HomeCreativeVideosInner />}
        />
      </Routes>
      <Footer />
    </>
  );
};
export default HomeLayout;
