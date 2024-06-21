import { Modal } from "react-bootstrap";
import DeleteBtn from "../../assets/images/delete.svg";
import { useUserContext } from "../../contexts/users-context";
import "./dashboard-video.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Images
import starIcon from '../../assets/images/star.png';
import emptyStarIcon from '../../assets/images/emptyStar.png';
import usersIcon from '../../assets/images/usersIcon.png';
import teacherIcon from '../../assets/images/teacher.png';
import penIcon from '../../assets/images/pen.png';

const DashboardVideoCard = ({ data }) => {
  const { handleShowDelete, setDeleteId, token } = useUserContext();

  const [ count, setCount ] = useState(0);

  const navigate = useNavigate();
  return (
    <>
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
              <img src={starIcon} alt="" />
              <img src={starIcon} alt="" />
              <img src={starIcon} alt="" />
              <img src={emptyStarIcon} alt="" />
            </div>
            <div className="name">
              <h2>{data?.title}</h2>
              {token && (
                <button onClick={handleShowDelete}>
                  <img
                    style={{"position": 'relative'}}
                    onClick={() => setDeleteId(data?.id)}
                    src={DeleteBtn}
                    alt=""
                  />
                </button>
              )}
            </div>
            <p>{data?.description}</p>
            <p>
              <img src={usersIcon} alt="" />
              125 ta foydalanuvchilar
            </p>
            <p>
              <img src={teacherIcon} alt="" />
              Mentor: Muhammadkarim T.
            </p>
            <button
              onClick={() => navigate(`/videos/${data.id}`)}
              className="more">
              <img src={penIcon} alt="" />
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DashboardVideoCard;
