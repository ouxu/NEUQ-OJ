/**
 * Created by out_xu on 17/3/25.
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { delNews, editNews, getNews, getNewsList } from 'actions'

import NewsManage from 'components/admin/News'

export default connect(
  state => ({
    admin: state.admin
  }),
  dispatch => bindActionCreators({getNewsList, editNews, delNews, getNews}, dispatch),
)(NewsManage)
