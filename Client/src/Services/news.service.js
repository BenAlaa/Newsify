import http from './http.service';
import { apiUrl} from '../config.json';

const apiEndpoint = apiUrl + "/news";

export async function getNews(page=1, pageSize=20) {
    return await http.get(apiEndpoint, {params: {page,pageSize}});
}