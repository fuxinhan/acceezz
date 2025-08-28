import axios from "axios";
import store from './../Store/index'
import { message } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons'
import '@ant-design/v5-patch-for-react-19';
import LogoPng from './../static/AccezzLogo.png'
class Util {
    //logo
    logoPng() {
        return LogoPng
    }
    // 退出登陆
    LogOut() {
        localStorage.clear();
        window.location.reload(true);
    }
    // 获取token
    getToken() {
        return localStorage.getItem("userToken");
    }
    // 获取当前rul
    currentUrl() {
        if (!this.isLocal()) return 'https://console.theaccezz.com/'
        let http = window.location.protocol;
        let host = window.location.host;
        let ip = `${http}//${host}/`;
        ip = ip.replace(":3000", ":8000");
        ip = ip.replace(":3001", ":8000");
        ip = ip.replace('172.17.0.2', '127.0.0.1');
        return ip;
    }
    // 是否为本地
    isLocal() {
        let port = window.location.port;
        let hostHome = window.location.hostname;
        if (
            hostHome === "127.0.0.1" ||
            hostHome === "localhost" ||
            port === "3000" ||
            port === "3001"
        ) {
            return true;
        } else {
            return false;
        }
    }

    // 请求URL
    requestUrl(path) {
        let paths = this.currentUrl() + path
        return paths
    }
    // 判读用户权限
    isUser = (userInfo, data) => {
        return userInfo?.user_info?.codes?.indexOf(data) !== -1
    }
    // 请求方式
    get(data) {
        data["method"] = "GET";
        this.axiosRequest(data)
    }
    post(data) {
        data["method"] = "POST";
        this.axiosRequest(data)
    }
    delete(data) {
        data["method"] = "DELETE";

        return this.axiosRequest(data)
    }
    put(data) {
        data["method"] = "PUT";
        this.axiosRequest(data)
    }
    patch(data) {
        data["method"] = "PATCH";
        this.axiosRequest(data)
    }
    // axios请求
    axiosRequest(data) {
        store.dispatch({ type: data['actionType'], loading: true })
        let headers = {
            Accept: "application/json",
            Authorization: this.getToken(),
        }
        data['headers'] = {
            ...headers,
            ...data.headers
        }
        let url = this.requestUrl(data['url'])
        data['url'] = url

        axios(data).then((res) => {
            let RequestData = res.data
            RequestData = this.returnIndexAB(RequestData)
            store.dispatch({ type: data['actionType'], data: RequestData, loading: false })
            if (data['actionType'] === 'Login') {
                //  if (
                //     this.isUser(RequestData, 'word_editor') ||
                //     this.isUser(RequestData, 'admin') ||
                //     this.isUser(RequestData, 'accounting') ||
                //     this.isUser(RequestData, 'dealer_captain')
                // ) {
                //     message.error('此用户为后台管理人员，请前往后台登录')
                // } else {
                let userToken = RequestData.jwt_token;
                let userInfo = JSON.stringify(RequestData);
                localStorage.setItem("userToken", userToken);
                localStorage.setItem("userInfo", userInfo);
                let path = window.location.pathname

                if (path === '/Login') {
                    path = '/'
                }
                window.location.href = path;
                // }
            }
            if (data.Success) data.Success(RequestData)
            this.requestMessage(res, data.message)
        }).catch((error) => {
            store.dispatch({ type: data['actionType'], data: error, loading: false })
            if (data.Error) data.Error(error)
            this.requestMessage(error)
        })
    }
    // 数据排序
    returnIndexAB(data) {
        if (!data) return data
        if (!data.results) return data
        let datas = data.results
        datas.sort(function (a, b) {
            return a.index - b.index;
        })
        return { ...data, results: datas }
    }

    // API返回的错误信息处理
    requestMessage(data, Message) {
        let status = data.status
        if (status === 400) return message.error('400')
        if (status === 200 || status === 201 || status === 204) {
            if (Message) message.success(<CheckCircleOutlined />)
        } else if (status === 401) {
            message.error(data && data.response && data.response.data || 'Username or password error, please try again!')
        } else if (!status && data.code && data.code === 'ERR_BAD_REQUEST') {
            let errorText = (
                (
                    data.response && data.response.data
                ) ? (
                    (
                        data.response.data.username && data.response.data.username[0]
                    ) ||

                    data.response.data.error ||
                    data.response.data.info ||
                    data.response.data.index ||
                    data.response.data.non_field_errors ||
                    (data.response.data.chapter_name && data.response.data.chapter_name[0]) ||
                    (data.response.data.prompt_obj && data.response.data.prompt_obj[0]) ||
                    (data.response.data.article_name && data.response.data.article_name[0]) ||
                    data.response.data.detail ||
                    data.response.data
                ) :
                    '未知错误！请联系工作人员-ERR_BAD_REQUEST')
            if (data && data.response && data.response.data && data.response.data.detail && data.response.data.detail === 'Authentication credentials were not provided.') {
                localStorage.clear();
                window.location.reload(true);
            } else if (
                this.getToken() && data?.response?.status === 403
            ) {
                message.error('登录信息过期，请重新登录后重试！', 15)
            } else {
                message.error(
                    data.code + ':' + errorText
                )
            }

        } else {
            message.error(data.message || '未知错误！请联系工作人员-All')
        }


    }
    returnFileUrl(url) {
        if (!url) return url;
        if (!url) return url;
        let newUrl = url.substring(0, 5);
        if (newUrl === "https") {
            return url;
        } else if (newUrl === "data:") {
            return url;
        } else {
            if (this.isLocal()) return this.currentUrl() + url;
            if (!this.isLocal()) return 'https://console.theaccezz.com/' + url
        }
        // if(this.isLocal()) return this.currentUrl()+url;
        // if(!this.isLocal()) return 'https://console.theaccezz.com/'+url
        // let newUrl = url.substring(0, 5);
        // if (newUrl === "https") {
        //     return url;
        // } else if (newUrl === "data:") {
        //     return url;
        // } else {
        //     return this.wordUrl() + url;
        // }
    }

}

let Utils = new Util()
export default Utils