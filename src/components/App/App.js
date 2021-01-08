import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import Home from "../Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartForm from "../StartForm";
function App() {
	return (
		<Router>
			<div>
				<Route path='/' exact component={Home} />
				<Route path='/start/form' component={StartForm} />
			</div>
		</Router>
	);
}

export default App;
