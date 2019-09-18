import axios from 'axios';

export const getRanking = async () => {
    return await axios
    .get('/api/ranking')
    .then(res => {
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
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}