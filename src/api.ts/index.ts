import axios from 'axios';

const BASE_URL = 'https://api.github.com/';
export interface Repo {
	id: number;
	name: string;
	description?: string;
	html_url: string;
	stars?: number;
	lastUpdateDate: string;
}

const GITHUB_TOKEN = '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';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${GITHUB_TOKEN}`,
		Accept: 'application/vnd.github.v3+json',
	},
});

const getRepos = async (userName: string) => {
	try {
		const reposArray = await axios.get(`${BASE_URL}users/${userName}/repos`);

		const response = reposArray.data.map((repo: Repo) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description,
			html_url: repo.html_url,
			stars: repo.stars,
			lastUpdateDate: repo.lastUpdateDate
		}))
		return response;

	} catch (error) {
		console.error(error);
		return [];
	}
}

export { getRepos };
