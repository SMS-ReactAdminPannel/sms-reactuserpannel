import axios from 'axios';

const backEndUrl: string = 'https://sms-node-backend-17xb.onrender.com';

const Axios = axios.create({
	baseURL: backEndUrl,

	timeout: 50000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken');

	if (token) {
		config.headers['Authorization'] =
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsInV1aWQiOiJiZjcyMzQ1MS1hM2NkLTRkMWYtYjIwZi1lZjBiMDcwZGRlOWIiLCJpZCI6IkMxMDEiLCJpYXQiOjE3NDkwMTMyNTUsImV4cCI6MTc1MTYwNTI1NX0.TKcr0MH2OSFSghD2S3JlHuw8WKp3jLmgR-E_X2xqo_3kEZLto6ukiSUV-iTltnSWE-eRFKI3-XqSQJM68lHjstZw0QnS3CQlSJs1gskh0a0U9_kOmZxYf7ZPSrtq_G2CvVtSJi1sYNkZkr-CzuoMcxgyYe_yDdVWCtsp_ONl5UYM2mwXGRe47WKwXdw8cmyO0KWmyElqPKU9acDwyyu9HvK_EI9emr6Mba8MwJWuDGaBUEpZnTGOMl80fDy60PEz1ept2eQNC7rFvq7XZFWmZ2dm7UMjScgOk1_xg6ssmbFKpbnF7ecCMSkNvIak0uQFGTgM2XOtCGGUmd0Ls6oqTg';
	}
	return config;
});

class HttpClient {
	async get(url: string, params?: string) {
		const response: unknown = await Axios.get(url, {
			params: params,
			headers: {},
		});
		return response;
	}

	async post(url: string, data: any) {
		const response: unknown = await Axios.post(url, data, {
			headers: {},
		});
		return response;
	}

	async update(url: string, params: string, data: string) {
		const response = await Axios.put(url, data, {
			params: params,
			headers: {},
		});
		return response?.data;
	}

	async patch(url: string, params: string, data: string) {
		const response = await Axios.put(url, data, {
			params: params,
			headers: {},
		});
		return response?.data;
	}

	async delete(url: string, params: string) {
		const response = await Axios.delete(url, { params: params });
		return response?.data;
	}

	async fileGet(url: string) {
		const response = await Axios.get(url, {
			responseType: 'blob',
			headers: {},
		});
		return response;
	}

	async uploadFile(url: string, data: string) {
		const response = await Axios.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response?.data;
	}
}

export default new HttpClient();
