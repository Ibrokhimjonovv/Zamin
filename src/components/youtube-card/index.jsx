import DeleteBtn from "../../assets/images/delete.svg";
import { useUserContext } from "../../contexts/users-context";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Modal from "@mui/material/Modal";
import HomeVideosInner from "../../pages/home-videos-inner";


const YoutubeCard = ({ data }) => {
  const { handleShowDelete, setDeleteId } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const handleCloseCategory = () => setCategoryShow(false);
  const handleShowCategory = () => setCategoryShow(true);

  return (
    <>
      <div className="dashboard-video-card">
        <div onClick={handleOpen} className="img">
          {/* <img width={"260px"} height={"160px"} src={data.thumb_image} alt="" /> */}
          <HomeVideosInner data={data?.title} />
        </div>
        <div className="titles-videos">
          <div className="name">
            <h2>{data?.title}</h2>
            {/* <button onClick={handleShowDelete}><img onClick={() => setDeleteId(data?.id)} src={DeleteBtn} alt="" /></button> */}
          </div>
          {/* <p>{data?.description}</p> */}
          {/* <button onClick={() => navigate(`/videos/${data.id}`)} className='more'>Batafsil</button> */}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="youtube-container">
          {/* <img src={  } alt="" width="100%"/> */}
          
          { data?.video_link }
          </div>
      </Modal>
    </>
  );
};
export default YoutubeCard;
