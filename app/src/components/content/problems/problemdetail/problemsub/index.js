/**
 * Created by out_xu on 17/3/21.
 */
import React, {Component} from "react";
import CodeMirror from "react-codemirror";
import "codemirror/mode/clike/clike";
import {Alert, Button, Card, Checkbox, Col, Collapse, Icon, Row, Table, Tooltip} from "antd";
import {columns} from "../../../../../utils/tableData";
import {LanguageSelect} from "../../../../../utils/selectBox";

const Panel = Collapse.Panel;

class ProblemSub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    createMarkup = html => ({__html: html});

    render() {
        const {source_code, errorinfo, resultdata, privated, unsubmit, language} = this.props.params;

        const {data} = this.props;
        const mode = [
            'text/x-csrc',
            'text/x-c++src',
            '',
            'text/x-java'
        ];

        const options = {
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true,
            mode: mode[language]
        };
        return (
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
                <Panel header="提交" key="submit-code" className="problem-detail-main-code">
                    <CodeMirror
                        value={source_code}
                        onChange={this.props.updataCode}
                        options={options}
                        className="codemirror-area"
                    />

                    <Row
                        type="flex" align="bottom" key="register-9"
                        className="problem-detail-main-code"
                    >
                        <Col >
                            <LanguageSelect
                                handleChange={this.props.selectLanguage}
                                defaultvalue={String(language)}
                                allowClear
                            />
                        </Col>
                        <Col >
                            <Button
                                type="primary"
                                onClick={this.props.submit}
                                className="problem-detail-main-submitbutton"
                                disabled={unsubmit}
                                loading={this.state.loading}
                            > 提交
                            </Button>
                        </Col>
                        <Col >
                            <Checkbox
                                onChange={this.props.checkPrivate}
                                checked={privated}
                            >
                                <Tooltip title="他人答对后是否可以查看你的代码">
                  <span className="user-should-know">
                                        隐藏代码 <Icon type="question-circle"/>
                  </span>
                                </Tooltip>
                            </Checkbox>
                        </Col>
                    </Row>
                </Panel>
                <Panel header="运行结果" key="submit-result">
                    <Table
                        columns={columns}
                        rowKey={record => `result-${record.id}`}
                        dataSource={resultdata}
                        scroll={{x: 960}}
                        size="small"
                        pagination={false}
                        key="result-1"
                    />
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
        );
    }
}


export default ProblemSub;
