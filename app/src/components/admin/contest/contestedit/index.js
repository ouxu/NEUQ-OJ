/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "./index.less";
class ContestEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleChange(value) {
        console.log(value)
        this.setState({text: value})
    }

    render() {
        const modules = {
            toolbar: {
                container: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{'header': 1}, {'header': 2}],               // custom button values
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                    [{'direction': 'rtl'}],                         // text direction
                    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                    [{'align': []}],
                    ['link'],
                    ['image'],
                    ['clean']                                         // remove formatting button
                ]
            },
            handlers: {
                // handlers object will be merged with default handlers object
            }
        }
        return (
            <div>
                <div className="h-1">
                    竞赛修改
                </div>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={this.state.text}
                        modules={modules}
                        onChange={::this.handleChange}/>

                </div>
            </div>
        );
    }
}


export default ContestEdit;
