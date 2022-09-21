import http from "../services/http-common";

export class RequestService {

    static postRequest(url, params) {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;'
            }
        };
        return http.post(url, params, axiosConfig);
    }

}

