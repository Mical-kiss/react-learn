import React from 'react'
/*import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;*/

import { Table } from 'antd';
import reqwest from 'reqwest';

import '../styleSheet/style.css'

/*---------------------------------------------------*/
import {Avatar , Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Menu} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


const columns = [{
	title: 'Name',
	dataIndex: 'name',
	sorter: true,
	render: name => `${name.first} ${name.last}`,
	width: '20%',
}, {
	title: 'Gender',
	dataIndex: 'gender',
	filters: [{
			text: 'Male',
			value: 'male'
		},
		{
			text: 'Female',
			value: 'female'
		},
	],
	width: '20%',
}, {
	title: 'Email',
	dataIndex: 'email',
}];


const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleConfirmBlur=this.handleConfirmBlur.bind(this);
        this.checkPassword=this.checkPassword.bind(this);
        this.checkConfirm=this.checkConfirm.bind(this);

    }

    handleSubmit  (e)  {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur  (e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword  (rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm (rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        console.log(getFieldDecorator('email', {
            rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
            }, {
                required: true, message: 'Please input your E-mail!',
            }],
        }))

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 64 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );



        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              Nickname&nbsp;
                            <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Habitual Residence"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                    })(
                        <Cascader options={residences} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
/*-----------------------------------------------------*/



class NormalLoginForm extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit (e) {
        e.preventDefault();
        console.log(this.props)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Personal extends React.Component{
    constructor(props){
        super(props);
        this.state={
        	data: [],
    		pagination: {},
    		loading: false,
        }
    }
    
    handleTableChange  (pagination, filters, sorter)  {
    	const pager = this.state.pagination;
    	pager.current = pagination.current;
    	this.setState({
    		pagination: pager,
    	});
    	this.fetch({
    		results: pagination.pageSize,
    		page: pagination.current,
    		sortField: sorter.field,
    		sortOrder: sorter.order,
    		...filters,
    	});
    }
  

    tap(){
        document.getElementById('box1').style.display='block'
    }
    render(){
        return(
            <div>
                <div style={{display:this.props.params.type=='Login'?'block':'none',position:'absolute',top:0,right:0,bottom:0,left:0,margin:'auto',width:400,height:250,padding:20,background:'rgba(255,255,255,.5)'}}>
                    <WrappedNormalLoginForm />
                </div>
                <div style={{display:this.props.params.type=='Register'?'block':'none',position:'absolute',top:0,right:0,bottom:0,left:0,margin:'auto',width:400,height:550,padding:20,background:'rgba(255,255,255,.5)'}}>
                    <WrappedRegistrationForm/>
                </div>
                <div style={{display:this.props.params.type=='Info'?'block':'none',position:'absolute',top:0,right:0,bottom:0,left:0,margin:'auto',width:400,height:250,padding:20,background:'rgba(255,255,255,.5)'}}>
                    <span>未完待续……</span>
                </div>
                
                
            </div>

        )
    }
}

export default Personal