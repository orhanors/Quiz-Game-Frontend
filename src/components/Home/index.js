import React from "react";
import "./home.scss";
import { Link, withRouter } from "react-router-dom";
function Home(props) {
	return (
		<div className='start-page'>
			<h1>Welcome to Quiz Game</h1>
			<p>
				If you are feeling confident and you're ready, we're going to
				give you 5 questions
			</p>
			<Link to='/start/form'>
				<button>LET'S START</button>
			</Link>
		</div>
	);
}

export default withRouter(Home);
