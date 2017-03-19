/**
 * Created by out_xu on 17/3/19.
 */

import React from 'react';
import {Menu, Icon, Tooltip} from "antd";

const SubMenu = Menu.SubMenu;

const MenuItem = {
    normal: [
        <Menu.Item key={'/homepage'}>
            <div className="showitem">
                <span className="nav-text"><Icon type="home"/> 首页</span>
            </div>
            <div className="hideitem">
                <Tooltip placement="right" title="首页">
                    <span className="sidericon"><Icon type="home"/></span>
                </Tooltip>
            </div>
        </Menu.Item>,
        <Menu.Item key={'/problems'}>
            <span className="showitem">
            <span className="nav-text"><Icon type="bars"/> 问题</span>
            </span>
            <span className="hideitem">
            <Tooltip placement="right" title="问题">
            <span className="sidericon"><Icon type="bars"/></span>
            </Tooltip>
            </span>

        </Menu.Item>,
        <Menu.Item key={'/contests'}>
            <span className="showitem">
            <span className="nav-text"><Icon type="smile"/> 竞赛&作业</span>
            </span>
            <span className="hideitem">
            <Tooltip placement="right" title="竞赛&作业">
            <span className="sidericon"><Icon type="smile"/></span>
            </Tooltip>
            </span>
        </Menu.Item>,
        <Menu.Item key={'/status'}>
            <span className="showitem">
            <span className="nav-text"><Icon type="clock-circle"/> 状态</span>
            </span>
            <span className="hideitem">
            <Tooltip placement="right" title="状态">
            <span className="sidericon"><Icon type="clock-circle"/></span>
            </Tooltip>
            </span>
        </Menu.Item>,
        <Menu.Item key={'/ranklist'}>
            <span className="showitem">
            <span className="nav-text"><Icon type="area-chart"/> 排名</span>
            </span>
            <span className="hideitem">
            <Tooltip placement="right" title="排名">
            <span className="sidericon"><Icon type="area-chart"/></span>
            </Tooltip>
            </span>
        </Menu.Item>
    ],
    admin : []
};

export default (item)=>{
    return MenuItem[item]
}