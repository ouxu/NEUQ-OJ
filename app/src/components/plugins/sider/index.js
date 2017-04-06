/**
 * Created by out_xu on 16/11/28.
 */
import React from 'react'
import {goto} from '../../../utils'
import { Menu } from 'antd'
import ACMLogo1 from '../../../images/acm_logo_short.png'
import ACMLogo2 from '../../../images/acm_logo_long.png'
import './index.less'
import jumpTo from '../../../utils/windowScroll'

import MenuItem from '../menuItem/'

class Sider extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    goto('/' + e.key)
    jumpTo('navigation')
  }

  render () {
    const {navselect, collapse} = this.props
    return (
      <div id={collapse ? 'sidercollapse' : 'sidernormal'}>
        <div className='ant-layout-logo'>
          <img src={this.props.collapse ? ACMLogo1 : ACMLogo2} className='brand-logo' height='30px' />
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
