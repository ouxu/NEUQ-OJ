/**
 * Created by out_xu on 16/12/23.
 */
import {SET_USERINFO, CLEAR_USERINFO} from "./type";
import {message} from "antd";
//引入自定义工具
import API from "../api";
import codeHelper from "../utils/codeHelper";
import urlEncode from "../utils/urlEncode";
import getToken from "../utils/getToken";


/**
 * 登录验证
 * @header token
 */
export function tokenVerify() {
    return (dispatch) => {
        const token = localStorage.getItem('neuq_oj.token');
        return fetch(API.tokenverify, {
            method: 'GET',
            headers: {
                'token': token
            }
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {

            } else {
                localStorage.clear('neuq_oj.token');
                localStorage.clear('neuq_oj.id');
                dispatch(clearUserinfo());
            }
        }).catch((e) => {
            console.log(e.message)
        });

    }
}


/**
 * 登录
 * @param body
 */
export function login(body) {
    return (dispatch) => {
        return fetch(API.login, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                localStorage.setItem("neuq_oj.token", json.data.token);
                localStorage.setItem("neuq_oj.name", json.data.user.name);
                localStorage.setItem("neuq_oj.id", json.data.user.id);
                dispatch(setUserinfo(json.data.user));
                message.success('登录成功')
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

}


/**
 * 登出
 * @returns {function(*)}
 */
export function logout() {
    return (dispatch) => {
        const token = getToken();
        return fetch(API.logout, {
            method: 'GET',
            headers: {
                'token': token
            }
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(clearUserinfo());
                message.success('登出成功')
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}


/**
 * 获取用户信息
 * @returns {function(*)}
 */
export function getUserMe() {
    return (dispatch) => {
        const token = getToken();
        return fetch(API.userme, {
            method: 'GET',
            headers: {
                'token': token
            }
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(setUserinfo(json.data))
            } else {
                localStorage.clear('neuq_oj.token')
            }
        }).catch((e) => {
            console.log(e.message)
        });

    }
}

/**
 * 获取指定用户信息
 * @param id 用户ID
 * @returns {function(*)}
 */
export function getUserInfo(id) {
    return (dispatch) => {
        return fetch(`${API.userinfo}${id}/info`, {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(setUserinfo(json.data))
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}


/**
 * 清除用户信息
 * @returns {{type, payload: {}}}
 */
export const clearUserinfo = () => {
    localStorage.clear('neuq_oj.token');
    localStorage.clear('neuq_oj.name');
    localStorage.clear('neuq_oj.id');
    return {
        type: CLEAR_USERINFO,
        payload: {}
    }
};

/**
 * 设置用户信息
 * @param data
 */
const setUserinfo = (data) => {
    return {
        type: SET_USERINFO,
        payload: {
            ...data
        }
    }
};

/**
 * 用户注册
 * @param body 注册字段
 * @returns {function(*)}
 */
export function userRegister(body) {
    return (dispatch) => {
        return fetch(API.register, {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urlEncode(body)
            // body: `name=${body.name}&email=${body.email}&mobile=${body.mobile}&password=${body.password}&password_confirmation=${body.password_confirmation}&school=${body.school}&captcha=${body.captcha}`
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                localStorage.setItem("neuq_oj.token", json.data.token);
                localStorage.setItem("neuq_oj.name", json.data.user.name);
                dispatch(setUserinfo(json.data.user));
                message.success('注册成功');
                window.history.go(-1);
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

}






