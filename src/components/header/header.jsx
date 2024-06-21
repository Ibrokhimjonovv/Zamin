import { Link } from "react-router-dom";
import Logo from "../../assets/images/log.png";
import "./header.scss";
import { useState, useEffect } from "react"

const Header = () => {
    const location = window.location.pathname;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('accessToken');
        if (userToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        // Logout funksiyasini bu yerda amalga oshiring
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <div className="header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo w-25">
                    <Link to="/">
                        <img width={200} src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links d-flex w-75">
                    <div className="pages">
                        <Link
                            className={location === "/" ? "active" : ""}
                            to="/"
                        >
                            Bosh sahifa
                        </Link>
                        <Link
                            className={location === "/videos" ? "active" : ""}
                            to="/videos"
                        >
                            Kurslar
                        </Link>
                        {/* <Link className={location === "#/creative/videos" ? "active" : ''} to='/creative/videos'>Creative</Link> */}
                    </div>
                    <div className="login">
                        
                        {!isAuthenticated && <Link to="/login">Kirish</Link>}
                        {isAuthenticated ? (
                            <Link className="signup" to="/" onClick={handleLogout}>
                                Chiqish
                            </Link>
                        ) : (
                            <Link className="signup" to="/signup">
                                Ro’yxatdan o’tish
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;
