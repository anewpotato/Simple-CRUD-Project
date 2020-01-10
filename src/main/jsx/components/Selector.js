import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';

class Selector extends Component {
		constructor(props) {
		    super(props);
		   
		}
		
	
		render() {
			return(
					<div className="selector">       		
		        		<ButtonGroup toggle className="selectors_toggle" >
				            <ToggleButton 
				            onClick={function(e){
			        	        e.preventDefault();
			        	        this.props.onChangeMode('create');
			        	      }.bind(this)}
				            type="radio" name="create" value="1" variant="secondary">
				              Create
				            </ToggleButton>
				            <ToggleButton onClick={function(e){
			        	        e.preventDefault();
			        	        this.props.onChangeMode('read');
			        	      }.bind(this)}
				            type="radio" name="read" value="2" variant="secondary">
				              Read
				            </ToggleButton>
				            <ToggleButton onClick={function(e){
			        	        e.preventDefault();
			        	        this.props.onChangeMode('update');
			        	      }.bind(this)}
				            type="radio" name="update" value="3" variant="secondary">
				              Update
				            </ToggleButton>
				            <ToggleButton onClick={function(e){
			        	        e.preventDefault();
			        	        this.props.onChangeMode('delete');
			        	      }.bind(this)}
				            type="radio" name="delete" value="4" variant="secondary">
				              Delete
				            </ToggleButton>  
		              	</ButtonGroup>
		        	</div>

				);
			}
}

export default Selector;