/**
 * Created by out_xu on 16/12/23.
 */
import {SET_USERINFO,SET_USERME,CLEAN_USERME,IS_LOGINED} from "./type";
import {message} from "antd";
import * as requestService from "../utils/request";
//引入自定义工具
import API from "../api";
import codeHelper from "../utils/codeHelper";
import urlEncode from "../utils/urlEncode";


/**
 * 设置用户信息
 * @param data
 */
const setUserInfo = (data) => {
    return {
        type: SET_USERINFO,
        payload: {
            ...data
        }
    }
};
/**
 * 设置用户信息
 * @param data
 */
const setUserMe = (data) => {
    return {
        type: SET_USERME,
        payload: {
            ...data
        }
    }
};

/**
 * 设置用户信息
 * @param
 */
const cleanUserMe = () => {
    return {
        type: CLEAN_USERME
    }
};

const isLogined = () => {
    return {
        type: IS_LOGINED
    }
};

/**
 * 登录验证
 * @header token
 */
export function tokenVerify() {
    return async(dispatch) => {
        try {
            await requestService.tget(API.tokenverify);
            await dispatch(isLogined());
        } catch (e) {
            dispatch(cleanUserMe());
            localStorage.clear('neuq_oj.token');
            localStorage.clear('neuq_oj.id');
        }

    }
}


/**
 * 登录
 * @param body
 */
export function login(body) {
    return async(dispatch) => {
        try {
            const json = await requestService.post(API.login, body);
            localStorage.setItem("neuq_oj.token", json.data.token);
            localStorage.setItem("neuq_oj.name", json.data.user.name);
            localStorage.setItem("neuq_oj.id", json.data.user.id);
            await dispatch(setUserMe(json.data.user));
            message.success('登录成功');

        } catch (e) {

            console.error(e)
        }
    }

}


/**
 * 登出
 * @returns {function(*)}
 */
export function logout() {
    return async(dispatch) => {
        try {
            await requestService.tget(API.logout);
            await dispatch(cleanUserMe());

            localStorage.clear('neuq_oj.token');
            localStorage.clear('neuq_oj.name');
            localStorage.clear('neuq_oj.id');
            message.success('登出成功')

        } catch (e) {
            console.error(e)
        }
    }
}


/**
 * 获取用户信息
 * @returns {function(*)}
 */
export function getUserMe() {
    return async(dispatch) => {
        try {
            const json = await requestService.tget(API.userme);
            await dispatch(setUserMe(json.data));
        } catch (e) {
            localStorage.clear('neuq_oj.token');
            localStorage.clear('neuq_oj.name');
            localStorage.clear('neuq_oj.id');
            dispatch(cleanUserMe());
            console.error(e)
        }
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
                dispatch(setUserInfo(json.data))
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.error(e)
        })
    }
}


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
            console.error(e)
        })
    }

}






