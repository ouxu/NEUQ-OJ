/**
 * Created by out_xu on 17/3/19.
 */
import React from 'react'
import { Menu } from 'antd'
import goto from '../../../../utils/goto'
import jumpTo from '../../../../utils/windowScroll'

const SubMenu = Menu.SubMenu

const handleClick = (e) => {
  goto(`/admin/${e.key}`)
  jumpTo('navigation')
}

const role = window.localStorage.getItem('neuq_oj.role')

const AdminSider = (props) => (
  <Menu
    mode='inline'
    style={{width: 200}}
    defaultOpenKeys={['home', 'contest', 'problem']}
    defaultSelectedKeys={[props.select]}
    onClick={handleClick}
  >
    {
      role === 'admin' &&
      <SubMenu key='home' title={<span>主页管理</span>}>
        <Menu.Item key='news'>通知管理</Menu.Item>
      </SubMenu>
    }
    <SubMenu key='group' title={<span>小组管理</span>}>
      <Menu.Item key='1'>Option 1</Menu.Item>
      <Menu.Item key='2'>Option 2</Menu.Item>
      <Menu.Item key='3'>Option 3</Menu.Item>
      <Menu.Item key='4'>Option 4</Menu.Item>
    </SubMenu>
    <SubMenu key='contest' title={<span>竞赛管理</span>}>
      <Menu.Item key='contest-list'>竞赛列表</Menu.Item>
      <Menu.Item key='contest-edit'>添加竞赛</Menu.Item>
    </SubMenu>
    <SubMenu key='problem' title={<span>题目管理</span>}>
      <Menu.Item key='problem-list'>题目列表</Menu.Item>
      <Menu.Item key='problem-edit'>创建题目</Menu.Item>
      <Menu.Item key='problem-upload'>题目导入</Menu.Item>
    </SubMenu>
    {
      role === 'admin' &&
      <SubMenu key='system' title={<span>系统管理</span>}>
        <Menu.Item key='team-generator'>账号生成</Menu.Item>
      </SubMenu>
    }

  </Menu>
)

export default AdminSider
