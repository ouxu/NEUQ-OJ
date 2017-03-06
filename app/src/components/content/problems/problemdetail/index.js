/**
 * Created by out_xu on 17/1/3.
 */
import React from "react";
import {Link} from "react-router";
import {Collapse, Card, Button, Checkbox, Tooltip, Row, Col, message, Table, Icon,Alert} from "antd";
import "./index.less";
import QueueAnim from "rc-queue-anim";
import {LanguageSelect} from "../../../../utils/selectBox";
import {columns} from "../../../../utils/tableData";
//TODO https://zhuanlan.zhihu.com/p/24781259 如何实时刷新
import CodeMirror from "react-codemirror";
import "codemirror/mode/clike/clike";
import ProblemDes from "./problemdes";
import API from "../../../../api";
import codeHelper from "../../../../utils/codeHelper";

const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;
class ProblemDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submit: this.props.submit||false,
            unsubmit: false,
            source_code: '',
            language: 1,
            private: false,
            resultdata: [],
            result: null,
            errorinfo:''
        }
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.updataCode = this.updataCode.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.checkPrivate = this.checkPrivate.bind(this);
        this.combinObj = this.combinObj.bind(this);
        this.submitProblem = this.submitProblem.bind(this);
        this.submit = this.submit.bind(this);

    }


    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    createMarkup = (html) => {
        return {__html: html};
    };

    handleMenuClick() {
        this.setState({submit: !this.state.submit})
    }

    updataCode(newCode) {
        this.setState({
            source_code: newCode,
            result: null,
            unsubmit: false,
        })
    };

    selectLanguage(value) {
        this.setState({
            language: parseInt(value),
            result: null,
            unsubmit: false,
        })
    }

    checkPrivate(e) {
        this.setState({
            private: e.target.checked,
            result: null,
            unsubmit: false,
        });

    }

    combinObj() {
        const {source_code, language}=this.state
        let obj = {source_code, language}
        obj = Object.assign({
            private: this.state.private
        }, obj);
        return obj
    };

    submit() {
        const obj = this.combinObj()
        if (obj.source_code.length < 3) {
            message.error('请输入有效代码')
        } else {
            message.success('提交成功')
            this.setState({
                unsubmit: true,
                errorinfo: ''
            })
            this.submitProblem(this.props.data.id, obj)
        }
    }

    submitProblem(id, body) {
        const token = localStorage.getItem('neuq_oj.token');
        return token&&fetch(API.problem + id + '/submit', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                return json.data.solution_id
            } else {
                codeHelper(json.code)
            }
        }).then((solution_id) => {
            this.timer = setInterval(() => {
                this.getResultData(solution_id);
                let result = this.state.result;
                console.log(result)
                if (result > 3) {
                    if (result>9) {
                        this.getErrorInfo(solution_id,result)
                    }
                    clearInterval(this.timer);
                }
            }, 1000)
        }).catch((e) => {
            console.log(e.message)
        })
    }


    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async getResultData(solution_id) {
        try {
            const res = await fetch(API.solution + solution_id);
            const json = await res.json();
            if (json.code === 0) {
                const data = json.data;
                await this.setStateAsync({
                    resultdata: [data],
                    result: data.result
                })
            } else {
                codeHelper(json.code)
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }
    async getErrorInfo(solution_id,result) {
        try {
            const errormode=(result===10?'/runtime-info/':'/compile-info/')
            const res = await fetch(API.status + errormode+ solution_id);
            const json = await res.json();
            if (json.code === 0) {
                const data = json.data;
                await this.setStateAsync({
                   errorinfo: data.error
                })
            } else {
                codeHelper(json.code)
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    render() {
        const data = this.props.data || {};
        const mode = [
            'text/x-csrc',
            'text/x-c++src',
            '',
            'text/x-java'
        ]
        const options = {
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true,
            mode: mode[this.state.language]
        }
        return (
            <Card className="problem-detail-wrap" bodyStyle={{padding: 0}}>
                <QueueAnim type='left' delay={100}>
                    <div className='problem-detail-breadcrumb' key='problem-detail-1'>
                        <Link to={'/problems'}>
                            <Icon type="left"/>
                            <span>问题列表</span>
                        </Link>
                        <div className="problem-detail-breadcrumb-detail">
                            <span className='problem-detail-breadcrumb-detail-tags'><Icon
                                type="edit"/><span>{data.creator_name}</span></span>
                            <span className='problem-detail-breadcrumb-detail-tags'><Icon
                                type="exception"/><span>{data.submit}</span></span>
                            <span className='problem-detail-breadcrumb-detail-tags'><Icon
                                type="check"/><span>{data.accepted}</span></span>
                            <span className='problem-detail-breadcrumb-detail-tags'><Icon
                                type="clock-circle"/><span>{data.time_limit} Sec</span></span>
                            <span className='problem-detail-breadcrumb-detail-tags'><Icon
                                type="save"/><span>{data.memory_limit} MB</span></span>
                        </div>

                    </div>
                    <div className="problem-detail-header" key='problem-detail-2'>
                        <h2 className="problem-detail-header-title">{data.id} : {data.title}</h2>
                        <ButtonGroup className="problem-detail-buttongroup">
                            <Button
                                size='small'
                                type={this.state.submit ? 'primary' : 'dashed'}
                                onClick={this.handleMenuClick}
                            >
                                {this.state.submit ? '描述' : '提交'}
                            </Button>

                            <Button size='small' type='dashed'>讨论版</Button>
                            <Button size='small' type='dashed'>状态</Button>
                        </ButtonGroup>
                    </div>
                    <div key='problem-detail-3'>
                        {this.state.submit ?
                            <Collapse
                                defaultActiveKey={['submit-code', 'submit-des', 'submit-result']}
                                bordered={false}
                                className="problem-detail-main"
                            >

                                <Panel header="描述" key="submit-des">
                                    <Card bodyStyle={{fontSize: 14}} className="problem-detail-main-desc">
                                        <h4>题目描述：</h4>
                                        <p dangerouslySetInnerHTML={this.createMarkup(data.description)}/>
                                        <h4>输入：</h4>
                                        <p dangerouslySetInnerHTML={this.createMarkup(data.input)}/>
                                        <h4>输出：</h4>
                                        <p dangerouslySetInnerHTML={this.createMarkup(data.output)}/>
                                    </Card>
                                </Panel>
                                <Panel header="提交" key="submit-code" className='problem-detail-main-code'>
                                    <CodeMirror
                                        value={this.state.source_code}
                                        onChange={this.updataCode}
                                        options={options}
                                        className='codemirror-area'
                                    />

                                    <Row type="flex" align="bottom" key="register-9"
                                         className="problem-detail-main-code">
                                        <Col >
                                            <LanguageSelect
                                                handleChange={this.selectLanguage}
                                                defaultvalue={String(this.state.language)}
                                                allowClear
                                            />
                                        </Col>
                                        <Col >
                                            <Button type='primary'
                                                    onClick={this.submit}
                                                    className='problem-detail-main-submitbutton'
                                                    disabled={this.state.unsubmit}
                                            > 提交
                                            </Button>
                                        </Col>
                                        <Col >
                                            <Checkbox
                                                onChange={this.checkPrivate}
                                                checked={this.state.private}
                                            >
                                                <Tooltip title="他人答对后是否可以查看你的代码">
                                                    <span className="user-should-know">隐藏代码  <Icon
                                                        type="question-circle"/></span>
                                                </Tooltip>
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Panel>
                                <Panel header="运行结果" key="submit-result">
                                    <Table columns={columns}
                                           rowKey={record => `result-${record.id}`}
                                           dataSource={this.state.resultdata}
                                           scroll={{x: 960}}
                                           size='small'
                                           pagination={false}
                                           key="result-1"
                                    />
                                    {
                                        this.state.errorinfo&&
                                        <Alert message={`Error:`}
                                               description={this.state.errorinfo}
                                               banner closable
                                        />
                                    }
                                </Panel>
                            </Collapse>
                            :
                            <ProblemDes data={data}/>}
                    </div>


                    <ButtonGroup className="problem-detail-buttongroup">
                        <Button type={this.state.submit ? 'primary' : 'dashed'}
                                onClick={this.handleMenuClick}>{this.state.submit ? '描述' : '提交'}</Button>
                        <Button type='dashed'>讨论版</Button>
                        <Button type='dashed'>状态</Button>
                    </ButtonGroup>
                </QueueAnim>
            </Card>
        )
    }
}


export default ProblemDetail;