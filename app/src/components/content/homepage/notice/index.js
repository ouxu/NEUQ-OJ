/**
 * Created by out_xu on 16/11/29.
 */
import React from 'react';
import './index.less';
import { Card } from 'antd';

const HomeItem = ({ type, notice = [] }) => (
  <div className={`home-${type.item}`}>
    {
                notice.map((t, i) =>
                  <Card
                    key={`home-${type.item}-${i}`}
                    title={type.title}
                    style={{ marginBottom: 15, fontSize: 14 }}
                  >
                    {t.content}
                  </Card>,
            )}
  </div>
    );
export default HomeItem;
