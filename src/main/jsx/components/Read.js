import React, {Component}from 'react'; 
import ReactDOM from 'react-dom';

import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Read extends Component {
	constructor(props) {
	    super(props);   
	    this.state = {
	    	values:[], // 서버로 부터 받은 게시글의 정보가 저장되는 배열 state
	    	show:'false', // 게시글 삭제 시 Alert 컴포넌트를 보여주는 상태 state
	    	selectedItem:null, // 게시글 중 선택된 게시글을 저장하는 state
	    	isDeleted:'false', // 삭제 완료 여부를 관리하는 state
	    	selectPage:1, // 페이징 처리 시 보여주는 범위를 관리하는 state
	    	priviousPage:0, // 페이징 처리 시 보여주는 범위를 관리하는 state
	    	search:{title:''} // 검색 기능 시 사용자가 입력한 제목 정보를 저장하는 state
	    	
	    };	    
	}

	shouldComponentUpdate(nextProps,nextState){ // 컴포넌트 생명 주기 중 state 또는 props의 변경사항에 맞춰 렌더링을 해주는 메소드
		if(this.state.isDeleted !== nextState.isDeleted){ // 특정 게시글의 삭제로 isDeleted state의 값이 변경 될 경우 서버로부터 게시글 정보를 다시 받아온다.
			var _values=[];
			$.ajax({ // 서버로부터 게시글의 정보를 받아오는 ajax 통신 
		    	type:"GET", // 데이터 조회를 위한 통신이므로 GET방식을 사용 
		    	url: '/react/postings', // 서버로 요청하는 URL
		    	dataType: "json",  // JSON 타입으로 데이터를 받아온다.
		    	cache : false, // 게시글의 정보는 항상 변할 수 있기 때문에 cache 옵션은 false
		    	success : function(resData) // 통신 성공 시 수행되는 메소드
		    	{ 
		    		_values = resData.contents; // 서버로부터 받아온 게시글의 정보를 _values 배열에 저장
		    		
		    		$.each(_values, function(index, value ) { // jquery 반복문을 이용해 저장된 게시글 배열을 반복
						  // 게시글의 작성일인 bDate의 경우 Timestamp 타입이므로 포맷을 변경해 줄 필요가 있다.
		    			  var sysdate = new Date(value.bDate);
		    			  // yyyy/mm/dd 의 포맷으로 bDate 값을 변경해준다.
						  value.bDate = String(sysdate.getFullYear())+'/'+String(sysdate.getMonth()+1)+'/'+String(sysdate.getDate());
					});
		    		
		    		this.setState({
		    			values:_values // 변경이 완료 된 배열을 현재 컴포넌트의 state에 저장 
		    		});
		    	}.bind(this),
		    	error : function(){
		    		 alert('Can\'t get postings of a board!');
		    	}
		    });	
		}
		// 이외의 경우에는 무조건 렌더링을 해주어야 하므로 true를 반환한다.
		return true;
	}
	
	componentDidMount(){ // 컴포넌트가 호출되어 render가 실행 된 이후 호출되는 메소드		
		// read에 접근할 수 있는 권한은 admin 과 일반 방문자인 visitor 모두 가능	
		if(this.props.auth==='admin' || (this.props.auth==='visitor' && this.props.mode==='read')){
			// 이하 통신은 shouldComponentUpdate() 메소드의 과정과 동일
			var _values=[];
			$.ajax({ 
		    	type:"GET", 
		    	url: '/react/postings',
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
		    			values:_values,
		    			isReload:'true'
		    		});
		    		console.log('aaa');
		    	}.bind(this),
		    	error : function(){
		    		 alert('Can\'t get postings of a board!');
		    	}
		    });
		}
		
		
	}
	 


	
	deleteContent(_bId){ // 게시글 고유의 id를 이용해 게시글을 삭제하는 메소드
		$.ajax({ 
	    	type:"DELETE", // 게시글 삭제를 위해 DELETE type으로  서버에게 ajax 통신 요청
	    	url: '/react/posting/'+_bId, // 서버에 요청하는 URL, 서버에서 @PathVariable 어노테이션을 이용해 게시글 고유의 id값을 추출하기 위해 고유 아이디 값을 URL에 함께 붙혀 보낸다.	    	
	    	cache : false, 
	    	success : function() // 통신 성공 시 수행되는 메소드
	    	{ 
	    		// 삭제 시 처리되는 토글 로직
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
	    		}else{
		    		this.setState({
		    			isDeleted:'false',	    			
		    		});
		    	}		    		
	    		alert('Delete is completed!!');
	    	}.bind(this),
	    	error : function(){
	    		 alert('Can\'t delete the posting!');
	    	}
	    });		 
	}
		
	setShow(_index){ // react-bootstrap의 Alert 컴포넌트의 표시 상태를 관리하는 메소드
		this.setState({
			selectedItem:_index
		});
		// 토글로 관리
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
	
	handlePage(e){ // 페이징 처리를 위한 메소드, 합성 이벤트 e를 인자로 받는다.	
		this.setState({
			selectPage:parseInt(e.target.value), // 현재 선택된 페이지의 value 값을 selectPage state에 저장한다.
			priviousPage:parseInt(e.target.value) -1 // 현재 선택된 페이지의 value 값에서 -1한 값을 priviousPage state에 저장한다.
		});		
	}
	
	handlePageNum=()=>{ // 게시글의 수에 맞게 하단에 표시되는 버튼의 수를 관리하는 메소드
		// 페이지 버튼은 기본 1개가 존재해야 하므로 우선적으로 저장, 버튼에는 onClick 이벤트에 위의 handlePage() 메소드를 걸어준다.
		var _com =<Button variant="outline-info" onClick={(e)=>{this.handlePage(e)}} value={1} >1</Button>;
		
		if(this.state.values.length <= 10){ // 게시글을 10개 단위로 표시하기 때문에 10개 이하의 게시글이 존재하는 경우는 바로 버튼 한 개를 반환 해준다.		
			return _com;
		}else{ // 게시글의 수가 10개 이상일 경우
			var i =0; // 반복 횟수를 위한 변수
			var num =2; // 버튼 넘버링을 위한 변수
			while(i<parseInt(this.state.values.length/10)){ // 게시글의 수를 10으로 나누어 반복한다.
				if(this.state.values.length % 10 ===0 ){ // 10으로 나누어 떨어지는 경우 한 개의 공백 페이지 버튼이 생겨버리므로 
					i++; // i를 임의로 증가시켜 준다.
				}
				// _com 변수를 통해 지속해서 버튼을 이어 붙혀 준다.
				_com = <span>{_com} <Button variant="outline-info" onClick={(e)=>{this.handlePage(e)}} value={num}>{num}</Button></span>;
				
				i++; // 반복 횟수 증가
				
				if(i===parseInt(this.state.values.length/10)){ break;} // 반복횟수가 일치 할 경우 넘버링은 증가시키지 않고 반복문을 벗어난다.
				
				num++; // 넘버링 증가
			}		
		}		
		return _com; // 최종적인 _com을 반환해준다.
	}
	
	handleValueChange(e) { // 사용자의 검색을 위한 내용을 관리하는 메소드		
		this.setState({
			search:{
				title:e.target.value // 사용자가 입력한 정보의 value 값이 title state에 저장된다.
			}
		});	
	}
	
	render() {
		  
		  var contentList = this.state.values.map((_content,_index) => ( 
				  														<div key={_index}>
																		
																		{this.state.search.title ===''?((_index < (10*this.state.selectPage))&&((this.state.priviousPage*10)<=_index))&&
				  														<ListGroup horizontal>
		  																<ListGroup.Item className="content_writer">{_content.bName}</ListGroup.Item>
		  																
		  																{this.props.mode==='read'&&<LinkContainer to={`/react/postings/${_content.bId}`}>
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
		  																
		  																{this.props.mode==='read'&&<LinkContainer to={`/react/postings/${_content.bId}`}>
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
		  
		
		  
		
		
		
		  window.onbeforeunload =() => { // 새로 고침시 메인 페이지로 이동시킨다.
			  console.log('aaa');
			  <Redirect to="/react/index"/>
		  }
		  
        return(
        	<div className="read">
        	
    		{this.props.auth ==='' && (alert('Please select your Identity!!'),<Redirect to="/react/index"/>)}
    		{(this.props.auth ==='visitor' && (this.props.mode==='delete' || this.props.mode==='update'))&& (alert('You have no authority!'),<Redirect to="/react/index"/>)}
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
        	  		{this.handlePageNum()}
        	  		</div>
        	  </ButtonGroup>
        	</ButtonToolbar>     		
        	</div>
        );
    }
}

export default Read;