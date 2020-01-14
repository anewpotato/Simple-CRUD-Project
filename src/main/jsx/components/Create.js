import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



class Create extends Component {
	 constructor(props) {
	     super(props);
	     this.state={
	        isCreated:'false',
	    	content:{
	    		bName:'',
	    		bTitle:'',
	    		bContent:''
	    	}	 
	     };
	  }
	 
	 handleChange() {
		 this.setState({
		      content:{
		    	  bName:this.writerInput.value,
		    	  bTitle:this.titleInput.value,
		    	  bContent:this.contentInput.value
		      }
		 });
	 }
	 
	 sendContent(){
		 $.ajax({ 
		    	type:"POST", 
		    	url: "/react/create",
		    	contentType: "application/json",
		    	data : JSON.stringify(this.state.content),
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		this.setState({
		    		  isCreated:'true',
		  		      content:{
		  		    	bName:'',
		  		    	bTitle:'',
		  		    	bContent:''
		  		      }
		    		
		  		 });
		    		alert('Creation is completed!!');
		    		
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t create a posting');
		    	}
		    });
	 }
	 
	 resetContent(){
		 this.writerInput.value = '';
		 this.titleInput.value = '';
		 this.contentInput.value = '';
		 this.state={
			    	content:{
			    		bName:'',
			    		bTitle:'',
			    		bContent:''
			    	}	 
			     };
	 }
	 
	render() {
        return(
        	<div className="create">
        		{this.state.isCreated ==='true' && <Redirect to="/react/read"/>}
        		<h2>{this.props.desc}</h2>
				<div id="writer">
				<InputGroup >
					<InputGroup.Prepend>
				 		<InputGroup.Text >Writer</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 		 	ref={(input) => { this.writerInput = input; }}
			 			onChange={() => {this.handleChange()}}
			 		    placeholder='Write your Name'
			 		    
			 		  />
			 		 </InputGroup>
			 		</div>
			 		
			 		<div id="title">
			 		<InputGroup >
					<InputGroup.Prepend>
				 		<InputGroup.Text >Title</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 			ref={(input) => { this.titleInput = input; }}
			 			onChange={() => {this.handleChange()}}
			 		    placeholder='Write a Title'
			 		    	
			 		   
			 		  />
		 	   </InputGroup>
			 		</div>
			 		
			 		<div id="content">
			 		<InputGroup id="content_view">
			 	    <InputGroup.Prepend>
			 	      <InputGroup.Text >Content</InputGroup.Text>
			 	    </InputGroup.Prepend>
			 	    <FormControl as="textarea" placeholder='Write a Content'
			 	    	ref={(input) => { this.contentInput = input; }}
			 	    	onChange={() => {this.handleChange()}}
			 	    	
			 	    	
			 	    />
			 	    </InputGroup>
			 		</div>
			 		
			 		<div id="buttons">
			 		<ButtonToolbar>
			 		  
			 		  <Button onClick={() => this.sendContent()} variant="outline-primary" className="w_button" type="submit">Submit</Button>
			 		  <Button onClick={() => this.resetContent()} variant="outline-primary" className="w_button" type="reset" >Reset</Button>
			 		  <Link to="/react/read"> 
			 		  <Button variant="outline-primary" className="w_button"  type="button">Back to the list</Button>
			 		  </Link>
			 		  </ButtonToolbar>
			 		</div>
			 		
			 	</div>
        );
    }
}

export default Create;