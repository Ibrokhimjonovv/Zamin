import "./zamineco.scss";
import "./home.scss";
import NewsCard from "../components/news-card/news-card";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useUserContext } from "../contexts/users-context";
import { GetData, PostData } from "../hooks/fetchdata";
import Footer from "../components/footer/footer";
import Spinner from "../components/loading/loading";
import CountUp from "react-countup";
import { data, region } from "../data/data";
import Header from "../components/header/eco-heaeder";
import pdfFileUrl from "../assets/Eco_Tetrad_RU_Full.pdf";
import pdfFileUrl2 from "../assets/Eco_Tetrad_UZ_Full.pdf";

const ZaminEco = () => {
    const { token, setLoading, loading } = useUserContext();
    const [count, setCount] = useState();
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [middleName, setMiddleName] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [agree, setAgree] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState();
    const [cityId, setCityId] = useState();
    const [you, setYou] = useState();
    const [you2, setYou2] = useState();
    const [provinceId, setProvinceId] = useState();
    const [phone, setPhone] = useState();
    const [error, setError] = useState();


    const playerRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initializePlayer;

        return () => {
            delete window.onYouTubeIframeAPIReady;
        };
    }, []);

    const initializePlayer = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
            videoId: "mkd2UwrH6Y8",
            playerVars: {
                autoplay: 1,
                mute: 1,
                loop: 1,
                // modestbranding: 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };

    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
            event.target.seekTo(0);
            event.target.playVideo();
        }
    };
    const GetCount = () => {
        GetData(`/api/users/`, token)
            .then((data) => {
                setCount(data?.length);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        const GetCount = () => {
            GetData(`/api/users/`, token)
                .then((data) => {
                    setCount(data?.length);

                })
                .catch((err) => console.error(err));
        };
        GetCount();
    }, [token]);

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formattedDateOfBirth = formatDate(dateOfBirth);

            let city = region?.find((e) => e.id === cityId);
            let province = data?.find((e) => e.id === provinceId);

            // First, check if passwords match and handle the error
            if (password !== rePassword) {
                setError("Parollar mos emas");
                console.log(error);
                return; // Exit the function if passwords don't match
            }

            // Then, proceed with the PostData call
            await PostData(
                "/api/users/",
                {
                    first_name: firstName,
                    last_name: lastName,
                    father_name: middleName,
                    birth_date: formattedDateOfBirth,
                    city: city.name_uz,
                    province: province.name_uz,
                    phone_number: phone,
                    password: password,
                    user_type: you === "other" ? you2 : you,
                },
                token
            );
            setLoading(false);
            setOpen(true)
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    const { econews } = useUserContext();
    return (
        <div>
            {loading && <Spinner />}
            <div className="zamin-eco container">
                <Header></Header>
                <div className="eco-card">
                    <div className="carousel-inner-zamin">
                        <div className="titles">
                            <h3 style={{ fontSize: "60px" }}>
                                Ekofaollar soni:
                            </h3>
                        </div>
                        <div className="countup">
                            <CountUp
                                start={0}
                                duration={1}
                                className="countup-num"
                                end={count}
                            />
                        </div>
                    </div>
                </div>
                <div className="py-5 video-play">
                    <div
                        style={{ width: "100%", height: "662px" }}
                        id="youtube-player"
                    />
                </div>

                <div className="imessage">
                    <h2 className="mb-5">MEN - EKOFAOLMAN!</h2>
                </div>

                <div className="last-news my-5">
                    <h2 className="mb-5">Eko maktablar dasturi</h2>
                    <div className="">
                        <p>
                            <a href={pdfFileUrl} download>
                                📗 Rus tilida yuklab olish
                            </a>
                        </p>
                        <p>
                            <a href={pdfFileUrl2} download>
                                📗 O'zbek tilida yuklab olish
                            </a>
                        </p>
                    </div>
                </div>
                <div className="last-news my-5">
                    <h2 className="mb-5">So’nggi yangiliklar</h2>
                    <div className="cards">
                        {econews?.map((i, k) => <>
                            <NewsCard data={i} />
                        </>)}
                    </div>
                </div>
                <div className="registered m-0-auto">
                    <div className="d-flex align-items-center justify-content-center">
                    </div>
                    <div
                        id="form"
                        className=" align-items-center justify-content-center"
                    >
                        <h2 className="me-3  text-align-center">
                            Ro'yhatdan o'tish formasi
                        </h2>
                    </div>
                </div>

                {open ? (
                    <>
                        <div className="registered">
                            <h2
                                style={{
                                    fontSize: "40px",
                                    padding: "100px 0",
                                }}
                                className="mb-5"
                            >
                                Muvofaqqiiyatli ro'yhatdan o'tdingiz!
                            </h2>
                        </div>
                    </>
                ) : (
                    <Form style={{}} onSubmit={SubmitHandler}>
                        <div className="form-inputs">
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Ism</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Ism"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail2"
                            >
                                <Form.Label>Familiya</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Familiya"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail3"
                            >
                                <Form.Label>Otasini ismi</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Otasini ismi"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 date-input"
                                controlId="formBasicEmail4"
                            >
                                <Form.Label>Tug'ilgan kun</Form.Label>
                                {!dateOfBirth && (
                                    <div className="before">
                                        <Form.Label>Kun.Oy.Yil</Form.Label>
                                    </div>
                                )}
                                <Form.Control
                                    placeholder="Kun.Oy.Yil"
                                    onChange={(e) => {
                                        setDateOfBirth(e.target.value);
                                    }}
                                    type="date"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Label>Viloyat</Form.Label>
                                <Form.Select
                                    onChange={(e) => {
                                        setCityId(parseInt(e.target.value));
                                    }}
                                    className="mb-3"
                                    aria-label="Default select example"
                                >
                                    <option>Viloyat</option>
                                    {region?.map((e, k) => (
                                        <option value={e?.id}>
                                            {e?.name_uz}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox2"
                            >
                                <Form.Label>Shahar/Tuman</Form.Label>
                                <Form.Select
                                    onChange={(e) => {
                                        setProvinceId(parseInt(e.target.value));
                                    }}
                                    className="check"
                                    aria-label="Default select example"
                                >
                                    <option>Shahar</option>

                                    {data?.map((e) => (
                                        <>
                                            {e.region_id === cityId && (
                                                <option value={e?.id}>
                                                    {e?.name_uz}
                                                </option>
                                            )}
                                        </>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail5"
                            >
                                <Form.Label>Telefon raqami</Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tell"
                                    placeholder="+998 *******"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                {
                                    error ? (
                                        <Form.Label>Parollar mos emas</Form.Label>
                                    ) : (
                                        <Form.Label>Parol</Form.Label>
                                    )
                                }
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Parolni takrorlang</Form.Label>
                                <Form.Control
                                    onChange={(e) => setRePassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail6"
                            >
                                <Form.Label>Siz - ....</Form.Label>
                                {you !== "other" ? (
                                    <Form.Select
                                        onChange={(e) => setYou(e.target.value)}
                                        className="mb-3"
                                        aria-label="Default select example"
                                    >
                                        <option value={"teacher"}>
                                            O'quvchi
                                        </option>
                                        <option value={"student"}>
                                            Talaba
                                        </option>
                                        <option value={"jurnalist"}>
                                            Jurnalist
                                        </option>
                                        <option value={"ecofaol"}>
                                            Eco faol
                                        </option>
                                        <option value={"volantyor"}>
                                            Volontyor
                                        </option>
                                        <option value={"worker"}>
                                            Ishchi xodim
                                        </option>
                                        <option value={"other"}>Boshqa</option>
                                    </Form.Select>
                                ) : (
                                    <Form.Control
                                        required
                                        onChange={(e) =>
                                            setYou2(e.target.value)
                                        }
                                        type="text"
                                        placeholder="O'quvchi, Talaba, Ishchi xodim..."
                                    />
                                )}
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail6"
                            >
                                <Form.Label>
                                    Siz "Eco-schools Uzbekistan" tomonidan
                                    o‘tkazilayotgan ta’lim eko-oromgohlarida
                                    ishtirok etganmisiz?
                                </Form.Label>
                                <Form.Select
                                    onChange={(e) => setYou(e.target.value)}
                                    className="mb-3"
                                    aria-label="Default select example"
                                >
                                    <option value={"teacher"}>Ha</option>
                                    <option value={"student"}>Yo'q</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail6"
                            >
                                <Form.Label>
                                    Siz "Eco-schools Uzbekistan" tomonidan
                                    o‘tkazilayotgan ta’lim eko-oromgohlarida
                                    ishtirok etishni istaysizmi?
                                </Form.Label>
                                <Form.Select
                                    onChange={(e) => setAgree(e.target.value)}
                                    className="mb-3"
                                    aria-label="Default select example"
                                >
                                    <option value={"ha"}>Ha</option>
                                    <option value={"yoq"}>Yo'q</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                            }}
                            className="button"
                        >
                            <Button
                                style={{
                                    height: "52px",
                                    textAlign: "center",
                                }}
                                className=" mb-4"
                                variant="dark"
                                type="submit"
                            >
                                Ro'yxatdan o'tish
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
            <Footer />
        </div>
    );
};
export default ZaminEco;
