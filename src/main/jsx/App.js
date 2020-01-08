import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import Page1Page from './Page1Page';
import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";


class App extends Component{
	
	render(){
		return(
				//리액트 라우터 예제
//			<Router>
//			
//				<header>
//				  <Link to="/main">
//				    <button>About</button>
//				  </Link>
//				  <Link to="/page1">
//				    <button>Users</button>
//				  </Link>
//				</header>
//				<hr/>
//				<main>		 
//				  <Route path="/main" component={MainPage} />
//				  <Route path="/page1" component={Page1Page} />
//				</main>	
//			</Router>
				<div className="container MyComponent">
		        <div className="jumbotron">
		          Hello there!
		          <button type="button" className="btn btn-primary">
		            Bootstrap Button!
		          </button>
		        </div>
		      </div>
		);
	}
}

export default App;


