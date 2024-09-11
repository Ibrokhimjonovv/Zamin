import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./dashboard-video.scss";

// Images
import starIcon from '../../assets/images/star.png';
import emptyStarIcon from '../../assets/images/emptyStar.png';
import DeleteBtn from "../../assets/images/delete.svg";
import { useUserContext } from "../../contexts/users-context";

const DashboardVideoCard = ({ data }) => {
    const { handleShowDelete, setDeleteId, token } = useUserContext();
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        if (token) {
            setDeleteId(data.id);
            handleShowDelete();
        }
    };

    return (
        <Link to={`/videos/${data.id}`}>
            <div className="dashboard-video-card load-anim">
                <div className="img">
                    <img
                        width={"260px"}
                        height={"160px"}
                        src={data?.image}
                        alt=""
                    />
                </div>
                <div className="titles-videos">
                    <div className="stars">
                        <img src={starIcon} alt="star" />
                        <img src={starIcon} alt="star" />
                        <img src={starIcon} alt="star" />
                        <img src={emptyStarIcon} alt="empty star" />
                    </div>
                    <div className="name">
                        <h2>{data?.title}</h2>
                        {token && (
                            <button onClick={handleDeleteClick} className="delete-btn">
                                <img src={DeleteBtn} alt="delete" />
                            </button>
                        )}
                    </div>
                    <p>{data?.description}</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/videos/${data.id}`);
                        }}
                        className="more"
                    >
                        Ro'yxatdan o'tish
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default DashboardVideoCard;
