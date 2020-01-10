import ReactDOM from 'react-dom';
import Header from './components/Header';
import Selector from './components/Selector';
import Footer from './components/Footer';
import Article from './components/Article';
import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import '../webapp/resources/css/custom.css';

class App extends Component{
	 constructor(props){
	    super(props);
	    this.state = {
	      mode:'welcome',
	      welcome:{desc:'Hello, Welcome to the Simple CRUD!!'},
	      read:{desc:'No more postings!!'},
	      create:{desc:'Write a post'}
	      
	    };
	  }
	
	 getContent(){
		    var _title, _desc,_mode,_article = null;
		    if(this.state.mode === 'welcome'){
		    _mode = this.state.mode;
		    _desc = this.state.welcome.desc;
		    _article = <Article mode = {_mode} desc={_desc}></Article>;
		    }
		    else if(this.state.mode === 'read'){
		    	_mode = this.state.mode;
			    _desc = this.state.read.desc;
			    _article = <Article mode = {_mode} desc={_desc}></Article>;
		    }
		    else if(this.state.mode === 'create'){
		    	_mode = this.state.mode;
		    	_desc = this.state.create.desc;
			    _article = <Article mode = {_mode} desc={_desc}></Article>;
		    }
		    else if(this.state.mode === 'update'){
		    	_mode = this.state.mode;
		    	
			    _article = <Article mode = {_mode} ></Article>;
		    }
		    else if(this.state.mode === 'delete'){
		    	_mode = this.state.mode;
		    	
			    _article = <Article mode = {_mode} ></Article>;
		    }
		    return _article;
	 }
	 
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
			<div className="app"> 
			
				<Header onChangeMode = {function(){
				       this.setState({
				           mode:'welcome'				      
				         });
				       }.bind(this)}></Header> 
				       
				<Selector onChangeMode = {function(_mode){
				       this.setState({
				           mode:_mode				      
				         });
				       }.bind(this)}></Selector>
				       
				{this.getContent()}
				
				<Footer /> 
			</div>			
		);
	}
}

export default App;


