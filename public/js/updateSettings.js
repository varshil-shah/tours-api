import { showAlert } from './alerts';

export const updateSettings = async (name, email) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/update-me',
      data: {
        name,
        email,
      },
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (error) {
    console.log(error.response);
    showAlert('error', 'Fail to update data!');
  }
};
