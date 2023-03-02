import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33190219-0860edc2b5cf578f738ea4f26';

export async function fetchImg(query, page) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
