import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { sendAnswers, getScore } from "../../api/exam";
import ExamContext from "../../contexts/ExamContext";
import "./questions.scss";

function Questions(props) {
	const [page, setPage] = useState(0);
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState([]);
	const exam = useContext(ExamContext);

	const questions = exam?.questions;

	const handleTestAgain = () => {
		setPage(0);
		setAnswers([]);
	};

	const handleAnswerClick = (e) => {
		const selectedIndex = Number(e.target.id);
		const currentQuestion = page;

		setAnswers([
			...answers,
			{ question: currentQuestion, answer: selectedIndex },
		]);

		setPage(page + 1);
	};

	const handleSubmitAnswers = async () => {
		const resultForPost = await sendAnswers(answers, exam._id);

		const resultScore = await getScore(exam._id);
		setScore(resultScore.data.score);
		setPage(page + 1);
	};

	const showQuestion = () => {
		return (
			<div className='question'>
				<h4 className='text-center'>{questions[page].text}</h4>

				<div className='answers'>
					<Container>
						<Row>
							{questions[page].answers.map((answer, index) => {
								return (
									<Col md={6}>
										<h5
											id={index}
											onClick={handleAnswerClick}
											className='single-answer'>
											{answer.text}
										</h5>
									</Col>
								);
							})}
						</Row>
					</Container>
				</div>
			</div>
		);
	};
	const showScore = () => {
		return (
			<div className='question text-center'>
				<h1>
					{exam.candidateName},your score is: {score}
				</h1>
			</div>
		);
	};

	const questionPage = () => {
		return (
			<div>
				<h1 className='text-center'>Question {page + 1}/5</h1>
				{showQuestion()}
			</div>
		);
	};

	const submitPage = () => {
		return (
			<div>
				<h1 className='text-center'>
					Congrats <strong>{exam.candidateName}</strong>! You've
					finished the quiz
				</h1>
				<br />
				<div className='text-center mb-5'>
					<h4>If you are good with your answers submit them</h4>
					<button className='submit' onClick={handleSubmitAnswers}>
						Submit Answers
					</button>
				</div>

				<div className='text-center'>
					<h4 className='text-center'>
						You can answer all the questions again
					</h4>

					<button className='again' onClick={handleTestAgain}>
						Test Again
					</button>
				</div>
			</div>
		);
	};
	return (
		<div className='quiz-page'>
			{page === 5
				? submitPage()
				: page === 6
				? showScore()
				: questionPage()}
		</div>
	);
}

export default Questions;
