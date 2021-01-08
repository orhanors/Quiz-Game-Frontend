import React, { useContext } from "react";
import { Form, Container } from "react-bootstrap";
import "./startForm.scss";

import { showErrorMessage } from "../../helpers/messages";
import ExamContext from "../../contexts/ExamContext";

/**
 * 
	check("candidateName")
 * check("name")
 */
function StartForm(props) {
	const { candidateName, name } = props.formData;
	const { errorMsg } = props;

	const exam = useContext(ExamContext);

	const showForm = () => {
		return (
			<Form onSubmit={props.handleSubmit}>
				<Form.Group>
					<Form.Label>What's your name?</Form.Label>
					<Form.Control
						id='candidateName'
						onChange={props.handleFormChange}
						value={candidateName}
						type='text'
						placeholder='Your name'
					/>
					<Form.Text className='text-muted'>
						We'll show your score with your name
					</Form.Text>
				</Form.Group>

				<Form.Group>
					<Form.Label>What's the name of your journey?</Form.Label>
					<Form.Control
						id='name'
						onChange={props.handleFormChange}
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
