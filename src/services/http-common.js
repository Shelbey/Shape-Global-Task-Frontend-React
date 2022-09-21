import axios from "axios";
import {environment} from "./environment";

export default axios.create({
    baseURL: environment.http_protocol + environment.http_separator + environment.api_end_point_url + ':' + environment.api_end_point_port + environment.api_context_path,
    headers: {
        "Content-type": "application/json"
    }
});

