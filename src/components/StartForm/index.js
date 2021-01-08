import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./startForm.scss";
import { startExam } from "../../api/exam";
import { showErrorMessage } from "../../helpers/messages";
/**
 * 
	check("candidateName")
 * check("name")
 */
function StartForm(props) {
	const [formData, setFormData] = useState({
		candidateName: "",
		name: "",
	});
	const [errorMsg, setErrorMsg] = useState(null);

	const { candidateName, name } = formData;

	const handleFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await startExam(formData);
		if (!result.success) {
			setErrorMsg(result.errors);
		}
	};
	const showForm = () => {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>What's your name?</Form.Label>
					<Form.Control
						id='candidateName'
						onChange={handleFormChange}
						value={candidateName}
						type='text'
						placeholder='Your name'
					/>
					<Form.Text className='text-muted'>
						We'll show your score with your name
					</Form.Text>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>What's the name of your journey?</Form.Label>
					<Form.Control
						id='name'
						onChange={handleFormChange}
						value={name}
						type='text'
						placeholder='Name of your journey'
					/>
					<Form.Text className='text-muted'>Just type this</Form.Text>
				</Form.Group>
				<button className='btn-submit' type='submit'>
					Start
				</button>
			</Form>
		);
	};

	return (
		<div className='starter-form'>
			<Container>
				<h1 className='text-center'>Quiz Starter</h1>
				<p className='text-center'>
					To start a new quiz please fill the form
				</p>
				<div className='mt-4'>{showForm()}</div>
				{errorMsg && (
					<div className='mt-3'>{showErrorMessage(errorMsg)}</div>
				)}
			</Container>
		</div>
	);
}

export default StartForm;
