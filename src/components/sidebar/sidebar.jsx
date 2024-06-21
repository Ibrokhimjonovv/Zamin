import { Link, useNavigate } from "react-router-dom"
import Logo from '../../assets/images/logo-dashboard.svg'
import './sidebar.scss'
import HomeIcon from '../../assets/images/home.svg'
import VideIcon from '../../assets/images/video-recorder.svg'
import TestsIcon from '../../assets/images/file.svg'
import News from '../../assets/images/newspaper.svg'
import classNames from 'classnames'
import { useEffect, useState } from "react"
const Sidebar = () => {
    const location = window.location.pathname
    const [classname, setClassname] = useState('')
    const navigate = useNavigate()
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">
                    <div onClick={() => navigate('/dashboard/home')} className={
                        classNames('sidebar-link', {
                            active: location.includes("/home"),
                        })}
                    ><img src={HomeIcon} alt="" /> Dashboard</div>
                    <div
                        onClick={() => navigate('/dashboard/videos')}
                        className={
                            classNames('sidebar-link', {
                                active: location.includes('/dashboard/videos'),
                            })}
                    ><img src={VideIcon} alt="" /> Video-darslar</div>
                    <divi
                        onClick={() => navigate('/dashboard/tests')}
                        className={
                            classNames('sidebar-link', {
                                active: location.includes('/tests'),
                            })}
                    ><img src={TestsIcon} alt="" /> Testlar</divi>
                    <div
                        onClick={() => navigate('/dashboard/creative')}
                        className={
                            classNames('sidebar-link', {
                                active: location.includes('/creative'),
                            })}
                    ><img src={VideIcon} alt="" /> Creative video-darslar</div>
                    <div
                        onClick={() => navigate('/dashboard/news')}
                        className={
                            classNames('sidebar-link', {
                                active: location.includes('/news'),
                            })}
                    ><img width={25} height={25} style={{
                        color: "white"
                    }} src={News} alt="" /> Creative News</div>
                    <div
                        onClick={() => navigate('/dashboard/eco/new')}
                        className={
                            classNames('sidebar-link', {
                                active: location.includes('/eco/new'),
                            })}
                    ><img width={25} height={25} src={News} alt="" />Eco News</div>
                </div>
            </div>
        </>
    )
}
export default Sidebar