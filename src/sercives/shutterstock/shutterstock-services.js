import axios from "axios";
import ssToken from "./token";
import * as sstk from 'shutterstock-api'
export const SHUTTERSTOCK_API = 'https://api.shutterstock.com/v2/images/search'

// const config = {
//     headers: {
//         Authentication: `Bearer ${ssToken}`,
//         "Access-Control-Allow-Credentials": true,
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     }
// }

sstk.setAccessToken(ssToken)

const imagesApi = new sstk.ImagesApi()

// const api = axios.create({
//     withCredentials: true,
// });

export const imageSearch = async (query) => {
    const queryParams = {
        'query': query,
        'aspect_ratio_min': 1.4,
        'aspect_ratio_max': 1.6
    }

    const response = await imagesApi.searchImages(queryParams)

    console.log(response)

    return response.data

    // const response = await api.get(`${SHUTTERSTOCK_API}?query=${query}`, {
    //     headers: {
    //         'Authorization': `Bearer ${ssToken}`
    //     }
    // })
    // const json = await response.data
    // return json.data
}