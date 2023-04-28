import ssToken from "./token";
import * as sstk from 'shutterstock-api'
export const SHUTTERSTOCK_API = 'https://api.shutterstock.com/v2/images/search'

sstk.setAccessToken(ssToken)

const imagesApi = new sstk.ImagesApi()

export const imageSearch = async (query) => {
    const queryParams = {
        'query': query,
        'aspect_ratio_min': 1.4,
        'aspect_ratio_max': 1.6
    }

    const response = await imagesApi.searchImages(queryParams)

    console.log(response)

    return response.data
}

export const imageSearchById = async (id) => {

    const response = await imagesApi.getImage(id)

    console.log(response)

    return response
}