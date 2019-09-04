import axios from 'axios';

export const getFollowerInfo = async userID => {
    return await axios
    .get(`/api/mypage/${userID}`)
    .then(res => {
        // 잘 되는지 확인하기 위한 console.log
        // console.log("가지고온다~")
        // console.log(res);
        return res.data.follower;
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
        return res.data.follow;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFollowInfo = async ({userID, start, count, follow}) =>{
    return await axios
    .get()
}


app.post('/api/file/photos', (req, res) => {
    let photos = [];
    let start = req.body.start;
    let count = req.body.count;
    let isMore = req.body.isMore;
    let fileCount = 0;
  
    fs.readdir('frontend/src/img/photo', (err, files) => {
      fileCount = files.length;
   
      for(let i = start; i < start + count; i++){
        if(fileCount >= i){
          photos.push(`photo${i}.jpg`);
          
          if (fileCount == i){
            isMore = false;
            break;
          }
        }
      }
      res.json({
       photos, isMore
      });
    });
  });