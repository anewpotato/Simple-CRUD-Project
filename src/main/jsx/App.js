import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Article from './components/Article';
import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import '../webapp/resources/css/custom.css';

class App extends Component{
	 
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	admin:{id:'',pw:''}
	    };
	    
	    
	}
	 
	 
	render(){
		return(
			<Router>	
			<div className="app"> 
			
				
				       
				
				       
				<Article/>
				
				
				<Footer /> 
			</div>		
			</Router>
		);
	}
}

export default App;


