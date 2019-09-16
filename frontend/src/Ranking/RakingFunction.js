import axios from 'axios';

export const getRanking = async () => {
    return await axios
    .get('/api/ranking')
    .then(res => {
        console.log("겟 랭킹");
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getLikeWeekRanking = async () => {
    return await axios
    .get('/api/likeranking/week')
    .then(res => {
        console.log('겟 위즈 랭킹');
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const getLikeMonthRanking = async () => {
    return await axios
    .get('/api/likeranking/month')
    .then(res => {
        console.log('겟 먼스 랭킹');
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}