/**
 * Created by out_xu on 16/11/29.
 */
import React from 'react'
import './index.less'
import { Card } from 'antd'
const createMarkup = html => ({__html: html})

const HomeNews = (props) => {
  const {news = []} = props
  return (
    <div className={`home-news`} key='home-news'>
      {
        news.length >= 1 && news.map((t, i) =>
          i < 2 && <Card
            key={'home-news-' + t.id}
            title={t.title}
            style={{marginBottom: 15, fontSize: 14, backgroundColor: '#fff'}}
            extra={t.created_at}
          >
            <div>
              <p dangerouslySetInnerHTML={createMarkup(t.content)} />
            </div>
          </Card>
        )}
    </div>
  )
}
export default HomeNews
