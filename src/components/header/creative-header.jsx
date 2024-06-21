import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import Logo2 from "../../assets/images/new-logo.png";
import Logo3 from "../../assets/images/creativ.png";
import "./header.scss";
const HeaderCreative = () => {
  const location = window.location.pathname;
  console.log(location);
  return (
    <div className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo w-25">
          <Link to="/">
            <img width={100} src={Logo3} alt="" />
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
            <Link className={location === "/eco" ? "active" : ""} to="/eco">
              Zamin Eco
            </Link>
          </div>
          <div className="login">
            {/* <Link to='/login'>Kirish</Link>
                        <Link className='signup' to='/signup'>Ro’yxatdan o’tish</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderCreative;
