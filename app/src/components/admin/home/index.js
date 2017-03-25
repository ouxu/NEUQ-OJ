import React, {Component} from 'react';

class HomeManage extends Component {

    render() {
        const {data:{introduce,notice}} = this.props
        return (
            <div>
                <div className="h-1">
                    主页公告
                </div>
                <div>
                    发布公告
                </div>
                <div>
                    近期公告
                </div>
            </div>
        );
    }
}

export default HomeManage;
