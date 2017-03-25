/**
 * Created by out_xu on 17/3/19.
 */
import React from "react";
import {Menu} from "antd";
import goto from "../../../../utils/goto";

const SubMenu = Menu.SubMenu;

const handleClick = (e) => {
    goto(`admin/${e.key}`);
};

const AdminSider = () => (
    <Menu
        mode="inline"
        style={{width: 200}}
        defaultOpenKeys={['group', 'contest', 'problem']}
        defaultSelectedKeys={['home']}
        onClick={handleClick}
    >
        <Menu.Item key="home">主页管理</Menu.Item>
        <SubMenu key="group" title={<span>小组管理</span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="contest" title={<span>竞赛管理</span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
        </SubMenu>
        <SubMenu key="problem" title={<span>题目管理</span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
    </Menu>
);


export default AdminSider;
