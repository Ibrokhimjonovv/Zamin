import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalVideo from "react-modal-video";

const FirstSection = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	return (
		<section className="firsec first-order">
			<div className="firsec__left">
				<h3 className="section-title">
					Zamin Ta’lim platformasi orqali kelajak kasbini o’rganing!
				</h3>
				<p className="section-desc">
					Biz sizga eng yuqori darajadagi kasblarni zamonaviy metodika
					asosida o’rgatamiz va o’z sohangiz mutaxassisi
					bo’lishingizga ko’maklashamiz
				</p>
				<div className="firsec__left--buttons">
					<button className="primary-button"
						type={"info"}
					>
						Bizning kurslar
					</button>
					<div className="firsec__left--videobtn">
						<img
							src={require("../assets/images/icons/video-play.svg")}
							alt=""
							onClick={openModal}
						/>
						<span onClick={openModal}>Video</span>
						<ModalVideo
							channel="youtube"
							isOpen={isOpen}
							videoId="BKdrYOXwBDY"
							onClose={() => setIsOpen(false)}
						/>
					</div>
				</div>
			</div>

			<div className="firsec__right">
				<img
					src={require("../assets/images/icons/first-section-right.svg")}
					alt=""
				/>
			</div>
		</section>
	);
};

export default FirstSection;
