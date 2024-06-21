import { useNavigate } from "react-router";
import "./card.scss";

const Card = ({ img }) => {
    const navigate = useNavigate();
    return (
        <>
            <div
                style={{
                    cursor: "pointer",
                }}
                onClick={() => navigate(img.link)}
                className="zamin-card"
            >
                <img
                    intrinsicsize="250 x 200"
                    width={186}
                    height={125}
                    src={img.img}
                    alt=""
                />
                <h2>{img.text}</h2>
                <button className="primary-button mb-3">Kirish</button>
                {/* <button className="about-button">Batafsil</button> */}
            </div>
        </>
    );
};
export default Card;
