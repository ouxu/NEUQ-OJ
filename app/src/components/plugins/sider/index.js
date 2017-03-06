/**
 * Created by out_xu on 16/11/28.
 */
import React from "react";
import goto from '../../../utils/goto';
import {Menu, Icon, Tooltip} from "antd";
import ACMLogo1 from "../../../images/acm_logo_short.png";
import ACMLogo2 from "../../../images/acm_logo_long.png";
import "./index.less";
class Sider extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        sessionStorage.setItem("neuq_oj.navselect", e.key)
        goto(e.key)
    }

    render() {
        const navselect = sessionStorage.getItem('neuq_oj.navselect')?sessionStorage.getItem('neuq_oj.navselect'):'/homepage'
        return (
            <div id={this.props.collapse ? "sidercollapse" : "sidernormal"}>
                <div className="ant-layout-logo">
                    <img src={this.props.collapse ? ACMLogo1 : ACMLogo2} className="brand-logo" height="30px"/>
                </div>
                <Menu theme="dark"
                      onClick={this.handleClick.bind(this)}
                      defaultSelectedKeys={[navselect]}
                      mode="inline"
                >
                    <Menu.Item key={'/homepage'}>
                        <div className="showitem">
                            <span className="nav-text"><Icon type="home"/> 首页</span>
                        </div>
                        <div className="hideitem">
                            <Tooltip placement="right" title="首页" >
                                <span className="sidericon"><Icon type="home"/></span>
                            </Tooltip>
                        </div>
                    </Menu.Item>
                    <Menu.Item key={'/problems'}>
                        <span className="showitem">
                            <span className="nav-text"><Icon type="bars"/> 问题</span>
                        </span>
                        <span className="hideitem">
                            <Tooltip placement="right" title="问题">
                                <span className="sidericon"><Icon type="bars"/></span>
                            </Tooltip>
                        </span>

                    </Menu.Item>
                    <Menu.Item key={'/contests'}>
                        <span className="showitem">
                                <span className="nav-text"><Icon type="smile"/> 竞赛&作业</span>
                        </span>
                        <span className="hideitem">
                            <Tooltip placement="right" title="竞赛&作业">
                                <span className="sidericon"><Icon type="smile"/></span>
                            </Tooltip>
                            </span>
                    </Menu.Item>
                    <Menu.Item key={'/status'}>
                        <span className="showitem">
                            <span className="nav-text"><Icon type="clock-circle"/> 状态</span>
                        </span>
                        <span className="hideitem">
                                <Tooltip placement="right" title="状态">
                                <span className="sidericon"><Icon type="clock-circle"/></span>
                            </Tooltip>
                            </span>
                    </Menu.Item>
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

                </Menu>
            </div>

        );
    }

}

export default Sider;