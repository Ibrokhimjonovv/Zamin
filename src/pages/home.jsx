import "swiper/css";
import "swiper/css/pagination";
import "./home.scss";
import "./zamineco.scss";
import ZaminImg from "../assets/images/logo12.png";
import ZaminImg2 from "../assets/images/creativ.png";
import ZaminImg3 from "../assets/images/log.png";
import Card from "../components/card/card";
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";
import Gallery from "../sections/Gallery";
import Rasm from "../assets/images/icons/second-section-left.svg";


const images = [
  {
    img: ZaminImg,
    link: "/eco",
    text: "ZaminEco loyihasi doirasida o’tkazilayotgan tadbirlar haqida ma’lumot hamda eco hamjamiyatiga a’zo bo’lish imkoniyati taqdim etiladi.",
  },
  {
    img: ZaminImg2,
    link: "/creative/videos",
    text: "ZaminCreative loyihasi doirasida tayyorlangan inklyuziv  dizayn, media, aktyirlik mahorati kabi yo’nalishlarni o’rganishingiz mumkin O’quv kurslar tajribali mentorlar tomonidan o’tiladi",
  },
  {
    img: ZaminImg3,
    link: "/videos",
    text: "Biz sizga eng yuqori darajadagi kasblarni zamonaviy  metodika asosida o’rgatamiz va o’z sohangiz mutaxassisi bo’lishingizga ko’maklashamiz",
  },
];
const title = `“Zamin Education” loyihasining ilk sinov-tajriba o‘quv
jarayoni Muhammad Al-Xorazmiy nomidagi
axborot-texnologiyalarini chuqurlashtirib o‘rgatishga
ixtisoslashgan maktabda amalga oshirilmoqda.`;

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-inner">
          <div className="cards-sections">
            {images.map((item, key) => (
              <Card img={item} />
            ))}
          </div>
        </div>
        <div className="home">
          <SecondSection
            heading={"Zamin Education haqida qisqacha"}
            title={title}
            img={Rasm}
          />
          <ThirdSection />
          <Gallery />
        </div>
      </div>
    </>
  );
};
export default Home;
