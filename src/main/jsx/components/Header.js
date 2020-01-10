import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
	render() {
        return(
        	<div className="header"> 
        		
        		<h1><a href="/" onClick={function(e){
        	        e.preventDefault();
        	        this.props.onChangeMode();
        	      }.bind(this)}>Simple CRUD</a></h1>
        		
        		
        	</div>
        );
    }
}

export default Header;