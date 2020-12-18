import { message } from 'antd';


export const appMessage = (msg, type) => {
    message[type](msg);
}

