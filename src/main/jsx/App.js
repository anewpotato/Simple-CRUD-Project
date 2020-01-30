import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Article from './components/Article';
import React, {Component} from 'react';

class App extends Component{
	 
	
	 
	render(){
		
		return(		
			<div className="app"> 				       
				<Article/>			
				<Footer /> 
			</div>		
			
		);
	}
}

export default App;


