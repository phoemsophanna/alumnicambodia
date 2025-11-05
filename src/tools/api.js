import axios from "axios";
import { api } from "src/config";

const axiosInstance = axios.create({
	baseURL: api.BASE_URL,
	header: {
		ContentType: "program/json"
	},
});

export const fetchData = async (url, options = {}) => {
	try {
		const response = await axiosInstance(url, options);
		return response.data;
	} catch (error) {
		console.error("Error retrieving data:", error);
        return error;
	}
};

export const postData = async (url, options = {}) => {
	try {
		const response = await axiosInstance.post(url, options);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
        return error;
	}
};
