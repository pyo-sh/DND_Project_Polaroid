import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const addFollow = async (userID, targetID) => {
  const info = {
    followID: userID,
    followerID: targetID
  }
  return await axios
  .post('api/Follow/addFollow', {info})
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log(err);
  })
}

export const deleteFollow = async (userID, targetID) => {
  return await axios
  .post('api/Follow/deleteFollow',{
    followID: userID,
    followerID: targetID
  })
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log(err);
  })
}

export const getFollowingInfo = async userID => {
  return await axios
    .post(`/api/Follow/getFollow`, {
      followID: userID
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
}

export const getFollowerInfo = async userID => {
  return await axios
  .post(`/api/Follow/getMyFollow`, {
    followerID: userID
  })
  .then(res => {
    console.log("팔로워의 res는")
    console.log(res);
    return res;
  })
  .catch(err => {
    console.log(err);
  })
}

export const isFollowInfo = async (userID, targetID) =>{
  return await axios
  .post('/api/Follow/getOneFollow', {
    followID: userID,
    followerID: targetID
  })
  .then(res => {
    let isFollow;
    if(res.data === null)
      isFollow = false;
    else
      isFollow = true;
    return isFollow;
  })
}

export const getMyID = () => {
  let token = '';
  localStorage.usertoken ? token = localStorage.getItem('usertoken') : token = sessionStorage.getItem('usertoken');
  const decode = jwt_decode(token);
  const ID = decode.ID;
  return ID;
}

// 얼마만큼의 데이터를 받을 것인지.
export const getFollowingSome = async (userID, start, count) => {
  return await axios
    .post(`/api/Follow/getFollowLimit`, {
      followID: userID,
      start: start,
      count: count
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
}
export const getFollowerSome = async (userID, start, count) => {
  return await axios
  .post(`/api/Follow/getMyFollowLimit`, {
    followerID: userID,
    start : start,
    count: count
  })
  .then(res => {
    return res;
  })
  .catch(err => {
      console.log(err);
  })
}