/**
 * Created by out_xu on 17/1/8.
 */
import React from 'react'
import { Card, Collapse } from 'antd'
import './index.less'

const Panel = Collapse.Panel

const createMarkup = html => ({__html: html})
const return2Br = (str) => {
  str = str || ''
  return str.replace(/\r?\n/g, '<br/>')
}

const ProblemDes = ({data = {}}) => (
  <Collapse
    defaultActiveKey={['problem-des', 'problem-sampleinput', 'problem-sampleoutput']}
    bordered={false}
    className='problem-detail-main'
  >
    <Panel header='描述' key='problem-des'>
      <Card bodyStyle={{fontSize: 14}} className='problem-detail-main-desc'>
        <h4>题目描述：</h4>
        <p dangerouslySetInnerHTML={createMarkup(data.description)} />
        <h4>输入：</h4>
        <p dangerouslySetInnerHTML={createMarkup(data.input)} />
        <h4>输出：</h4>
        <p dangerouslySetInnerHTML={createMarkup(data.output)} />
      </Card>
    </Panel>

    <Panel header='样例输入' key='problem-sampleinput'>
      <Card >
        <p dangerouslySetInnerHTML={createMarkup(return2Br(data.sample_input))} />
      </Card>
    </Panel>
    <Panel header='样例输出' key='problem-sampleoutput'>
      <Card>
        <p dangerouslySetInnerHTML={createMarkup(return2Br(data.sample_output))} />
      </Card>
    </Panel>
    {
      data.hint &&
      <Panel header='提示' key='problem-hint'>
        <Card>
          <p dangerouslySetInnerHTML={createMarkup(return2Br(data.hint))} />
        </Card>
      </Panel>
    }
  </Collapse>
)

export default ProblemDes
