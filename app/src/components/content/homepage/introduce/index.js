/**
 * Created by out_xu on 16/11/29.
 */
import React from 'react'
import { Link } from 'react-router'
import { Card } from 'antd'
import './index.less'

class Introduce extends React.Component {
  render () {
    return (
      <div className='home-introduce'>
        {this.props.introduce.map((t, i) =>
          <Card title={t.title} extra={<Link to='/admin'>More</Link>} style={{ marginBottom: 15, fontSize: 14 }} key={i + 200} >
            {t.content}
          </Card>,
                )}
      </div>
    )
  }
}

export default Introduce
