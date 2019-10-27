import React from "react";

var echarts = require('echarts');

import $ from 'jquery';

import { Button ,Tabs,Spin, message} from 'antd';

const TabPane = Tabs.TabPane;

class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.timer=null;
        this.flag= [1,1,1,1,1];
        this.tap=this.tap.bind(this);
        this.callback=this.callback.bind(this);
    }

    getData(link,box,key=1){
        var oCover=document.getElementById('cover');
        var xAxis=[];
        var aScore=[];


        oCover.style.display='block';
        clearTimeout(this.timer);
        this.timer=setTimeout(function () {
            oCover.style.display='none';
            message.error('加载超时');
        },4000);
        var _this=this;
        $.ajax({
            type:'get',
            dataType:'jsonp',
            url:"https://api.douban.com/v2/movie/"+link,
            success:function(data){
                console.log(data.subjects);
                clearTimeout(_this.timer);
                if(data.subjects[0].title){
                    data.subjects.forEach(function(value,index){
                        xAxis.push(value.title);
                        aScore.push(value.rating.average);
                    })
                }else{
                    data.subjects.forEach(function(value,index){
                        xAxis.push(value.subject.title);
                        aScore.push(value.subject.rating.average);
                    })
                }

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(box));
                // 绘制图表
                myChart.setOption(
                    {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['豆瓣评分']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis:  {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        series: [
                            {
                                name: '豆瓣评分',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: aScore
                            }
                        ]
                    }
                );
                oCover.style.display='none';
                _this.flag[key-1]=0;
            }
        })
    }
	tap(e){
        var sParams=e.target.getAttribute('data-link');
        var sId=e.target.getAttribute('data-box');

        this.getData(sParams,sId);
	}
	callback(key){
	    this.aParams=['in_theaters','coming_soon','weekly','us_box','new_movies'];
	    this.aId=['mChart1','mChart2','mChart3','mChart4','mChart5'];

	    if(this.flag[key-1]){
	        this.getData(this.aParams[key-1],this.aId[key-1],key)
        }
    }

	render(){
		return(
			<div>
                <div style={{background:'rgba(255,255,255,.5)',height: '500px',position:'relative'}}>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition='left'
                        style={{ height: '500px',marginTop:'5%' }}
                        onChange={this.callback}
                    >
                        <TabPane  tab="正在热映" key="1" data-link="in_theaters" data-box="mChart1">
                            <div style={{width:'100%',height:'500px'}} id='mChart1'></div>
                            <Button style={{position:'absolute',right:5,top:5,zIndex:'999'}} onClick={this.tap} data-link="in_theaters" data-box="mChart1" type="primary">刷新数据</Button>
                        </TabPane>
                        <TabPane  tab="即将上映" key="2">
                            <div style={{width:'100%',height:'500px'}} id='mChart2'></div>
                            <Button style={{position:'absolute',right:5,top:5,zIndex:'999'}} onClick={this.tap} data-link="coming_soon" data-box="mChart2" type="primary">刷新数据</Button>

                        </TabPane>
                        <TabPane  tab="口碑榜" key="3">
                            <div style={{width:'100%',height:'500px'}} id='mChart3'></div>
                            <Button style={{position:'absolute',right:5,top:5,zIndex:'999'}} onClick={this.tap} data-link="weekly" data-box="mChart3" type="primary">刷新数据</Button>

                        </TabPane>
                        <TabPane  tab="北美票房榜" key="4">
                            <div style={{width:'100%',height:'500px'}} id='mChart4'></div>
                            <Button style={{position:'absolute',right:5,top:5,zIndex:'999'}} onClick={this.tap} data-link="us_box" data-box="mChart4" type="primary">刷新数据</Button>

                        </TabPane>
                        <TabPane  tab="新片榜" key="5">
                            <div style={{width:'100%',height:'500px'}} id='mChart5'></div>
                            <Button style={{position:'absolute',right:5,top:5,zIndex:'999'}} onClick={this.tap} data-link="new_movies" data-box="mChart5" type="primary">刷新数据</Button>

                        </TabPane>
                    </Tabs>
                    <div id="cover" style={{display:'none',position:'absolute',top:0,right:0,lineHeight:'500px',width:'87.5%',textAlign:'center',background:'rgba(0,0,0,.5)'}}>
                        <Spin size="large"  />
                    </div>
                </div>


			</div>
		)
	}
	componentDidMount(){
        this.getData('in_theaters','mChart1');
    }
}

export default Chart; 