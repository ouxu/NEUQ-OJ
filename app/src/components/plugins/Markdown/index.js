/**
 * Created by out_xu on 17/6/23.
 */
import React from 'react'

import Markdown from 'react-markdown'
import './index.less'
const MarkdownArea = ({content}) => {
  return (
    <div>
      <Markdown className='markdown-body' source={content} />
    </div>
  )
}

export default MarkdownArea
