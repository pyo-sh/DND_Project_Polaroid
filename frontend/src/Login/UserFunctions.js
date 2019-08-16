import axios from 'axios';

export const register = async newUser => {
    return await axios
    .post('/user/register', {
        ID : newUser.ID,
        PASSWORD : newUser.PASSWORD,
        email : newUser.email,
        nickname : newUser.nickname,
    })
    .then(res => {
        console.log("Registered")
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const login = async user => {
    return await axios
    .post('/user/login', {
        ID: user.ID,
        PASSWORD : user.PASSWORD
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data.token)
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
