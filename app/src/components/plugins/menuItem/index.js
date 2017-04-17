/**
 * Created by out_xu on 17/3/19.
 */

import React from 'react'
import { Icon, Menu, Tooltip } from 'antd'
import {Link }from 'react-router'
const MenuItem = {
  normal: [
    <Menu.Item key={'homepage'}>
      <Link to="/homepage" className='showitem'>
        <span className='nav-text'><Icon type='home' /> 首页</span>
      </Link>
      <Link to="/homepage" className='hideitem'>
        <Tooltip placement='right' title='首页'>
          <span className='sidericon'><Icon type='home' /></span>
        </Tooltip>
      </Link>
    </Menu.Item>,
    <Menu.Item key={'problems'}>
      <Link to="/problems" className='showitem'>
        <span className='nav-text'><Icon type='bars' /> 问题</span>
      </Link>
      <Link to="/problems" className='hideitem'>
        <Tooltip placement='right' title='问题'>
          <span className='sidericon'><Icon type='bars' /></span>
        </Tooltip>
      </Link>
    </Menu.Item>,
    <Menu.Item key={'contests'}>
      <Link to="/contests" className='showitem'>
        <span className='nav-text'><Icon type='smile' /> 竞赛&作业</span>
      </Link>
      <Link to="/contests" className='hideitem'>
        <Tooltip placement='right' title='竞赛&作业'>
          <span className='sidericon'><Icon type='smile' /></span>
        </Tooltip>
      </Link>
    </Menu.Item>,
    <Menu.Item key={'status'}>
      <Link to="/status" className='showitem'>
        <span className='nav-text'><Icon type='clock-circle' /> 状态</span>
      </Link>
      <Link to="/status" className='hideitem'>
        <Tooltip placement='right' title='状态'>
          <span className='sidericon'><Icon type='clock-circle' /></span>
        </Tooltip>
      </Link>
    </Menu.Item>,
    <Menu.Item key={'ranklist'}>
      <Link to="/ranklist" className='showitem'>
        <span className='nav-text'><Icon type='area-chart' /> 排名</span>
      </Link>
      <Link to="/ranklist" className='hideitem'>
        <Tooltip placement='right' title='排名'>
          <span className='sidericon'><Icon type='area-chart' /></span>
        </Tooltip>
      </Link>
    </Menu.Item>
  ],
  admin: []
}

export default item => MenuItem[item]
