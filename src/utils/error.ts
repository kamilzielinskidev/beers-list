import axios from 'axios';

const handle = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response != null) {
      console.error(`Server returned an error with status code: ${error.response.status}`);
    } else {
      console.error('Axios library internal error');
    }
  } else {
    console.error('Internal code error, we did something wrong');
  }
};

export default handle;
