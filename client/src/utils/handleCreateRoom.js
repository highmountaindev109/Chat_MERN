import axios from 'axios';

const handleCreateRoom = async (data, successCallback, errCallback) => {
  try {
    await axios.post('http://localhost:4000/api/room', data);
    successCallback();
  } catch (err) {
    let errMessage;

    if (err.response.status) {
      errMessage = err.response.data.message;
    } else {
      errMessage = 'Something went wrong, please try again later';
    }

    errCallback(errMessage);
  }
};

export default handleCreateRoom;
