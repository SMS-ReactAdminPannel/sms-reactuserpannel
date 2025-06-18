import axios from 'axios';

const backEndUrl: string = 'http://localhost:3000';

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
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsInV1aWQiOiI1Yjk3M2UxZC03MTg3LTQ4NjMtYTI1Ni1hNTM4YzczOWFjMjAiLCJpZCI6IkMxMDEiLCJpYXQiOjE3NDkxODMyMjYsImV4cCI6MTc1MTc3NTIyNn0.cHLqhmKAzcMfCSE5Uw5iVlRzuerLlPr69nydBrdbsR8wCdPZ8xBTrnpdQbkY8UdwYmtDgL-kEkmSqdFjzGhQzo6avV6Nm9BEqC6EXga1AyVk7p8oi71XDVgkboFtD-vQiYDmRWYJdDGyRPbbEgb401cjn_Ub8qIDFT6eaedHEh5h7y8Wk7gnNx5NXP5cT44WBMRaAolk0ziOu4enXJ14Op9Oler-gWYYe9pB5sEY-y9kAg2QY-eSlXZNEXEdz_eVzOy3rw4wafHKm8BsHneq4axE-741Qjmg_AVZvKbRXULbV0bMb1mzbJ7gMRAcWIUY8fMGriGPAeFuo9xrldZ26g';
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

	async update(url: string, data: string, params?: string) {
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
