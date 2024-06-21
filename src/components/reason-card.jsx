import React from "react";
import messageIcon from "../assets/images/icons/chat.png";
import galleryIcon from "../assets/images/icons/desctop.png";
import todoIcon from "../assets/images/icons/certificate.png";
import robotIcon from "../assets/images/icons/bot.png";

const ReasonCard = ({ title, desc, index }) => {
    const image = [messageIcon, galleryIcon, todoIcon, robotIcon];
    return (
        <div className="reasoncard">
            <div className={`reasoncard__img box-${index}`}>
            </div>
            <div className="reasoncard__content">
                <h3 className="reasoncard__content--title">{title}</h3>
                <p className="reasoncard__content--desc">{desc}</p>
            </div>
        </div>
    );
};

export default ReasonCard;
