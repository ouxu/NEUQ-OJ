/**
 * Created by out_xu on 16/11/8.
 */
import React from 'react'
import { Icon } from 'antd'
import Login from '../../user/loginabout'
import { Link } from 'react-router'
import './index.less'

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillMount () {

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

  render () {
    const {user: {islogined}} = this.props
    const role=window.localStorage.getItem('neuq_oj.role')

    return (
      <div id='navigation'>
        <nav role='navigation'>
          <ul key={'navigation-ul'}>
            <li className='othernav'><Link to='/'>OJ首页</Link></li>
            <li className='othernav'><a href='http://geek.acmclub.cn'>极客社区</a></li>
            <li className='othernav'><a href='http://www.acmclub.cn'>ACM俱乐部</a></li>
            {
              this.props.admin &&
              <li><Link to={'/'}> 返回主页 <Icon type='logout'/></Link></li>
            }
            { islogined
              ? <li className='userinfo'>
                <a>
                  <div className='userinfo-name'><Icon type='user'/> {window.localStorage['neuq_oj.name']}</div>
                </a>
                <ul>
                  <li>
                    <Link to={`/userpage/${window.localStorage['neuq_oj.id']}`}>
                      <Icon type='solution'/> 个人信息
                    </Link>
                  </li>
                  {(!!role && role !== 'user') && <li>
                    <Link to={'/admin'}>
                      <Icon type='login'/> 后台管理
                    </Link>
                  </li>}
                  <li><a onClick={this.props.logout}><Icon type='export'/> 登出</a></li>
                </ul>
              </li>
              : <Login />
            }

          </ul>
        </nav>
      </div>
    )
  }
}

export default Navigation
