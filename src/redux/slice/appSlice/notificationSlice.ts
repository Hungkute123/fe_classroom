import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';
let socket: any;
interface IInitialState {
    socket:any;
    notification: any,
    status: string
}
const initialNotification = {
    socket:{},
    notification: [],
    status: "",
} as IInitialState
const handleGetNotification = async(state: any) =>{
    const data = await socket.on('dataNotification', (data: any, state:any) => {
        return data;
    });
    console.log(data);
    data.data.map((item: any) => {
        state.notification.push(item)
     })
}
export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,

    reducers: {
        connectNotification: (state, action) => {
            const ENDPOINT = String(process.env.URL_MY_SOCKET);
            state.socket = io(ENDPOINT, { transports: ['websocket'] });
            state.socket.on('connect', () => {
                console.log(state.socket.id); // x8WIv7-mJelg7on_ALbx
            });
            console.log(state.socket);
            state.socket.emit('getNotification', { _id: action.payload });

        },
        getNotification: (state, action) => {
            // let noti:any = [];
            // const data = socket.on('dataNotification', (data: any, state:any) => {
            //     noti = data;
               
            //     return data;
            // });
            handleGetNotification(state);
            // console.log(data);
            // console.log(noti);
            // noti.data.map((item: any) => {
            //    state.notification.push(item)
            // })
            
            
        },
        sendNotification:(state,action)=>{
            socket.emit('sendNotification', {
                notificationType: action.payload.notificationType,
                createDate: Date(),
                read: false,
                recipientID: action.payload.IDUser,
                senderID: action.payload._id,
                message: action.payload.message,
                className: action.payload.className,
                url: action.payload.url,
              });
        }
    },
    extraReducers: (builder) => {
    },
});

const { reducer, actions } = notificationSlice;
export const { connectNotification, getNotification, sendNotification } = actions;
export default reducer;