
import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,Link,hashHistory,IndexRoute} from "react-router";
import $ from 'jquery';

import 'antd/dist/antd.css';
import './styleSheet/style.css'




import Search from "./component/Search"
import Chart from "./component/chart"
import Top250 from "./component/Top250"
import Detail from "./component/Detail"
import Personal from "./component/Personal"

let SET_CENTER={
	width:'1120px',
	margin:'auto',
}
let SET_COVER={
    width:'100%',
    height:'100%',
}
let COLOR={
    background:"url(http://img1.imgtn.bdimg.com/it/u=782700282,3984547803&fm=214&gp=0.jpg) center center/cover no-repeat"
}

import {Icon, Row, Col, Button,Menu} from 'antd';


class SiderDemo extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			current: 'search',
		};
		this.handleClick=this.handleClick.bind(this);

	}



	handleClick (e)  {
		// console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}
	render() {
		return(

			<div style={Object.assign(SET_COVER,COLOR)}>
                <div style={{position:"fixed",width:"100%"}}>
                    <header style={{background:'#8fc3cc'}}>
                        <div style={SET_CENTER}>
							<Row>
								<Col span={12}>
									<h1 style={{padding:'5px 0px',fontFamily:'幼圆',color:'#850dee'}}>
										<Icon style={{fontSize:30,marginRight:10}} type="smile-o" />
										豆瓣电影视窗
									</h1>
								</Col>
								<Col span={12} style={{textAlign:'right',lineHeight:'46px'}}>
									<Button type="primary" style={{display:!localStorage.getItem('user')?'display':'none',marginLeft:'10px'}}>
										<Link to="/Personal/Login">登录</Link>

									</Button>
									<Button  type="danger" style={{display:localStorage.getItem('user')?'display':'none',marginLeft:'10px'}}>
                                        登出
									</Button>
									<Button onClick={this.register} style={{marginLeft:'10px'}}>
                                        <Link to="/Personal/Register">注册</Link>
									</Button>
								</Col>
							</Row>


                        </div>
                    </header>
                    <nav style={{background:"rgba(255,255,255,.5)"}}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            style={Object.assign(SET_CENTER,{background:"rgba(255,255,255,0)"})}
                        >
                            <Menu.Item key="search">
                                <Link to="/Search"  />影片查询
                            </Menu.Item>
                            <Menu.Item key="hot">
                                <Link to="/Chart"  />正在热映
                            </Menu.Item>
                            <Menu.Item key="billboard">
                                <Link to="/Top250"  />TOP20
                            </Menu.Item>
                            <Menu.Item key="personal">
                                <Link to="/Personal/Info" />个人中心
                            </Menu.Item>

                        </Menu>
                    </nav>
                </div>



				<div style={Object.assign({},SET_CENTER,{paddingTop:'114px',boxSizing:'borderBox'})}>
					{this.props.children}
				</div>

                <div style={{position:'fixed',right:40,bottom:20}}>
                    <a href="#">点击资助</a>
                    <p>扫码资助</p>
                    <img src="" alt=""/>
                </div>

			</div>

		);
	}
}

ReactDOM.render(<Router history={hashHistory}>
	<Route path='/' component={SiderDemo}>
		<IndexRoute component={Search}></IndexRoute>
		<Route path='/Search' component={Search}></Route>
		<Route path='/Chart' component={Chart}></Route>
		<Route path='/Top250' component={Top250}></Route>
		<Route path='/Detail/:id' component={Detail}></Route>
		<Route path='/Personal/:type' component={Personal}></Route>

	</Route>
</Router>,document.getElementById('box'));

