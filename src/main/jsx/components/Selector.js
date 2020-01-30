import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Selector extends Component {	
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
			            	<LinkContainer to="/react/update">
				            	<ToggleButton 
				            	type="radio" name="update" value="3" variant="secondary">
				            		Update
			            		</ToggleButton>
		            		</LinkContainer>
		            		<LinkContainer to="/react/delete">
				            	<ToggleButton 
				            	type="radio" name="delete" value="4" variant="secondary">
				            		Delete
			            		</ToggleButton> 
		            		</LinkContainer>     
	            		</ButtonGroup>	              	
		        	</nav>

				);
			}
}

export default Selector;