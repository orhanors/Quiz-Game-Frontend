import axios from "axios";

const { REACT_APP_BE_URL } = process.env;
export const startExam = async (userData) => {
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	try {
		const response = await axios.post(
			`${REACT_APP_BE_URL}/exams/start`,
			userData,
			config
		);
		return response.data;
	} catch (error) {
		console.log("Exam start error", error.response);
		return error.response.data;
	}
};

export const sendAnswers = async (answers, examId) => {
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	try {
		const response = await axios.post(
			`${REACT_APP_BE_URL}/exams/${examId}/answer`,
			answers,
			config
		);
		console.log("response sending answer", response.data);
		return response.data;
	} catch (error) {
		console.log("Send Answers Error", error);
		return error.response.data;
	}
};

export const getScore = async (examId) => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*",
		},
	};

	try {
		const response = await axios.get(`${REACT_APP_BE_URL}/exams/${examId}`);
		console.log("score", response.data);
		return response.data;
	} catch (error) {
		console.log("get score Error", error);
		return error.response.data;
	}
};
