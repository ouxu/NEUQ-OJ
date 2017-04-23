/**
 * Created by out_xu on 16/11/28.
 */
import React from 'react'
import { goto, jumpTo } from 'utils'
import { Menu } from 'antd'
import {Link} from 'react-router'
import ACMLogo1 from 'images/acm_logo_short.png'
import ACMLogo2 from 'images/acm_logo_long.png'

import './index.less'
import MenuItem from '../MenuItem'

class Sider extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    goto('/' + e.key)
    jumpTo('Navigation')
  }

  render () {
    const {navselect, collapse} = this.props
    return (
      <div id={collapse ? 'sidercollapse' : 'sidernormal'}>
        <div className='ant-layout-logo'>
          <Link to='/' >
            <img src={this.props.collapse ? ACMLogo1 : ACMLogo2} className='brand-logo' height='30px' />
          </Link>
        </div>
        <Menu
          theme='dark'
          onClick={this.handleClick}
          defaultSelectedKeys={[navselect]}
          mode='inline'
        >
          {MenuItem('normal')}
        </Menu>
      </div>

    )
  }
}

export default Sider
