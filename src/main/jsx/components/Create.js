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
	        isModify:'false',
	    	content:{
	    		bName:'Write a Name',
	    		bTitle:'Write a Title',
	    		bContent:'Write a Content'
	    	},
	    	update:{
	    		bName:'',
	    		bTitle:'',
	    		bContent:''
	    	}
	     };
	  }
	 componentDidMount(){
		 	if(this.props.mode==='update'){
			var _value = null;
			var _bId = this.props.match.params.bId;
			
			 $.ajax({ 
			    	type:"GET", 
			    	url: '/react/update/'+_bId,
			    	dataType: "json", 
			    	cache : false, 
			    	success : function(resData)
			    	{ 
			    		
			    		_value = resData.post;
			    		
			    		
			    		var sysdate = new Date(_value.bDate);
					    _value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
					   
			    		
			    		this.setState({
			    			 
			    			update:{
			    	    		bName:_value.bName,
			    	    		bTitle:_value.bTitle,
			    	    		bContent:_value.bContent
			    	    	}
			    		});
			    		
			    	}.bind(this),
			    	error : function(request,status,error){
//			    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			    		 alert('Can\'t call data of posting');
			    	}
			    });	
		 	}
		}
	 handleChange() {
		 console.log(this.state.update);
		 console.log(this.state.content);
		 if(this.props.mode==='update'){
		 this.setState({
		      
		      update:{
		    	  bName:this.writerInput.value,
		    	  bTitle:this.titleInput.value,
		    	  bContent:this.contentInput.value
		      }
		 });
		 }else if(this.props.mode==='create'){
			 this.setState({
			      
			      content:{
			    	  bName:this.writerInput.value,
			    	  bTitle:this.titleInput.value,
			    	  bContent:this.contentInput.value
			      }
			 });
		 }
		 
	 }
	 
	 sendContent(){
		 if(this.props.mode==='create'){
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
		 else if(this.props.mode==='update'){
			 var _bId = this.props.match.params.bId;
			 console.log(this.state.update);
			 $.ajax({ 
			    	type:"PUT", 
			    	url: "/react/update/"+_bId,
			    	contentType: "application/json",
			    	data : JSON.stringify(this.state.update),
			    	cache : false, 
			    	success : function(resData)
			    	{ 
			    		this.setState({
			    		  isModify:'true',
			  		      update:{
				  		    	bName:'',
				  		    	bTitle:'',
				  		    	bContent:''
				  		      }
			    		
			  		 });
			    		alert('Modify is completed!!');
			    		
			    	}.bind(this),
			    	error : function(request,status,error){
//			    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			    		 alert('Can\'t create a posting');
			    	}
			    });
			 }
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
			    	},update:{
			    		bName:'',
			    		bTitle:'',
			    		bContent:''
			    	}		 
			     };
	 }
	 
	render() {
        return(
        	<div className="create">
        		{(this.state.isCreated ==='true'||this.state.isModify==='true') && <Redirect to="/react/read"/>}
        		<h2>{this.props.desc}</h2>
				<div id="writer">
				<InputGroup >
					<InputGroup.Prepend>
				 		<InputGroup.Text >Writer</InputGroup.Text>
	
			 		</InputGroup.Prepend>
			 		<FormControl
			 		 	ref={(input) => { this.writerInput = input; }}
			 			onChange={() => {this.handleChange()}}
			 		    placeholder={this.props.mode==='create'?this.state.content.bName : this.state.update.bName}
			 			defaultValue={this.props.mode==='create'?this.state.content.bName : this.state.update.bName}
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
			 		    placeholder={this.props.mode==='create'?this.state.content.bTitle : this.state.update.bTitle}
			 		defaultValue={this.props.mode==='create'?this.state.content.bTitle : this.state.update.bTitle}	
			 		   
			 		  />
		 	   </InputGroup>
			 		</div>
			 		
			 		<div id="content">
			 		<InputGroup id="content_view">
			 	    <InputGroup.Prepend>
			 	      <InputGroup.Text >Content</InputGroup.Text>
			 	    </InputGroup.Prepend>
			 	    <FormControl as="textarea" placeholder={this.props.mode==='create'?this.state.content.bContent : this.state.update.bContent}
			 	    	ref={(input) => { this.contentInput = input; }}
			 	    	onChange={() => {this.handleChange()}}
			 	   defaultValue={this.props.mode==='create'?this.state.content.bContent : this.state.update.bContent}
			 	    	
			 	    />
			 	    </InputGroup>
			 		</div>
			 		
			 		<div id="buttons">
			 		<ButtonToolbar>
			 		  
			 		  <Button onClick={() => this.sendContent()} variant="outline-primary" className="w_button" type="submit">
			 		  {this.props.mode==='create'?'Submit':'Update'}</Button>
			 		  <Button onClick={() => this.resetContent()} variant="outline-primary" className="w_button" type="reset" >Reset</Button>
			 		  {this.props.mode==='create'?<Link to="/react/read"> 
			 		  <Button variant="outline-primary" className="w_button"  type="button">Back to the list</Button>
			 		  </Link> : <Link to="/react/update"> 
			 		  <Button variant="outline-primary" className="w_button"  type="button">Back to the list</Button>
			 		  </Link>}
			 		  </ButtonToolbar>
			 		</div>
			 		
			 	</div>
        );
    }
}

export default Create;