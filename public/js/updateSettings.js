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
      url: `http://localhost:3000${path}`,
      data: data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (error) {
    console.log(error.response);
    showAlert('error', error.response.data.message);
  }
};
