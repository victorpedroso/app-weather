import axios from "axios";
import { apiKey } from "@/constants";
import 'react-native-url-polyfill/auto';


const foreacastEndpoint = (params: any) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no`;
const locationsEndpoint = (params: any) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiGet = async (endpoint: any) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data;
        
    } catch (error) {
     console.log(error);
     return error;   
    }
};

export const fetchWeatherForecast = (params: any) => {
    return apiGet(foreacastEndpoint(params));
}

export const fetchLocations = (params: any) => {
    return apiGet(locationsEndpoint(params));
}
