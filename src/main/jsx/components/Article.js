import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Selector from './Selector';
import Header from './Header';
import Create from './Create';
import Home from './Home';
import Read from './Read';
import Posting from './Posting';
import { Redirect } from 'react-router-dom';

import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';




class Article extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      // 각 모드에 맞게 desc를 전달해주는 state		
	      welcome:{desc:'Hello, Welcome to the Simple CRUD!!'},
	      read:{desc:'No more postings!!'},
	      create:{desc:'Write a posting'},
	      update:{desc:'Choose title of a posting that you want to update',update:'Modify your posting!'},
	      delete:{desc:'Choose title of a posting that you want to delete'},
	      isLogin:'',
	     
	    };
	  }
	
	
	parentCallback=(dataFromChild)=>{ // 자식 컴포넌트인 Home컴포넌트에서 선택한 Identity를 state에 set 해주는 메소드
        this.setState({
            isLogin: dataFromChild
        });     
    }
	
	
	
	
	render() {
		
        return(
        	
        	<article className="article">
        	<Header></Header> 
        	<Selector></Selector>      	
			<Switch>
				<Route exact path = "/react/index" render={ props => <Home callbackFromParent={this.parentCallback} desc={this.state.welcome.desc}/>}/>
				<Route exact path="/react/create" render={ props => <Create auth={this.state.isLogin} desc={this.state.create.desc} mode={'create'} />}/>	
				<Route exact path="/react/postings" render={ props => <Read auth={this.state.isLogin} desc={this.state.read.desc} mode={'read'} reload={this.state.isReload} />}/>
				<Route exact path="/react/postings/:bId" component={Posting}/>
				<Route exact path="/react/update/:bId" render={ (props) => <Create desc={this.state.update.update} mode={'update'} {...props}/>}/>
				<Route exact path="/react/update" render={ props => <Read auth={this.state.isLogin} desc={this.state.update.desc}  mode={'update'} />}/>
				<Route exact path="/react/delete" render={ props => <Read auth={this.state.isLogin} desc={this.state.delete.desc}  mode={'delete'}/>}/>				
		    </Switch>	           
        	</article>    	
        );
    }
}

export default Article;