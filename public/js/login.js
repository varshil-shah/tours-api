/* eslint-disable */
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });

    if (response.data.status === 'success') location.reload(true);
  } catch (error) {
    console.log(error.response);
    showAlert('error', 'Error while logging out! Try again');
  }
};
