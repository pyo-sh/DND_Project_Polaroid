import axios from 'axios';

export const getFollowerInfo = async userID => {
    return await axios
    .get(`/api/mypage/${userID}`)
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

export const getFollowingInfo = async userID => {
    return await axios
    .get(`/api/mypage/${userID}`)
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