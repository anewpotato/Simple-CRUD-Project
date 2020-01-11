import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
class Create extends Component {
	render() {
        return(
        	<div>
				<div id="writer"> 
				<InputGroup >
					<InputGroup.Prepend>
				 		<InputGroup.Text >Writer</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 		    placeholder='Write your Name'
			 		  />
			 		 </InputGroup>
			 		</div>
			 		
			 		<div id="title">
			 		<InputGroup >
					<InputGroup.Prepend>
				 		<InputGroup.Text>Title</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 		    placeholder='Write a Title'
			 		  />
		 	   </InputGroup>
			 		</div>
			 		
			 		<div id="content">
			 		<InputGroup id="content_view">
			 	    <InputGroup.Prepend>
			 	      <InputGroup.Text>Content</InputGroup.Text>
			 	    </InputGroup.Prepend>
			 	    <FormControl as="textarea"/>
			 	    </InputGroup>
			 		</div>
			 		
			 		<div id="buttons">
			 		<ButtonToolbar>
			 		  
			 		  <Button variant="outline-primary" className="w_button" as="input" type="submit" value="Submit" />
			 		  <Button variant="outline-primary" className="w_button" as="input" type="reset" value="Reset" />
			 		  <Button variant="outline-primary" className="w_button" as="input" type="button" value="List" />
			 		</ButtonToolbar>
			 		</div>
			 		
			 	</div>
        );
    }
}

export default Create;