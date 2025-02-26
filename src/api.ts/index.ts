import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const getUser = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/users`);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}

export { getUser };
