/**
 * Created by out_xu on 17/3/7.
 */
import React from "react";
import {Progress, Col, Row} from "antd";
import "./index.less";
const ContestProgress = (start_time, end_time) => {
    const time = new Date()
    const start = new Date(start_time)
    const end = new Date(end_time)

    let h = Math.floor((end - time) / 1000 / 60 / 60);
    let m = Math.floor(((end - time) / 1000 - h * 60 * 60) / 60);
    let s = Math.floor(((end - time) / 1000 - h * 60 * 60 - m * 60));
    const end_status = time > end;

    return (
        <Row type="flex"
             justify="space-between"
             key='contest-info-progress'
             align="middle"
        >
            <Col className="contest-info-progress" span={20}>
                <Progress
                    status={(end_status && 'success') || 'active'}
                    percent={(end_status && 100) || (parseInt(100 * (time-start) / (end - start)))}
                    strokeWidth={8}
                    className="contest-info-progress-progress"
                />
            </Col>
            {end_status&&'已结束'||
            <Col className="contest-info-progress-time" >
                <span> {h} </span> h
                <span> {m} </span> m
                <span> {s} </span> s
            </Col>}
        </Row>
    )

}

export default ContestProgress;