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

export const getAllFavorite = async userID => {
    return await axios
    .post('/api/favorite/getAll', {
        userID
    })
    .then(res =>{
        return res.data;
    })
}

export const getBenefitMonth = async userID => { // 작가의 모든 월별 수익들을 가지고 올꺼임
    return await axios
    .post('/api/images/getBenefitMonth', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err=> {
        console.error(err);
    })
}

export const getAllFilmList = async userID => {
    return await axios
    .post('/api/film/getAllFilmList', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
    })
}