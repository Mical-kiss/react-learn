import React from "react";



import { Row, Col,Tag ,Rate} from 'antd';

import $ from 'jquery';

import '../styleSheet/dot.css'

class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state={};
	}
	componentDidMount(){
		console.log(123);
		var _this=this;
		$.ajax({
			type:'get',
			dataType:'jsonp',
			url:"https://api.douban.com/v2/movie/subject/"+_this.props.params.id,
			success:function (data) {
				console.log(data);
				_this.setState({
					detail:data
				})
            }
		})
	}
	render(){

		var jsx=[];
		if(this.state.detail){
			// console.log(this.state.detail.casts)
            var directors='';
            for(var i=0;i<this.state.detail.directors.length;i++){
                directors+=this.state.detail.directors[i].name+'/'
            }
			var casts='';
            var casBox=[];
			for(var i=0;i<this.state.detail.casts.length;i++){
				casts+=this.state.detail.casts[i].name+'/';
				casBox.push(
					<Col key={2*i} className="gutter-row" span={6}>
						<div style={{margin:'0 auto',width:'100px'}}>
							<div className="gutter-box" style={{height:150,width:100,background:`url(${this.state.detail.casts[i].avatars.small}) center center/cover`}}></div>
							<p>{this.state.detail.casts[i].name}</p>
						</div>

					</Col>
				)
			}
			var countries='';
            for(var i=0;i<this.state.detail.countries.length;i++){
                countries+=this.state.detail.countries[i]+'/'
            }
            var genres='';
            for(var i=0;i<this.state.detail.genres.length;i++){
                genres+=this.state.detail.genres[i]+'/'
            }
            var aka='';
            for(var i=0;i<this.state.detail.aka.length;i++){
                aka+=this.state.detail.aka[i]+'/'
            }


			jsx.push(
				<Row key="1">
					<Col span={6} style={{background:'blue'}}>
						<div style={{background:`url(${this.state.detail.images.large}) center center/cover`,width:280,height:414}}></div>
					</Col>
					<Col span={18} style={{color:'#000',lineHeight:'1.7',padding:'0 10px 0 20px'}}>
						<p>{`导演：${directors}`}</p>
						{/*<p>编剧：{}</p>*/}
						<p>{`主演：${casts}`}</p>
						<p>{`类型：${genres}`}</p>
						<p>{`制片国家/地区：${countries}`}</p>
						{/*<p>语言：{this.state.detail.}</p>*/}
						{/*<p>上映时间：{this.state.detail.}</p>*/}
						{/*<p>片长：{this.state.detail.}</p>*/}
						<p>{`又名：${aka}`}</p>
                        <p>{`上映时间：${this.state.detail.year}`}</p>
						{/*<p>IMDb链接：{this.state.detail.}</p>*/}
						<p>豆瓣评分：{this.state.detail.rating.average}分</p>
                        <Rate disabled value={Math.round(this.state.detail.rating.average/2)} />
                        <p>简介：</p>
                        <p className="">{this.state.detail.summary}</p>
						<p style={{color:'#850dee'}}>演员列表:</p>
						<Row gutter={16}>
							{casBox}
						</Row>
					</Col>
				</Row>
			)


		}
		return(
			<div style={{background:'rgba(255,255,255,.5)',padding:'0 10px 10px'}}>
				<h2 style={{lineHeight:1.8}}>片名：<span style={{fontSize:32}}>{this.state.detail?this.state.detail.title:''}</span></h2>
                {jsx}
			</div>
		)
	}
}

export default Detail;