/**
 * Created by out_xu on 17/3/19.
 */
import React, {Component} from 'react'
import QueueAnim from 'rc-queue-anim'
import Footer from '../plugins/footer'
import Navigation from '../../components/plugins/navigation/adminnav'
import AdminSider from '../../components/plugins/sider/adminsider'
import './index.less'

class AdminComponent extends Component {
  render () {
    const {path = 'home'} = this.props.routes[1]
    return (
      <QueueAnim id='admin' type={['left', 'right']} delay={100}>
        <Navigation />
        <QueueAnim className='admin-wrap' key='admin-wrap' type={['left', 'right']} delay={100}>
          <div className='admin-sider' key='admin-sider'>
            <AdminSider
              select={path}
                        />
          </div>
          <div className='admin-main' key='admin-main'>
            {this.props.children}
          </div>
        </QueueAnim>
        <Footer />
      </QueueAnim>
    )
  }
}

AdminComponent.propTypes = {}
AdminComponent.defaultProps = {}

export default AdminComponent
