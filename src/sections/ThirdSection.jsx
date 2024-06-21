import React from "react";
import ReasonCard from "../components/reason-card";

const ThirdSection = () => {
	const data = [
		{
			title: "Surdo tarjimon ishtirokidagi AKT darslari",
			desc:
				"Surdo tiliga tarjima qilingan sifatli darslarimiz yordamida o'z bilimingizni oshirib boring!"
		},
		{
			title: "Sertifikat olish imkoniyatining mavjudligi",
			desc:
				"Surdo tiliga tarjima qilingan sifatli darslarimiz yordamida o'z bilimingizni oshirib boring!"
		},
		{
			title: "Istalgan joydan va istalgan vaqtda o’rganish imkoniyati",
			desc:
				"Platforma istalgan vaqtda yangi davr kasblarini oson o'rganish imkonini beradi."
		},
		{
			title: "Barcha qurilgalardan foydalanib bilim oling",
			desc:
				"Bizning platformaga telefon, planshet, kompyuterlar orqali kira olasiz"
		}
	];

	return (
		<section className="thirdsec">
			<div className="thirdsec__title">
				<h3 className="section-title">Nima uchun Zamin Ta’lim</h3>
				<div className="section-desc">
					Sizda ham shu fikr paydo bo’ldimi? Hozir sizga qisqacha
					tushuntiramiz
				</div>
			</div>
			<div className="thirdsec__content">
				<div className="thirdsec__content--left">
					{data.slice(2).map((l, key) => (
						<ReasonCard {...l} key={key} index={key} />
					))}
				</div>
				<div className="thirdsec__content--middle">
					<img
						src={require("../assets/images/third-section-boy.png")}
						alt=""
					/>
				</div>
				<div className="thirdsec__content--right">
					{data.slice(2, 4).map((l, key) => (
						<ReasonCard {...l} key={key} index={key + 2} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ThirdSection;
