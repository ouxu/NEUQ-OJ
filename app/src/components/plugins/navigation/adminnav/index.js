/**
 * Created by out_xu on 17/3/19.
 */
import React from 'react';
import ACMLogo1 from '../../../../images/acm_logo_long.png';
import { Link } from 'react-router';
import { Icon } from 'antd';

import './index.less';

function AdminNavigation() {
  return (
    <div id="navigation" key="navigation">
      <nav role="navigation">
        <Link className="navigation-left" to="/">
          <img src={ACMLogo1} className="return-logo" />
        </Link>
        <ul key={'navigation-ul'}>
          <li className="othernav"><Link to="/">OJ首页</Link></li>
          <li className="othernav"><a href="http://geek.acmclub.cn">极客社区</a></li>
          <li className="othernav"><a href="http://www.acmclub.cn">ACM俱乐部</a></li>
          <li><Link to={'/'}>返回主页 <Icon type="logout" /></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavigation;
