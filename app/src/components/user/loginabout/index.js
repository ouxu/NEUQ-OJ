import React from 'react'
import { Button, Form, Icon, Input, Modal } from 'antd'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../../actions'
import { goto, verify } from '../../../utils'
import './index.less'

const FormItem = Form.Item
const ButtonGroup = Button.Group

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  const actions = {login}
  return {action: bindActionCreators(actions, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class LoginAbout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleGoto = this.handleGoto.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {identifier, password} = values
        const body = {identifier, password}
        this.props.action.login(body)
        this.setState({
          visible: false
        })
      }
    })
  }

  showModal () {
    this.setState({
      visible: true
    })
  }

  handleCancel () {
    this.setState({
      visible: false
    })
  }

  handleGoto () {
    goto('register')
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <li className='nav-ul-user'>
        <QueueAnim delay={150}>
          <div className='userlogin-warp' key='userlogin-1'>
            <ButtonGroup>
              <Button className='nav-button' onClick={this.showModal}>登录 </Button>
              <span className='middle-warp'> | </span>
              <Button className='nav-button' onClick={this.handleGoto}> 注册</Button>
            </ButtonGroup>
          </div>
        </QueueAnim>

        <Modal
          title='登录NEUQ-OJ'
          visible={this.state.visible}
          footer={null}  // 清楚脚部回调
          onCancel={this.handleCancel}
          width={300}
          onOk={null}
        >
          <div className='login-wrap'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('identifier', {
                  rules: [{
                    required: true, message: '请输入UserName/手机号/邮箱'
                  }]
                })(
                  <Input addonBefore={<Icon type='user' />} placeholder='UserName/手机号/邮箱' />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    pattern: verify.password, message: '请输入有效的密码(6-18位)'
                  }, {
                    required: true, message: '请输入密码！'
                  }]
                })(
                  <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Password' />,
                )}
              </FormItem>

              <Button disabled={false} type='primary' htmlType='submit' id='login-btn'>登录</Button>
              <Link to={'/register'}>
                <span onClick={this.handleCancel}>注册账号</span>
              </Link>
              <Link to={'/forget'}>
                <span className='login-form-forgot' onClick={this.handleCancel}>忘记密码</span>
              </Link>
            </Form>
          </div>
        </Modal>
      </li>
    )
  }
}

export default LoginAbout
