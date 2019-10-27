import React from "react";


import $ from 'jquery';

//import '../styleSheet/style.css'

import { Icon, Button, Input, AutoComplete,Tag  } from 'antd';
const Option = AutoComplete.Option;



var i=0;

function renderOption(item) {

    return (
        <Option key={i++} text={item.title}>
            <a  style={{color:'#333'}}
                href={`https://www.douban.com/search?q=${item.title}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.title}
            </a>
        </Option>
    );
}

class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            dataSource: [],
        };
		this.timer=null;
        this.handleSearch=this.handleSearch.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.tap=this.tap.bind(this);
	}

    tap(){
	    console.log(123);
        console.log(this.refs)
        console.log(document.getElementById('ipt1').value)
        window.location.href="https://www.douban.com/search?q="+document.getElementById('ipt1').value;
    }
    onSelect(value) {
        console.log(value);
        console.log(this.state.dataSource);
        console.log(this.state.dataSource[value].title);
        window.location.href="https://www.douban.com/search?q="+this.state.dataSource[value].title;
    }
    handleSearch (value)  {
	    var _this=this;
	    var aData=null;
	    clearTimeout(this.timer);
	    this.timer=setTimeout(function () {
            $.ajax({
                type: 'get',
                dataType: 'jsonp',
                url: "https://api.douban.com/v2/movie/search?q="+value,
                success: function (data) {
                    console.log(data);
                    aData=data.subjects;
                    if(aData){
                        _this.setState({
                            dataSource: value ? aData : [],
                        });
                    }else{
                        _this.setState({
                            dataSource: aData ? ['么有结果'] : [],
                        });
                    }

                }
            })
        },400)



    }
	render(){
        const { dataSource } = this.state;
        return (
            <div className="global-search-wrapper" style={{width: 300 ,position:'absolute',right:'30%',top:'45%' }}>
                <AutoComplete
                    className="global-search"
                    size="large"
                    style={{ width: '100%',boxShadow:'-2px 4px 5px #999',marginBottom:'10px'}}
                    dataSource={dataSource.map(renderOption)}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="输入搜索内容"
                    optionLabelProp="text"
                >
                    <Input ref="ipt1" id="ipt1"
                        suffix={(
                            <Button  onClick={this.tap} className="search-btn" size="large" type="primary">
                                <Icon type="search" />
                            </Button>
                        )}
                    />
                </AutoComplete>
                <Tag color="pink">电影</Tag>
                <Tag color="red">影评</Tag>
                <Tag color="green">导演</Tag>
                <Tag color="cyan">演员</Tag>



            </div>
        );
	}

	componentDidMount(){

	}
}

export default Search;