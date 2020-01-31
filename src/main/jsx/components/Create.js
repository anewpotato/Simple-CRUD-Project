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
	    	// 게시글 생성 및 수정 시 상태를 토글로 관리하는 state	 
	        isCreated:'false',
	        isModify:'false',
	    	content:{ // 게시글 생성 시 사용자가 작성하는 정보가 저장되는 state
	    		bName:'Write a Name',
	    		bTitle:'Write a Title',
	    		bContent:'Write a Content'
	    	},
	    	update:{ // 게시글 수정 시 사용자가 작성하는 정보가 저장되는 state
	    		bName:'',
	    		bTitle:'',
	    		bContent:''
	    	}
	     };
	  }
	 
	 componentDidMount(){
		 	// 수정하는 경우
		 	if(this.props.mode==='update'){
			var _value = null;
			var _bId = this.props.match.params.bId;
			
			 $.ajax({ // 해당 게시글의 정보를 읽어오는 ajax 통신
			    	type:"GET", 
			    	url: '/react/posting/'+_bId,
			    	dataType: "json", 
			    	cache : false, 
			    	success : function(resData)
			    	{ 
			    		
			    		_value = resData.post;
			    		
			    		
			    		var sysdate = new Date(_value.bDate);
					    _value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
					   
			    		
			    		this.setState({	// 읽어온 게시글의 정보를 state에 저장		    			 
			    			update:{
			    	    		bName:_value.bName,
			    	    		bTitle:_value.bTitle,
			    	    		bContent:_value.bContent
			    	    	}
			    		});			    		
			    	}.bind(this),
			    	error : function(){
			    		 alert('Can\'t get data of posting!');
			    	}
			    });	
		 	}
		}
	 
	 handleChange() { // 사용자가 입력하는 정보를 관리하는 메소드
		
		 if(this.props.mode==='update'){ // 수정 시
		 this.setState({		      
		      update:{ // update state를 변경해준다.
		    	  bName:this.writerInput.value,
		    	  bTitle:this.titleInput.value,
		    	  bContent:this.contentInput.value
		      }
		 });
		 }else if(this.props.mode==='create'){ // 생성 시
			 this.setState({
			      
			      content:{ // content state를 변경해준다.
			    	  bName:this.writerInput.value,
			    	  bTitle:this.titleInput.value,
			    	  bContent:this.contentInput.value
			      }
			 });
		 }		 
	 }
	 
	 sendContent(){ // 작성이 완료된 내용을 서버에 보내는 메소드
		 if(this.props.mode==='create'){ // 생성 시
		 $.ajax({  // ajax 통신을 통해 서버로 데이터를 전송
		    	type:"POST", // 서버의 데이터를 수정하므로 POST type 요청
		    	url: "/react/posting",
		    	contentType: "application/json", // JSON 형태로 전송
		    	data : JSON.stringify(this.state.content), // content state를 stringify로 변환하여 전송한다.
		    	cache : false, 
		    	success : function()
		    	{ 
		    		this.setState({ // 통신 성공 시 isCreated state를 변경해준다.
		    		  isCreated:'true'		  		      	    		
		  		 });
		    		alert('Creation is completed!!');	    		
		    	}.bind(this),
		    	error : function(){
		    		 alert('Can\'t create a posting');
		    	}
		    });
		 } 
		 else if(this.props.mode==='update'){ // 수정 시
			 var _bId = this.props.match.params.bId;
			 $.ajax({ // 수정된 내용을 서버에 전송하는 ajax 통신
			    	type:"PUT", // 글의 일부분만 수정되므로 PUT type 요청
			    	url: "/react/posting/"+_bId,
			    	contentType: "application/json", // JSON 형태로 전송
			    	data : JSON.stringify(this.state.update), // update state를 stringify로 변환하여 전송한다.
			    	cache : false, 
			    	success : function()
			    	{ 
			    		this.setState({ // 통신 성공 시 isModify state를 변경해준다.
			    		  isModify:'true' 		
			  		 });
			    		alert('Modify is completed!!');
			    		
			    	}.bind(this),
			    	error : function(){
			    		 alert('Can\'t update a posting');
			    	}
			    });
			 }
	 }
	 
	 resetContent(){ // 현재까지 작성된 정보를 초기화 시켜주는 메소드
		 
		 this.setState({
			    	content:{
			    		bName:'',
			    		bTitle:'',
			    		bContent:''
			    	},update:{
			    		bName:'',
			    		bTitle:'',
			    		bContent:''
			    	}		 
			     });
	 }
	 
	render() {
        return(
        	<div className="create">      		
        		{this.props.auth ==='' && (alert('Please select your Identity!!'),<Redirect to="/react/index"/>)}
        		{this.props.auth ==='visitor' && (alert('You have no authority!'),<Redirect to="/react/index"/>)}
        		{(this.state.isCreated ==='true'||this.state.isModify==='true') && <Redirect to="/react/postings"/>}
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
			 			defaultValue={this.props.mode==='create'?'' : this.state.update.bName}
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
					 			defaultValue={this.props.mode==='create'?'' : this.state.update.bTitle}  
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
					 	    	defaultValue={this.props.mode==='create'?'' : this.state.update.bContent}	    	
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