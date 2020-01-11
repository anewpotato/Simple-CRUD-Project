import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Selector from './Selector';
import Header from './Header';
import Create from './Create';
import Home from './Home';
import Read from './Read';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class Article extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      welcome:{desc:'Hello, Welcome to the Simple CRUD!!'},
	      read:{desc:'No more postings!!'},
	      create:{desc:'Write a post'}
	      
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
				<Route exact path="/react/create" component={Create} />
				<Route exact path="/react/index" component={Home} />
				<Route exact path="/react/read" component={Read} />

        	</Switch>
			
        	        	
	           
        	</article>
        	
        );
    }
}

export default Article;