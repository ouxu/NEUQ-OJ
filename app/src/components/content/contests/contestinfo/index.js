/**
 * Created by out_xu on 17/3/5.
 */
import React from 'react';
import {Card, Table, Icon, Col, Row,Button,Timeline} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router'

import './index.less';
const ButtonGroup = Button.Group;
class ContestInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render (){
        const {contest_info,problem_info}= this.props.data;
        const columns=[{
            title: '',
            width: '1%',
            key: 'contest-info-none',
            className: 'contest-info-none over-hidden'
        },{
            title: '状态',
            dataIndex: 'user_status',
            width: '10%',
            key: 'contest-info-status',
            className: 'contest-info-status over-hidden'
        },{
            title: '#',
            render: (record)=>{
                return(
                    <span>
                        Problem {String.fromCharCode(parseInt(record.pnum)+65)} {record.pid}
                    </span>
                )
            },
            width: '20%',
            key: 'contest-info-code',
            className: 'contest-info-code over-hidden'
        },{
            title: '标题',
            render: (record)=>{
                return(
                    <span>
                        <Link to={'404'} > {record.title}</Link>
                    </span>
                )
            },
            width: '35%',
            key: 'contest-info-title',
            className: 'contest-info-title over-hidden'
        },{
            title: '来源',
            dataIndex: 'source',
            width: '15%',
            key: 'contest-info-source',
            className: 'contest-info-source over-hidden'
        },{
            title: '提交',
            dataIndex: 'submit',
            width: '10%',
            key: 'contest-info-submit',
            className: 'contest-info-submit over-hidden'
        },{
            title: '正确',
            dataIndex: 'accepted',
            width: '10%',
            key: 'contest-info-accepted',
            className: 'contest-info-accepted over-hidden'
        }]
        return (
           <Card
               className="contest-info-wrap"
               bodyStyle={{padding: 0}}
           >
               <QueueAnim className="contest-info-wrap" delay={100}>
                   <div className='contest-info-breadcrumb' key='contest-info-breadcrumb'>
                       <Link to={'/contests'}>
                           <Icon type="left"/>
                           <span>竞赛列表</span>
                       </Link>
                   </div>
                   <div className="contest-info-header" key='contest-info-header'>
                       <h2 className="contest-info-header-title">Contest {contest_info.id} : {contest_info.title}</h2>

                   </div>
                   <Row className="contest-info-content"
                        type="flex"
                        gutter={12}
                        key='contest-info-content'
                   >
                       <Col className="contest-info-content-left" xs={{span: 24}} sm={{span:16}}>
                           <QueueAnim
                               delay={100}
                               interval={200}
                               className="contest-info-content-table"
                           >
                               <Table columns={columns}
                                      rowKey={record => `contest-${record.pid}`}
                                      dataSource={problem_info}
                                      scroll={{x: 680}}
                                      //size='small'
                                      pagination={false}
                                      key="result-1"
                               />

                           </QueueAnim>
                       </Col>
                       <Col className="contest-info-content-right" xs={{span: 24}} sm={{span:8}} >
                           <QueueAnim
                               delay={100}
                               interval={200}
                               className="contest-info-content-box"
                           >
                               <Timeline  className="contest-info-content-box-item">
                                   <Timeline.Item>Create at 2015-09-01</Timeline.Item>
                                   <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                   <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                                   <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                               </Timeline>
                           </QueueAnim>

                       </Col>

                   </Row>

               </QueueAnim>
           </Card>
        )
    }
}

export default ContestInfo;