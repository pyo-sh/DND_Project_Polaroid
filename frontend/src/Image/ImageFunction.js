import axios from 'axios';

export const getFilm = async userID => {
    return await axios
    .get(`/api/film/${userID}`)
    .then(res => {
        // 잘 되는지 확인하기 위한 console.log
        // console.log("가지고온다~")
        // console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const minusFilm = async info => {
    return await axios
    .post('/api/film/minus', {
        info
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFolder = async userID => {
    return await axios
    .post('/api/favorite', {
        userID
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const addFolder = async info => {
    return await axios
    .post('/api/favorite/addFolder', {
        info
    })
    .then(res => {
        return res;
    })
}

export const addPhotoInFolder = async info => {
    return await axios
    .post('/api/favorite/addPhotoInFolder', {
        info
    })
    .then(res => {
        return res;
    })
}