import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
// import "swiper/components/pagination/pagination.scss";

import pdp from "../assets/images/partners/pdp.png";
import sde from "../assets/images/partners/sde.png";
import najotTalim from "../assets/images/partners/najot-talim.png";
import mitc from "../assets/images/partners/mitc.png";
import dgu from "../assets/images/partners/dgu.png";
import PartnersCard from "../components/partners-card/partners-card";

const Partners = () => {
	const data = [pdp, sde, najotTalim, mitc, dgu, pdp, sde];
	SwiperCore.use([Pagination]);
	// const [controlledSwiper, setControlledSwiper] = React.useState(null);
	return (
		<div className="partner">
			<div className="partner-title">
				<div className="section-title">
					Biz bilan hamkor bo’lgan tashkilotlar bilan tanishing!
				</div>
				<div className="section-desc">
					Biz mamlakatimizdagi eng nufuzli tashkilotlar bilan
					birgalikda hamkorlik qilamiz va ularga ishonamiz. Siz ham
					bizning safimizga qo’shilishingiz mumkin. Imkoniyatlardan
					foydalaning
				</div>
			</div>
			<Swiper
				pagination={{ clickable: true }}
				spaceBetween={2}
				slidesPerView={2}
				speed={1000}
				breakpoints={{
					0: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					},
					992: {
						slidesPerView: 4
					},
					1200: {
						slidesPerView: 5
					}
				}}>
				{data.map((l, key) => {
					return (
						<SwiperSlide>
							<PartnersCard image={l} key={key} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Partners;
