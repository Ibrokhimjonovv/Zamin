import React, { useEffect, useState } from "react";
import questionImage from '../assets/images/questionImage.png';
import './tests.scss';
import Header from "../components/header/eco-heaeder";
import { URL } from '../hooks/fetchdata';
import { useParams } from "react-router-dom";

const Testing = () => {
  const { testId } = useParams(); // testId ni olamiz
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [time, setTime] = useState({ minutes: 1, seconds: 0 });
  const [isActive, setIsActive] = useState(true);
  const [choices, setChoices] = useState([]);
  const [results, setResults] = useState(false);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const totalSeconds = 1 * 60;

  const [ tt, setTt ] = useState(1);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${URL}/api/question/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sdata = data.filter(v => Number(v.test) === Number(testId));
        setQuestions(sdata);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [testId]);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await fetch(`${URL}/api/choice/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChoices(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChoices();
  }, []);

  useEffect(() => {
    let interval = 0;

    if (isActive && (time.minutes || time.seconds)) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;

          if (seconds === 0 || seconds === 1) {
            console.log(seconds, "Second")
            if (minutes === 0) {
              console.log(minutes, "minutes")
              clearInterval(interval);
              setIsActive(false);
              setResults(true);
              console.log("Time over")
              setCurrentQuestionIndex(null)
              return prevTime;
            } else {
              return { minutes: minutes - 1, seconds: 59 };
            }
          } else {
            return { ...prevTime, seconds: seconds - 1 };
          }
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleOptionChange = (key) => {
    setSelectedOption(key);
  };

  const calculateProgress = () => {
    const elapsedSeconds = totalSeconds - (time.minutes * 60 + time.seconds);
    return (elapsedSeconds / totalSeconds) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const currentChoices = choices.filter(choice => choice.question === currentQuestion?.id);
    const selectedChoice = currentChoices[selectedOption];

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedChoice,
        isCorrect: selectedChoice.is_correct,
      },
    }));

    setSelectedOption(null);

    if (tt < questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else if(tt === questions.length){
      setResults(true);
      setIsActive(false);
      console.log("Working")
      setCurrentQuestionIndex(null)
    }
    
    // tt ni har doim 1dan oshirib boramiz
    setTt(prevTt => prevTt + 1);
    console.log(tt, questions.length, results)
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentChoices = choices.filter(choice => choice.question === currentQuestion?.id);

  return (
    <>
      <div className="testsContainer">
        <Header />
        <form onSubmit={handleSubmit}>
          <div className="testingContainer">
            <div className="testQuestion">
              <h5>
                {
                  currentQuestion ? (
                    <div id="ooo">
                      <p>{currentQuestionIndex + 1}.</p>
                      <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
                    </div>
                  ) : (
                    <h2>
                      Test yakunlandi!
                    </h2>
                  )
                }

                {
                  results && (
                    <div className="resultsContainer">
                      <h3>Test Natijalari</h3>
                      <p>Umumiy savollar soni: {questions.length}</p>
                      <p>To'g'ri javoblar soni: {Object.values(selectedAnswers).filter(answer => answer.isCorrect).length}</p>
                      <p>Noto'g'ri javoblar soni: {Object.values(selectedAnswers).filter(answer => !answer.isCorrect).length}</p>
                    </div>
                  )
                }
              </h5>
            </div>
            <div className="options">
              {
                currentChoices.length && !results ? (
                  currentChoices.map((choice, key) => (
                    <div
                      className={`option ${selectedOption === key ? 'selected' : ''}`}
                      key={key}
                    >
                      <input type="radio" name="options" id={`option-${key}`} onChange={() => handleOptionChange(key)} checked={selectedOption === key} />
                      <label htmlFor={`option-${key}`}>
                        {letters[key]}) <div dangerouslySetInnerHTML={{ __html: choice.text }} />
                      </label>
                    </div>
                  ))
                ) : null
              }
            </div>
          </div>

          <div className="rightContainer">
            <div className="timingContainer">
              <div className="time">
                <h6>Hisoblangan vaqt</h6>
                <div className="timeProgress">
                  <div className="timeProgress__inner">
                    {String(time.minutes).padStart(2, '0')}:
                    {String(time.seconds).padStart(2, '0')}
                  </div>
                  <div className="progress-circle-container">
                    <svg className="progress-circle" width="100" height="100">
                      <circle
                        className="progress-background"
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="10"
                      />
                      <circle
                        className="progress-bar"
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="10"
                        strokeDasharray="282.6"
                        strokeDashoffset={282.6 * (1 - calculateProgress() / 100)}
                      />
                    </svg>
                  </div>
                </div>
                <div className="allTime">
                  Umumiy vaqt: 1 daqiqa
                </div>
              </div>
            </div>
            <div className="answersContainer">
              <div className="cubics">
                {questions.map((question, index) => (
                  <div
                    className={`cubic ${index === currentQuestionIndex ? 'active' :
                      selectedAnswers[index]?.isCorrect ? 'correct' :
                        selectedAnswers[index] && !selectedAnswers[index]?.isCorrect ? 'incorrect' : ''
                      }`}
                    key={index}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="btn">
                <button type="submit">
                  {tt < questions.length ? 'Keyingi' : 'Yakunlash'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Testing;
