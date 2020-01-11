import React, {Component} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReactDOM from 'react-dom';
import { ButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';

class Selector extends Component {
		constructor(props) {
		    super(props);
		   
		}
		
	
		render() {
			return(
					<nav className="selector"> 
					
						
		        		<ButtonGroup toggle className="selectors_toggle" >
		        			
		        		<LinkContainer to="/react/create">
				            <ToggleButton 
				            
				            type="radio" name="create" value="1" variant="secondary">
				              Create
				              </ToggleButton>
				         </LinkContainer>
				         
				         <LinkContainer to="/react/read">  
				            <ToggleButton 
				            type="radio" name="read" value="2" variant="secondary">
				              Read
				            </ToggleButton>
						 </LinkContainer>
  
				            <ToggleButton 
				            type="radio" name="update" value="3" variant="secondary">
				              Update
				            </ToggleButton>
				              
				            <ToggleButton 
				            type="radio" name="delete" value="4" variant="secondary">
				              Delete
				            </ToggleButton> 
				              
		              	</ButtonGroup>
		              	
		        	</nav>

				);
			}
}

export default Selector;