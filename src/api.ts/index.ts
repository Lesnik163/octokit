import axios from 'axios';

const BASE_URL = 'https://api.github.com/';
export interface ServerRepo {
	id: number;
	name: string;
	description?: string;
	html_url: string;
	stargazers_count?: number;
	lastUpdateDate: string;
	updated_at: string;
	owner?: {
		avatar_url: string;
	}
}
export interface PreparedRepo {
	id: number,
	name: string,
	description: string,
	html_url: string,
	stars: number,
	lastUpdateDate: string,
	avatar: string,
}

const GITHUB_TOKEN = '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';

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${GITHUB_TOKEN}`,
		Accept: 'application/vnd.github.v3+json',
	},
});

const getRepos = async (userName: string, page: number) => {
	try {
		const reposArray = await axios.get(`${BASE_URL}users/${userName}/repos`,
			{
				params: {
					per_page: 20,
					page
				}
			}
		);

		const response = reposArray.data.map((repo: ServerRepo) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description,
			html_url: repo.html_url,
			stars: repo.stargazers_count,
			lastUpdateDate: repo.updated_at,
			avatar: repo.owner?.avatar_url,
		}))

		return response;

	} catch (error) {
		throw new Error("Не удалось загрузить репозитории. Проверьте имя пользователя.");
	}
}

export { getRepos };
