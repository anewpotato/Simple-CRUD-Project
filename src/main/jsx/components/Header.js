import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
	render() {
        return(
        	<div className="header">    		
				<LinkContainer exact to="/react/index">
					<h1><a href="/" >Simple CRUD</a></h1>
				</LinkContainer>       		
        	</div>
        );
    }
}

export default Header;