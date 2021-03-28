import axios from 'axios' ;
import { IP } from './components/util' ;


const api = axios.create({
    baseURL : `http://${IP}/chat`
}) ;

const apiObj = {
    userRegister : () => api.get(`/rumi/insertRoom`),
    getCard : () => api.get('/rumi/getCard/'),
    userGetOut : userId => api.get(`/rumi/outUser/${userId}`),
    userTailCheck : tailList => api.post(`/rumi/checkCard`, tailList),
    getUsers : roomNum => api.get(`/rumi/getUsers/${roomNum}`),
    playGameStatus : (roomNum, status) => api.get(`/rumi/playGame/${roomNum}/${status}`)
} ;

export default apiObj ;