import { Link } from "react-router-dom";
import Logo2 from "../../assets/images/zamineco.png";
import "./header.scss";
const Header = () => {
  const location = window.location.pathname;
  return (
    <div className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo w-25">
          <Link to="/">
            <img width={100} height={100} className="img" src={Logo2} alt="" />
          </Link>
        </div>
        <div className="links d-flex w-75">
          <div className="pages">
            <Link className={location === "/" ? "active" : ""} to="/">
              Bosh sahifa
            </Link>
            <Link
              className={location === "/videos" ? "active" : ""}
              to="/videos">
              Zamin education
            </Link>
            <Link
              className={location === "/creative/videos" ? "active" : ""}
              to="/creative/videos">
              Zamin Creative
            </Link>
          </div>
          <div className="login">
            <>
              {/* <Link to='/login'>Kirish</Link> */}
              <a href="#form" className="signup">
                Ro’yxatdan o’tish
              </a>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
