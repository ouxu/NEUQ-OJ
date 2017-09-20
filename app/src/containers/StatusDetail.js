/**
 * Created by out_xu on 17/9/21.
 */
import React, { Component } from 'react'
import { Card } from 'antd'
import * as requestService from 'utils/request'
import API from 'api'
import { Link } from 'react-router'
class StatusDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      created_at: '',
      private: 0,
      source: ''
    }
  }

  componentDidMount () {
    const {params} = this.props
    const {id = ''} = params
    requestService.tget(API.statusDetail.replace(':id', id)).then(res => this.setState(res))
  }

  render () {
    const {params} = this.props
    const {id = ''} = params
    const style = {
      body: {},
      wrap: {
        background: '#fff',
        padding: 8
      },
      title: {
        fontSize: 18,
        fontWeight: 300
      }
    }
    return (
      <Card style={style.wrap} bodyStyle={style.body}
        title={(
          <span style={style.title}>
            <Link to='/status'>#Status</Link> - {id}
          </span>
        )}
        extra={(
          <span style={style.title}>
            {this.state.created_at}
          </span>
        )}
      >
        <pre>
          {this.state.source}
        </pre>
      </Card>
    )
  }
}

export default StatusDetail
