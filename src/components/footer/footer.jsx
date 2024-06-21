import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
import Facebook from "../../assets/images/icons/facebook.svg";
import Instagram from "../../assets/images/icons/instagram.svg";
import Telegram from "../../assets/images/icons/telegram.svg";
import Youtube from "../../assets/images/icons/youtube.svg";
import Logo from "../../assets/images/Zaminlog.png";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="container">
                <div className="footer">
                    <div className="footer-images">
                        <Link
                            className="footer__brand"
                            target="_blank"
                            to="https://uzedu.uz"
                        >
                            <img
                                width={200}
                                height={100}
                                src={require("../../assets/images/logoSecondary.png")}
                                alt=""
                            />
                        </Link>
                        <Link
                            className="footer__brand"
                            target="_blank"
                            to="https://zaminfoundation.ngo"
                        >
                            <img width={200} height={100} src={Logo} alt="" />
                        </Link>
                        <Link className="footer__brand" to="#">
                            <img
                                width={200}
                                height={100}
                                src={require("../../assets/footer2.png")}
                                alt=""
                            />
                        </Link>
                    </div>
                    <a
                        href="mailto:info@digitalgeneration.uz"
                        className="footer__helplines"
                    >
                        Email: info@digitalgeneration.uz
                    </a>
                    <div className="footer__socials">
                        <div>
                            <a
                                href="https://www.facebook.com/zaminfoundation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    width={200}
                                    height={100}
                                    src={Facebook}
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/zaminfoundation/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    width={200}
                                    height={100}
                                    src={Instagram}
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://t.me/zaminfoundation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    width={200}
                                    height={100}
                                    src={Telegram}
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/@zaminfoundation5308"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    width={200}
                                    height={100}
                                    src={Youtube}
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>

                    <div className="footer__rights">
                        © 2023. Barcha huquqlar himoyalangan.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
