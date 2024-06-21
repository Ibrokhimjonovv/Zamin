import CardImg from '../../assets/images/video.png'
import './video-card.scss'

const VideoCard = () => {
    return (
        <>
            <div className="video-card">
                <div className="imgs">
                    <img src={CardImg} alt="" />
                </div>
                <div className="titles">
                    <h2 className='mb-2'>Iqlim o’zgardi biz ham o’zgarishimiz shart</h2>
                    <p className='mb-2'>“Zamin” fondi va YUNISЕF tomonidan Butunjahon bolalar kuniga bag‘ishlab gibrid formatda “Bolalarning sog‘lom atrof-muhitga bo‘lgan huquqlarini ta’minlash” mavzusida xalqaro forum o‘tkazildi.</p>
                    <button>Batafsil</button>
                </div>
            </div>
        </>
    )
}
export default VideoCard