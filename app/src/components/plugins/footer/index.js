/**
 * Created by out_xu on 16/11/26.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './index.less';

const Footer =({year})=>{
    return(
        <QueueAnim delay={400} >
            <div id="ant-layout-footer" key="footer-1">
                <p > NEUQ ACM OJ 版权所有 © {year} 由ACM club技术部支持</p>
            </div>
        </QueueAnim>
    )
}

export default Footer;