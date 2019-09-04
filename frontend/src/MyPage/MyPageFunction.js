import axios from 'axios';

export const getAllInfo = async userID => {
    return await axios
    .get(`/api/mypage/${userID}`)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const editMyPage = async user => {
    return await axios
    .post('/api/mypage/edit',{
        ID : user.id,
        introduce : user.about,
        nickname : user.name
    })
    .then(res => {
        console.log("유저정보 업데이트 햇음");
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

export const checkPassword = async user => {
    return await axios
    .post('/api/user/login', {
        ID: user.id,
        PASSWORD : user.password
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
