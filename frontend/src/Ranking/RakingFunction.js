import axios from 'axios';

export const getRanking = async () => {
    return await axios
    .get('/api/raking')
    .then(res => {
        console.log("겟 랭킹");
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}