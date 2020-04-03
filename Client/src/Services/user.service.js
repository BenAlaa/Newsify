import http from './http.service';
import { apiUrl} from '../config.json';

const apiEndpoint = apiUrl + "/auth";
function getUserUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function getUser(userId){
    return http.get(getUserUrl(userId));
}