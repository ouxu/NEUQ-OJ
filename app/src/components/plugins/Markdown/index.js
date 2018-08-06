/**
 * Created by out_xu on 17/6/23.
 */
import React from 'react'
import kt from 'katex'
import texmath from 'markdown-it-texmath'
import markdownit from 'markdown-it'
import Markdown from 'react-markdown'
import './index.less'
const MarkdownArea = ({content = ''}) => {
  return (
    <div className='markdown-body' >
      <Markdown source={markdownit({
        html: true,
        linkify: true,
        typographer: true
      }).use(texmath.use(kt)).render(content)}/>
    </div>
  )
}

export default MarkdownArea
