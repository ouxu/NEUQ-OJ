/**
 * Created by out_xu on 16/12/21.
 */
import {message} from 'antd';
export default (dataArray)=>{
    let flag = true;
    for (let i=0;i<dataArray.length;i++){
        if (!dataArray[i].data){
            message.warning(`请输入${dataArray[i].chn}`);
            flag =false;
            break;
        }
        if (!dataArray[i].data.match(dataArray[i].regx)){
            message.warning(`${dataArray[i].chn}格式不合法`);
            flag=false;
            break;
        }
    }
    return flag;
}
