/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react';
import './index.less';

class Test extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log(this.props.params.id)
    }

    render (){
        return (
            <div></div>
            )
        }
}



export default Test