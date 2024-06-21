import React from "react";

const SecondSection = ({ img, title, heading }) => {
    return (
        <section className="firsec secondsec">
            <div className="firsec__right">
                <img src={img} />
            </div>

            <div className="firsec__left sec">
                <h3 className="section-title">{heading}</h3>
                <p className="section-desc">{title}</p>
                <div className="firsec__left--buttons">
                    {/* <Button className="primary-button w-25"
						type={"info"}
						to="/"
						htmlType={"button"}
						size={"md"}
						borderRadius={10}>
						Batafsil
					</Button> */}
                </div>
            </div>
        </section>
    );
};

export default SecondSection;
