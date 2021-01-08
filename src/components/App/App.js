import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.scss";
import Home from "../Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import StartForm from "../StartForm";
import { startExam } from "../../api/exam";
import Questions from "../Questions/index";

import ExamContext from "../../contexts/ExamContext";

function App(props) {
	const [exam, setExam] = useState({});
	const [redirect, setRedirect] = useState(false);
	const [formData, setFormData] = useState({
		candidateName: "",
		name: "",
	});

	const [errorMsg, setErrorMsg] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await startExam(formData);
		if (!result.success) {
			setErrorMsg(result.errors);
		} else {
			setExam(result.data);
			setRedirect(true);
		}
	};

	const handleFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};
	return (
		<Router>
			<div>
				<ExamContext.Provider value={exam}>
					<Route path='/' exact component={Home} />
					<Route exact path='/start/form'>
						{redirect ? (
							<Redirect to='/questions' />
						) : (
							<StartForm
								{...props}
								handleSubmit={handleSubmit}
								handleFormChange={handleFormChange}
								formData={formData}
								errorMsg={errorMsg}
							/>
						)}
					</Route>

					<Route path='/questions' exact component={Questions} />
				</ExamContext.Provider>
			</div>
		</Router>
	);
}

export default App;
