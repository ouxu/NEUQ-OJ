/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
import { Link } from 'react-router'
import { Button, Card, Icon, message } from 'antd'
import './index.less'
import QueueAnim from 'rc-queue-anim'
import ProblemDes from './problemdes'
import ProblemSub from './problemsub'
import * as requestService from 'utils/request'
import API from 'api'

const Count = 30
const TIME = 2000
// 休眠的时间
const SLEEP = 2000
const ButtonGroup = Button.Group
const sleep = (delay = 0) => {
  new Promise((resolve) => {
    console.log('等着！！！')
    setTimeout(resolve, delay)
  })
}

class ProblemDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submit: this.props.submit || false,
      unsubmit: false,
      source_code: '',
      solution: '',
      percent: 0,
      language: 1,
      privated: false,
      resultData: [],
      result: null,
      errorinfo: '',
      resultDataP: [],
      resultDataUp: [],
      resultCode: ''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.updateCode = this.updateCode.bind(this)
    this.selectLanguage = this.selectLanguage.bind(this)
    this.checkPrivate = this.checkPrivate.bind(this)
    this.combinObj = this.combinObj.bind(this)
    this.submitProblem = this.submitProblem.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    this.props.getProblemInfo(this.props.params)
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer)
  }

  createMarkup = html => ({__html: html})

  handleMenuClick () {
    this.setState({submit: !this.state.submit})
  }

  updateCode (newCode) {
    this.setState({
      source_code: newCode,
      result: null,
      unsubmit: false
    })
  }

  selectLanguage (value) {
    this.setState({
      language: parseInt(value),
      result: null,
      unsubmit: false
    })
  }

  checkPrivate (e) {
    this.setState({
      privated: e.target.checked,
      result: null,
      unsubmit: false
    })
  }

  combinObj () {
    const {source_code, language} = this.state
    let obj = {source_code, language}
    obj = Object.assign({
      private: this.state.privated
    }, obj)
    return obj
  }

  async submit () {
    try {
      await this.props.tokenVerify()
      const obj = this.combinObj()
      if (obj.source_code.length < 3) {
        message.error('请输入有效代码')
      } else {
        this.setState({
          unsubmit: true,
          errorinfo: ''
        })
        await this.submitProblem(obj)
        // await this.setState({
        //   unsubmit: false
        // })
      }
    } catch (e) {
      this.setState({
        unsubmit: false
      })
      message.error(e.message)
    }
  }

  async submitProblem (body) {
    const {params} = this.props
    const url = params.pnum
      ? `${API.host}contest/${params.cid}/problem/${params.pnum}/submit`
      : `${API.host}problem/${params.id}/submit`
    const data = await requestService.tpost(url, body)
    message.success('提交成功... 请稍候')
    // 新需求要求在这里返回 {"code":0,"data":{"solutionId":383888}} 这个样子的结果，然后根据这个 id 去轮询
    if (data) {
      const {solutionId} = data
      const solutionUrl = `${API.host}judge/${solutionId}/result`
      let solution = ''
      let time = TIME
      let count = 0
      let timers = null
      try {
        timers = setInterval(async () => {
          if (solution && solution['result_code'] > 0) {
            timers && clearInterval(timers)
            console.log('返回结果，定时器被清除啦')
            message.success('判题成功')
            const {result_code, result_data} = solution
            if (result_code === 3 || result_code === 4) {
              timers && clearInterval(timers)
              const {Passed, UnPassed = []} = result_data
              let percent = 0
              // 如果全部通过或者全部没通过的时候，后端都会返回一个null，导致在后边map的时候出现的问题，所以在这里需要计算一下通过率
              if (Passed == null) {
                percent = 0
              } else if (UnPassed == null) {
                percent = 100
              } else {
                percent = Math.floor((Passed.length) / (Passed.length + UnPassed.length) * 10000) / 100
              }
              // const {CpuTime = '', Result = '', Memory = '', OutputMD5 = ''} = Passed[0]
              const aPassed = [].concat(Passed).map((a, i) => ({
                ...a,
                key: i + 1
              }))
              const aUnPassed = [].concat(UnPassed).map((aUn, i) => ({
                ...aUn,
                key: i + 1
              }))
              this.setState({
                percent: percent,
                resultDataP: aPassed,
                resultDataUp: aUnPassed
              })
            } else if (result_code === 2 || result_code === -1) {
              this.setState({
                resultData: [
                  {
                    key: 2,
                    result_code,
                    result_data
                  }
                ]
              })
            } else if (result_code === -2) {
            }
            this.setState({
              resultCode: result_code,
              unsubmit: false
            })
          }
          if (solution && solution['result_code'] === -1) {
            timers && clearInterval(timers)
            message.info('题目未上传')
            this.setState({
              unsubmit: false
            })
          }
          if (solution && solution['result_code'] === -2) {
            message.info('正在判题....')
          }
          if (solution && solution['result_code'] === -3) {
            message.info('服务器异常')
            timers && clearInterval(timers)
          }
          if (count >= Count) {
            timers && clearInterval(timers)
            console.log('时间到了，定时器被清除啦')
            if (!solution) {
              message.error('当前排队人数太多，请重新提交')
              this.setState({
                unsubmit: false
              })
            }
          }
          if (count >= SLEEP / TIME) {
            solution = await requestService.tget(solutionUrl, solutionId)
          }
          count++
          console.log(data, count)
        }, time)
      } catch (e) {
        timers && clearInterval(timers)
        console.log('500，定时器被清除啦')
        console.error(e)
      }
      console.log(solution)
    } else {
      message.error('提交失败,请重新提交')
    }
  }

  async getErrorInfo (solutionId, result) {
    try {
      const errorMode = (result === 10 ? '/runtime-info/' : '/compile-info/')

      const data = await requestService.get(API.status + errorMode + solutionId)
      await this.setState({
        errorinfo: data.error
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {problemDetail: data = {}} = this.props
    const {params} = this.props
    return (
      <Card className='problem-detail-wrap' bodyStyle={{padding: 0}}>
        <QueueAnim type='left' delay={100}>
          <div className='problem-detail-breadcrumb' key='problem-detail-1'>
            <Link to={params.pnum ? `/contests/${params.cid}` : '/problems'}>
              <Icon type='left' />
              <span>{params.pnum ? '竞赛列表' : '问题列表'}</span>
            </Link>
            <div className='problem-detail-breadcrumb-detail'>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='edit' /><span>{data.creator_name}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='exception' /><span>{data.submit}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='check' /><span>{data.accepted}</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'>
                <Icon type='clock-circle' /><span>{data.time_limit} Sec</span>
              </span>
              <span className='problem-detail-breadcrumb-detail-tags'><Icon
                type='save' />
                <span>{data.memory_limit} MB</span>
              </span>
            </div>
          </div>
          <div className='problem-detail-header' key='problem-detail-2'>
            <h2 className='problem-detail-header-title'>{data.id}
              : {data.title}</h2>
          </div>
          <div key='problem-detail-3'>
            <ProblemDes data={data} />

          </div>
          <div key='problem-detail-4'>
            {this.state.submit && <ProblemSub
              updataCode={this.updateCode}
              submit={this.submit}
              selectLanguage={this.selectLanguage}
              checkPrivate={this.checkPrivate}
              params={this.state}
              data={data}
            />}
          </div>
          {
            !this.state.submit && (
              <ButtonGroup className='problem-detail-buttonGroup'>
                <Button
                  type={!this.state.submit ? 'primary' : 'default'}
                  onClick={this.handleMenuClick}
                >提交代码</Button>
              </ButtonGroup>
            )
          }

        </QueueAnim>
      </Card>
    )
  }
}

export default ProblemDetail
