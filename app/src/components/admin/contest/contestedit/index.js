/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import "./index.less";
class ContestEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleChange(value) {
        this.setState({ text: value })
    }
    render() {
        return (
            <div>
                <div className="h-1">
                    竞赛修改
                </div>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={this.state.text}
                        onChange={::this.handleChange} />

                </div>

            </div>
        );
    }
}


export default ContestEdit;
