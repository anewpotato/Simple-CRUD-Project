import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Selector from './Selector';
import Header from './Header';
import Create from './Create';
import Home from './Home';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class Article extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      welcome:{desc:'Hello, Welcome to the Simple CRUD!!'},
	      read:{desc:'No more postings!!'},
	      create:{desc:'Write a posting'},
	      update:{desc:'Choose title of a posting that you want to update'},
	      delete:{desc:'Choose title of a posting that you want to delete'}
	      
	    };
	  }
	
	
	
	
	
	render() {
		var _desc = this.props.desc;
		if(this.props.mode ==='create'){
			_desc = null;
		}
        return(
        	
        	<article className="article">
        	<Header></Header> 
        	<Selector></Selector>
        	
			<Switch>
				<Route exact path = "/react/index" render={ props => <Home desc={this.state.welcome.desc}/>}/>
				<Route exact path="/react/create" render={ props => <Create desc={this.state.create.desc} />}/>	
				<Route exact path="/react/read" render={ props => <Read desc={this.state.read.desc} />}/>
				<Route exact path="/react/update" render={ props => <Update desc={this.state.update.desc} />}/>
				<Route exact path="/react/delete" render={ props => <Delete desc={this.state.delete.desc} />}/>
			</Switch>
			
        	        	
	           
        	</article>
        	
        );
    }
}

export default Article;