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
