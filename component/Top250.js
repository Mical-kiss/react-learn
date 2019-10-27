import React from "react";

import $ from 'jquery';

import {Button,Carousel,Row,Col } from 'antd';
import {Link} from 'react-router'

import '../styleSheet/style.css'

class Top250 extends React.Component{
	constructor(props){
		super(props);
		this.tap=this.tap.bind(this);
		this.state={};
	}
	tap(){
		var _this=this;

		$.ajax({
            type:'get',
            dataType:'jsonp',
            url:"https://api.douban.com/v2/movie/top250",
			success:function (data) {
				console.log(data.subjects);
				_this.setState({
					data:data.subjects
				})
            }
		})
	}
	componentDidMount(){
		this.tap();
	}
	render(){
		var jsx=[[],[],[],[],[]];
		if(this.state.data){
            this.state.data.forEach((value,index)=>{
            	/*console.log(index);
            	console.log(Math.floor(index/4))*/
                jsx[Math.floor(index/4)].push(

						<Col key={value.id} className="gutter-row" span={6} style={{background:'rgba(255,255,255,.5)'}}>
							<Link to={`/Detail/${value.id}`}>
								<div  style={{width:"180px" ,margin:'10px auto 0',height:"252px",background:`url(${value.images.medium}) center center/cover`}} ></div>

								<div style={{textIndent:'3rem',lineHeight:'1.8'}}>
									<h3>片名：{value.title}</h3>
									<p>评分：{value.rating.average}</p>
								</div>
							</Link>

						</Col>


                );
            })
		}

		return(
			<div style={{}}>

				<Carousel vertical autoplay >
					<div style={{minHeight:'618px',padding:"0px 0px"}}>
						<Row gutter={16}>
							{jsx[0]}
						</Row>
						<Row gutter={16}>
                            {jsx[1]}
						</Row>
					</div>
					<div style={{minHeight:'618px',padding:"0px 0px"}}>
						<Row gutter={16}>
                            {jsx[2]}
						</Row>
						<Row gutter={16} >
                            {jsx[3]}
						</Row>
					</div>
					<div style={{minHeight:'618px',padding:"0px 0px"}}>
						<Row gutter={16}>
                            {jsx[4]}
						</Row>
					</div>
				</Carousel>
                <Button style={{float:'right'}} onClick={this.tap} type="primary">刷新数据</Button>
			</div>
		)
	}
}

export default Top250;