import React, { useState, useEffect } from 'react';
import he from 'he';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || !Array.isArray(data.results)) {
          console.error('Unexpected data format:', data);
          return;
        }
        const formattedQuestions = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          answers.splice(randomIndex, 0, q.correct_answer);
          return {
            question: q.question,
            answers,
            correct: q.correct_answer,
          };
        });
        setQuestions(formattedQuestions);
      })
      .catch((err) => {
        console.error('Failed to fetch quiz data:', err);
      });
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (showResult) return; // Stop timer if quiz finished

    if (selectedAns) return; // Stop timer if answer selected (auto next timer will handle moving forward)

    if (timer === 0) {
      handleNext();
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, selectedAns, showResult]);

  const handleAnswer = (answer) => {
    setSelectedAns(answer);
    if (answer === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedAns(null);
      setTimer(10); // reset timer for next question
    } else {
      setShowResult(true);
    }
  };

  // Auto-next after answer selection (2 seconds delay)
  useEffect(() => {
    if (selectedAns !== null) {
      const timerId = setTimeout(() => {
        handleNext();
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [selectedAns]);

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAns(null);
    setShowResult(false);
    setTimer(10);
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || !Array.isArray(data.results)) {
          console.error('Unexpected data format:', data);
          return;
        }
        const formattedQuestions = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          answers.splice(randomIndex, 0, q.correct_answer);
          return {
            question: q.question,
            answers,
            correct: q.correct_answer,
          };
        });
        setQuestions(formattedQuestions);
      })
      .catch((err) => {
        console.error('Failed to fetch quiz data:', err);
      });
  };

  if (questions.length === 0 || !questions[currentQ]) {
    const progressPercent = ((currentQ + 1) / questions.length) * 100;
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="title">🎉 HS Quiz!</h1>
      {showResult ? (
        <div className="result">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="timer">Time Remaining: {timer} seconds</div>
          <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} /></div>
          <h2 className="question">{he.decode(questions[currentQ].question)}</h2>
          <ul className="answers">
            {questions[currentQ]?.answers?.map((ans, idx) => {
              let className = 'option';
              if (selectedAns) {
                if (ans === questions[currentQ].correct) {
                  className += ' correct';
                } else if (ans === selectedAns) {
                  className += ' incorrect';
                }
              }

              return (
                <li
                  key={idx}
                  className={className}
                  onClick={() => !selectedAns && handleAnswer(ans)}
                >
                  {he.decode(ans)}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
