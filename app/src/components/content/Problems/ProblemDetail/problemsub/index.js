/**
 * Created by out_xu on 17/3/21.
 */
import React, {Component} from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/clike/clike'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Icon,
  Row,
  Table,
  Tooltip,
  Progress
} from 'antd'
import {columnsP, columnsUP} from './Config'
import {LanguageSelect} from 'components/plugins/SelectBox'
import Markdown from 'components/plugins/Markdown'

const Panel = Collapse.Panel

class ProblemSub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  createMarkup = html => ({__html: html})

  render() {
    const {source_code, errorinfo, resultData, percent,resultDataP, resultDataUp, privated, unsubmit, language, resultCode} = this.props.params
    const {data} = this.props
    const mode = [
      'text/x-csrc',
      'text/x-c++src',
      '',
      'text/x-java'
    ]
    const tColumns = ((resultCode === -1 || resultCode === 2)
      ? columnsUP
      : columnsP)
    const options = {
      indentUnit: 4,
      lineNumbers: true,
      matchBrackets: true,
      mode: mode[language]
    }
    return (
      <Collapse
        defaultActiveKey={['submit-code', 'submit-des', 'submit-result']}
        bordered={false}
        className='problem-detail-main'
      >
        <Panel header='描述' key='submit-des'>
          <Card bodyStyle={{fontSize: 14}} className='problem-detail-main-desc'>
            <h4>题目描述：</h4>
            <Markdown content={data.description}/>
            <h4>输入：</h4>
            <Markdown content={data.input}/>
            <h4>输出：</h4>
            <Markdown content={data.output}/>
          </Card>
        </Panel>
        <Panel header='提交' key='submit-code'
               className='problem-detail-main-code'>
          <CodeMirror
            value={source_code}
            onChange={this.props.updataCode}
            options={options}
            className='codemirror-area'
          />
          <Row
            type='flex' align='bottom' key='register-9'
            className='problem-detail-main-code'
          >
            <Col>
              <LanguageSelect
                handleChange={this.props.selectLanguage}
                defaultvalue={String(language)}
                allowClear
              />
            </Col>
            <Col>
              <Button
                type='primary'
                onClick={this.props.submit}
                className='problem-detail-main-submitbutton'
                disabled={unsubmit}
                loading={this.state.loading}
              > 提交
              </Button>
            </Col>
            <Col>
              <Checkbox
                onChange={this.props.checkPrivate}
                checked={privated}
              >
                <Tooltip title='他人答对后是否可以查看你的代码'>
                  <span className='user-should-know'>隐藏代码<Icon type='question-circle'/>
                  </span>
                </Tooltip>
              </Checkbox>
            </Col>
          </Row>
        </Panel>
        <Panel header='运行结果' key='submit-result' className="problem-detail-main-result">
          {percent > 0 && (
            <div style={{width: '100%'}}>
              <span>通过率</span><Progress strokeWidth={5} percent={percent}/>
            </div>)}
          {(resultCode === -1 || resultCode === 2) && (
            <Table
              columns={tColumns} bordered
              rowKey={record => `result-${record.key}`}
              dataSource={resultData}
              scroll={{x: 960}}
              size='small'
              pagination={false}
              key='result-3'
            />
          )}
          {(resultCode === 3 || resultCode === 4) && resultDataP.length > 0 && (
            <div style={{marginTop:20}}>
              通过的数据：
              <Table
                columns={tColumns} bordered
                rowKey={record => `result-${record.key}`}
                dataSource={resultDataP}
                scroll={{x: 960}}
                size='small'
                pagination={false}
                key='result-1'
              />
            </div>
          )}
          {(resultCode === 3 || resultCode === 4) && resultDataUp.length > 0 &&
          (
            <div style={{marginTop:20}}>
              未通过的数据:
              <Table
                columns={tColumns} bordered
                rowKey={record => `result-${record.key}`}
                dataSource={resultDataUp}
                scroll={{x: 960}}
                size='small'
                pagination={false}
                key='result-2'
            /></div>
          )}
          {
            errorinfo &&
            <Alert
              message={'Error:'}
              description={errorinfo}
              banner closable
            />
          }
        </Panel>
      </Collapse>
    )
  }
}

export default ProblemSub
