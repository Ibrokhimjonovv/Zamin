import { Modal } from 'react-bootstrap'
import DeleteBtn from '../../assets/images/delete.svg'
import { useUserContext } from '../../contexts/users-context'
import './dashboard-video.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
const DashboardVideoCardCreative = ({ data }) => {
    const { handleShowDelete, setCourseByIdCreative, token } = useUserContext()
    const pathname = "https://bk.zamineducation.uz/"

    const getYoutubeVideoId = (url) => {
        if (data?.youTubePlaylistLink) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^\\?]*).*/;
            const match = url.match(regExp);
            return match && match[2].length === 11 ? match[2] : null;
        }
    };
    const navigate = useNavigate()
    return (
        <>
            <Link to={`/creative/videos/${data.id}`}>
                <div className="dashboard-video-card load-anim">
                    <div className="img">
                        <img width={'260px'} height={"160px"} src={pathname + data?.image?.path} alt="" />
                    </div>
                    <div className="titles-videos">
                        <div className="name">
                            <h2>{data?.name}</h2>
                            {
                                token &&
                                <button onClick={handleShowDelete}><img onClick={() => setCourseByIdCreative(data?.id)} src={DeleteBtn} alt="" /></button>
                            }
                        </div>
                        <p>{data?.description}</p>
                        <button onClick={() => navigate(`/creative/videos/${data.id}`)} className='more'>Batafsil</button>
                    </div>
                </div>
            </Link>
            {/* <Modal show={categoryShow} onHide={handleCloseCategory}>
                <div className="youtube-container">
                    <iframe
                        width={"100%"}
                        height={"400"}
                        allowFullScreen
                        title="Raqamli Avlod video dars"
                        className="youtube-player"
                        type="text/html"
                        src={`${videoSrc}${videoId}`}
                        frameBorder="0"
                    />
                </div>
            </Modal> */}
        </>


    )
}
export default DashboardVideoCardCreative