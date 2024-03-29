import { showAlert } from './alerts';

// Type is either 'password' or 'data'
export const updateSettings = async (type, data) => {
  const path =
    type === 'data'
      ? '/api/v1/users/update-me'
      : '/api/v1/users/update-my-password';
  try {
    const response = await axios({
      method: 'PATCH',
      url: path,
      data: data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type} updated successfully!`);
    }
  } catch (error) {
    console.log(error.response);
    showAlert('error', error.response.data.message);
  }
};
