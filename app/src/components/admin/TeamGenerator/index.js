import React, {Component} from 'react'
import './index.less'
import {Button, Form, Input, Table} from 'antd'

const FormItem = Form.Item
import QueueAnim from 'rc-queue-anim'

@Form.create()
class TeamGenerator extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    const columns = [{
      title: '帐号',
      dataIndex: 'username',
    }, {
      title: '密码',
      dataIndex: 'password',
    }];
    const data = [{
      key: '1',
      username: 'John Brown',
      password: '12344555666',
    }, {
      key: '2',
      username: 'Jim Green',
      password: 'London12344555666',
    }, {
      key: '3',
      username: 'Joe Black',
      password: 'London12344555666',
    }, {
      key: '4',
      username: 'Joe Black',
      password: 'Sidney No. 1 Lake Park',
    }, {
      key: '5',
      username: 'Joe Black',
      password: 'Sidney No. 1 Lake Park',
    }, {
      key: '6',
      username: 'Joe Black',
      password: 'Sidney No. 1 Lake Park',
    }, {
      key: '7',
      username: 'Joe Black',
      password: 'London12344555666',
    }, {
      key: '8',
      username: 'Joe Black',
      password: 'Sidney No. 1 Lake Park',
    }, {
      key: '9',
      username: 'Joe Black',
      password: 'Sidney No. 1 Lake Park',
    }, {
      key: '10',
      username: 'Joe Black',
      password: 'London12344555666',
    }];
    return (
      <div>
        <QueueAnim className='contest-edit' delay={100} type='bottom'>
          <div className='h-1' key='contest-edit-header'>帐号生成</div>
          <div className='contest-edit-content' key='contest-edit-content'>
            <Form onSubmit={this.handleSubmit} key={'contest-edit-content-'}>
              <FormItem
                {...formItemLayout}
                label='队伍前缀'
              >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入队伍前缀'}],
                  initialValue:  ''
                })(
                  <Input placeholder='请输入队伍前缀' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='生成帐号数量'
              >
                {getFieldDecorator('host', {
                  rules: [{required: true, message: '请输入帐号数量'}],
                  initialValue:  ''
                })(
                  <Input placeholder='请输入帐号数量' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type='primary' size='large'>添加队伍</Button>
              </FormItem>
              <div>
                <h2>生成帐号列表</h2>
                <Table columns={columns} dataSource={data} size="middle" pagination={false}/>
                <Button type='primary' size='large' className='download'>点击下载</Button>
                <Button type='primary' size='large' className='copy'>点击复制</Button>
              </div>
            </Form>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default TeamGenerator
