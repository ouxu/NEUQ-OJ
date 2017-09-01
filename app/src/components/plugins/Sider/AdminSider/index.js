/**
 * Created by out_xu on 17/3/19.
 */
import React from 'react'
import { Menu } from 'antd'
import { goto, jumpTo } from 'utils'

const SubMenu = Menu.SubMenu

const handleClick = (e) => {
  goto(`/admin/${e.key}`)
  jumpTo('navigation')
}

const AdminSider = props => (
  <Menu
    mode='inline'
    style={{width: 200}}
    defaultOpenKeys={['home', 'contest', 'problem']}
    defaultSelectedKeys={[props.select]}
    onClick={handleClick}
  >
    {
      window.localStorage.getItem('neuq_oj.role') === 'admin' &&
      <SubMenu key='home' title={<span>主页管理</span>}>
        <Menu.Item key='news'>通知管理</Menu.Item>
      </SubMenu>
    }
    {/*<SubMenu key='group' title={<span>用户组管理</span>}>*/}
      {/*<Menu.Item key='groups-list'>用户组列表 </Menu.Item>*/}
      {/*<Menu.Item key='group-create'>创建用户组 </Menu.Item>*/}
      {/*<Menu.Item key='group-manage' disabled>用户组管理</Menu.Item>*/}
    {/*</SubMenu>*/}
    <SubMenu key='contest' title={<span>竞赛管理</span>}>
      <Menu.Item key='contest-list'>竞赛列表</Menu.Item>
      <Menu.Item key='contest-edit'>添加竞赛</Menu.Item>
    </SubMenu>
    <SubMenu key='problem' title={<span>题目管理</span>}>
      <Menu.Item key='problem-list'>题目列表</Menu.Item>
      <Menu.Item key='problem-edit'>创建题目</Menu.Item>
      <Menu.Item key='problem-tag'>标签管理</Menu.Item>
      <Menu.Item key='problem-upload'>题目导入</Menu.Item>
    </SubMenu>
    <SubMenu key='machine' title={<span>判题管理</span>}>
      <Menu.Item key='machine-list'>机器列表</Menu.Item>
      <Menu.Item key='machine-edit'>机器管理</Menu.Item>
      {/*<Menu.Item key='machine-delete'>机器添加</Menu.Item>*/}
    </SubMenu>
    {
      window.localStorage.getItem('neuq_oj.role') === 'admin' &&
      <SubMenu key='system' title={<span>系统管理</span>}>
        <Menu.Item key='team-generator'>账号生成</Menu.Item>
      </SubMenu>
    }
  </Menu>
)

export default AdminSider
