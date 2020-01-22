import React, {Component}from 'react'; 
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Read extends Component {
	constructor(props) {
	    super(props);
	   
	    this.state = {
	    	values:[],
	    	show:'false',
	    	selectedItem:null,
	    	isDeleted:'false',
	    	selectPage:1,
	    	priviousPage:0,
	    	search:{title:''}
	    };
	    
	    
	}

	shouldComponentUpdate(nextProps,nextState){
		if(this.state.isDeleted !== nextState.isDeleted || this.state.selectedPage !== nextState.selectedPage){
		var _values=[];
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/read',
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		_values = resData.contents;
		    		
		    		$.each(_values, function( index, value ) {
						  var sysdate = new Date(value.bDate);
						  value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
						});
		    		
		    		this.setState({
		    			values:_values
		    		});
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of board');
		    	}
		    });
		
		}
		 return true;
	}
	
	componentDidMount(){
		var _values=[];
		 $.ajax({ 
		    	type:"GET", 
		    	url: '/react/read',
		    	dataType: "json", 
		    	cache : false, 
		    	success : function(resData)
		    	{ 
		    		_values = resData.contents;
		    		
		    		$.each(_values, function( index, value ) {
						  var sysdate = new Date(value.bDate);
						  value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
						});
		    		
		    		this.setState({
		    			values:this.state.values.concat(_values)
		    		});
		    	}.bind(this),
		    	error : function(request,status,error){
//		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of board');
		    	}
		    });
		
		 
		 
	}
	 


	
	deleteContent(_bId){
		
		
		 $.ajax({ 
		    	type:"DELETE", 
		    	url: '/react/delete/'+_bId,
		    	
		    	cache : false, 
		    	success : function()
		    	{ 
		    		if(this.state.show==='false'){
		    			this.setState({
		    				show:'true'
		    			});
		    			}else{
		    				this.setState({
		    					show:'false'
		    				});
		    		}
		    		if(this.state.isDeleted ==='false'){
		    		this.setState({
		    			isDeleted:'true',
		    			
		    		});
		    		}else if(this.state.isDeleted ==='true'){
			    		this.setState({
			    			isDeleted:'false',
			    			
			    		});
			    	}
		    		
		    		
		    		
		    		alert('Delete is completed!!');
		    	}.bind(this),
		    	error : function(request,status,error){
		    		 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		    		 alert('Can\'t call data of posting');
		    	}
		    });	
		 
		 
	}
	
	
	setShow(_index){
		
		this.setState({
			selectedItem:_index
		});
		if(this.state.show==='false'){
		this.setState({
			show:'true'
		});
		}else{
			this.setState({
				show:'false'
			});
		}
	}
	handlePage(e){
		console.log(this.state.selectPage -1);
		if(parseInt(e.target.value) ===1){
			this.setState({
				priviousPage:0,
				selectPage:parseInt(e.target.value)
			});
		}else{
		this.setState({
			selectPage:parseInt(e.target.value),
			priviousPage:parseInt(e.target.value) -1
			
		});
		}
	}
	getPageNum=()=>{
		var _com =<Button variant="outline-info" onClick={(e)=>{this.handlePage(e)}} value={1} >1</Button>;
		if(this.state.values.length <= 10){
			
			return _com;
		}else{
			var i =0;
			var num =2;
			while(i<parseInt(this.state.values.length/10)){
				if(this.state.values.length % 10 ===0 ){
					i++;
				}
				_com = <span>{_com} <Button variant="outline-info" onClick={(e)=>{this.handlePage(e)}} value={num}>{num}</Button></span>;
				i++;
				if(i===parseInt(this.state.values.length/10)){ break;}
				num++;
			}
			
			
			
		}				
		return _com;
	}
	handleValueChange(e) {
		
		this.setState({
			search:{
				title:e.target.value
			}
		});
		
	}
	



	
	render() {
		
		  var contentList = this.state.values.map((_content,_index) => ( 
				  														
																		  
																		<div key={_index}>
																		
																		{this.state.search.title ===''?((_index < (10*this.state.selectPage))&&((this.state.priviousPage*10)<=_index))&&
				  														<ListGroup horizontal>
		  																<ListGroup.Item className="content_writer">{_content.bName}</ListGroup.Item>
		  																{this.props.mode==='read'&&<LinkContainer to={`/react/read/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='update'&&<LinkContainer to={`/react/update/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='delete'&&
		  																<ListGroup.Item className="content_title"><a href="/" onClick={(e) => {e.preventDefault();this.setShow({_index})  
		  												                }}>{_content.bTitle}</a></ListGroup.Item>
		  																
		  																}
		  																<ListGroup.Item className="content_date">{_content.bDate}</ListGroup.Item>
		  																<ListGroup.Item className="content_hit">{_content.bHit}</ListGroup.Item>
		  																</ListGroup> : 
		  																	this.state.values[_index].bTitle.indexOf(this.state.search.title)>-1 && <ListGroup horizontal>
		  																<ListGroup.Item className="content_writer">{_content.bName}</ListGroup.Item>
		  																{this.props.mode==='read'&&<LinkContainer to={`/react/read/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='update'&&<LinkContainer to={`/react/update/${_content.bId}`}>
		  																<ListGroup.Item className="content_title"><a href="/" >{_content.bTitle}</a></ListGroup.Item>
		  																</LinkContainer>
		  																}
		  																{this.props.mode==='delete'&&
		  																<ListGroup.Item className="content_title"><a href="/" onClick={(e) => {e.preventDefault();this.setShow({_index})  
		  												                }}>{_content.bTitle}</a></ListGroup.Item>
		  																
		  																}
		  																<ListGroup.Item className="content_date">{_content.bDate}</ListGroup.Item>
		  																<ListGroup.Item className="content_hit">{_content.bHit}</ListGroup.Item>
		  																</ListGroup> 
																		}
																		
		  																 {(this.props.mode==='delete'&&this.state.show==='true'&& _index ===this.state.selectedItem._index) && 
		  																	 
		  																<Alert variant="warning">
		  																 
		  													             <p>
		  													               Are you sure to delete <strong>{_content.bTitle}</strong>?
		  													             </p>
		  													             <hr />
		  													             <div id="delete_button">
			  															
		  													           <Button onClick={() => {this.deleteContent(_content.bId)}} variant="outline-secondary">
		  													            Delete
		  													          </Button>
		  													            
		  													            </div>
		  													           </Alert>}
		  													         
		  																 
																		
		  																</div>
		  																
		  																));
		  
		
		  
		
		
		
        return(
        	<div className="read">
        
    		
        	{(this.props.mode ==='update' || this.props.mode ==='delete')&& <h2>{this.props.desc}</h2>}
        	<Card className="post" >
			  <Card.Header >Postings</Card.Header>
			  <ListGroup horizontal >
			  <ListGroup.Item style={{flex:'1'}}>Writer</ListGroup.Item>
			  <ListGroup.Item style={{flex:'5'}}>Title</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Date</ListGroup.Item>
			  <ListGroup.Item style={{flex:'1'}}>Views</ListGroup.Item>			  
			  </ListGroup>
			</Card>
        	 {contentList}
        	 
        	{this.props.mode ==='read' && <h2>{this.props.desc}</h2>}
        	
        	<Form inline style={{paddingLeft:'40%'}}>
        	<InputGroup.Prepend>
            <InputGroup.Text>Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e)=>{this.handleValueChange(e)}}type="text" placeholder="Searching by title of posting" className="mr-sm-2" />
            
            </Form>
           
        	<ButtonToolbar>
        	  <ButtonGroup className="page_btn" >
        	  <div>
        	    {this.getPageNum()}
        	  </div>
        	  </ButtonGroup>
        	</ButtonToolbar>
        		
        	</div>
        );
    }
}

export default Read;