import axios from "axios";
import { REACT_APP_TRAVEL } from "@env"

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const { data: { data, } } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: bl_lat ? bl_lat : '51.38494012429096',
                    tr_latitude: tr_lat ? tr_lat : '51.67234324898703',
                    bl_longitude: bl_lng ? bl_lng : '-0.3514683384218145',
                    tr_longitude: tr_lng ? tr_lng : '0.1482710335611201',
                    limit: '30',
                    currency: 'USD',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': REACT_APP_TRAVEL,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                },
            }
        )
        return data
    } catch (error) {
        return null
    }
}

export default getPlacesData