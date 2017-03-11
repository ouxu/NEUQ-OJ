/**
 * Created by out_xu on 17/3/7.
 */
import React from "react";
import {Progress, Col, Row} from "antd";
import "./index.less";
import newDate from '../../../../../utils/newDate';
const ContestProgress = (time,start_time, end_time) => {
    const start = newDate(start_time);
    const end = newDate(end_time);

    let h = Math.floor((end - time) / 1000 / 60 / 60);
    let m = Math.floor(((end - time) / 1000 - h * 60 * 60) / 60);
    let s = Math.floor(((end - time) / 1000 - h * 60 * 60 - m * 60));
    const end_status = time > end;

    return (
        <Row type="flex"
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
            <Col span={1} />
            <Col className="contest-info-progress-time" >
                {
                    end_status?<span className="contest-info-progress-time-over">已结束</span>:
                        <span>
                        <span> {h} </span> h
                        <span> {m} </span> m
                        <span> {s} </span> s
                    </span>
                }

            </Col>
        </Row>
    )

};

export default ContestProgress;