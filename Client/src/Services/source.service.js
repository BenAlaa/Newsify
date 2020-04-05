import http from './http.service';
import { apiUrl} from '../config.json';

const apiEndpoint = apiUrl + "/sources";

export async function getSources(page=1, pageSize=12) {
    return await http.get(apiEndpoint, {params: {page,pageSize}});
}

export async function editSubscription(source) {
    return await http.put(`${apiUrl}/subscribe/switch`, {source})
}