import axios from 'axios';

const handleGoogleLogin = async (response, successCallback, errCallback) => {
  try {
    const { tokenId } = response;
    await axios.post('http://localhost:4000/api/login/google', { tokenId });
    successCallback();
  } catch (err) {
    errCallback();
  }
};

export default handleGoogleLogin;
