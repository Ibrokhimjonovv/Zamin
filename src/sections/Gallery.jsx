import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Gallery = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (title) => {
    setActive(title);
    setShow(true);
  };
  const [active, setActive] = useState();
  return (
    <div className="gallery">
      <h3 className="section-title">Foto Galereya</h3>
      <p className="section-desc">
        Bizning kundalik faoliyatlarimiz haqida ushbu media bilan tanishing
      </p>
      <div className="grid">
        <div className="grid-wrapper grid-wrapper__1">
          <div className="grid-item">
            <img
              onClick={() => handleShow(1)}
              src={require("../assets/images/gallery/2.png")}
              alt=""
            />
          </div>
          <div className="grid-item">
            <img
              onClick={() => handleShow(2)}
              src={require("../assets/images/gallery/3.png")}
              alt=""
            />
          </div>
        </div>
        <div className="grid-wrapper grid-wrapper__2">
          <div className="grid-item">
            <img
              onClick={() => handleShow(3)}
              src={require("../assets/images/gallery/4.png")}
              alt=""
            />
          </div>
          <div className="grid-item">
            <img
              onClick={() => handleShow(4)}
              src={require("../assets/images/gallery/1.png")}
              alt=""
            />
          </div>
        </div>
        <div className="grid-wrapper grid-wrapper__3">
          <div className="grid-item">
            <img
              onClick={() => handleShow(5)}
              src={require("../assets/images/gallery/6.png")}
              alt=""
            />
          </div>
          <div className="grid-item">
            <img
              onClick={() => handleShow(6)}
              src={require("../assets/images/gallery/5.png")}
              alt=""
            />
          </div>
        </div>
      </div>
      <Modal className=" modal-lg" show={show} onHide={handleClose}>
        <Modal.Body
          style={{
            padding: "0",
          }}>
          <>
            {active === 1 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/2.png")}
                alt=""
              />
            )}
            {active === 2 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/3.png")}
                alt=""
              />
            )}
            {active === 3 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/4.png")}
                alt=""
              />
            )}
            {active === 4 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/1.png")}
                alt=""
              />
            )}
            {active === 5 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/6.png")}
                alt=""
              />
            )}
            {active === 6 && (
              <img
                style={{
                  width: "100%",
                }}
                src={require("../assets/images/gallery/5.png")}
                alt=""
              />
            )}
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
