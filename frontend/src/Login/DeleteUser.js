import React, { Component} from "react";
import { deleteUser } from "./UserFunctions";
import jwt_decode from 'jwt-decode';

const id = () => {
    const token = localStorage.usertoken;
    const decodetoken = jwt_decode(token);
    const id = decodetoken.ID;
    console.log(id);
    return id;
}

class DeleteUser extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.del();
  };

  del = () => {
    const userID = id();
    deleteUser(userID).then(res => {
      console.log(res);
    });
    localStorage.removeItem('usertoken');
  };

  render() {
    return (
      <div>
        <div>유저 삭제</div>
        <form onSubmit={this.onSubmit}>
          <button type="submit">삭제</button>
        </form>
      </div>
    );
  }
}

export default DeleteUser;
