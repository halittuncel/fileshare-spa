export const api = `http://localhost:5000/api/`;

export const token = localStorage.getItem('token');

export const options = {
  headers: { Authorization: `Bearer ${token}` },
};

export const options2 = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
};
