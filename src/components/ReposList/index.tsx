import { Repo } from '../../api.ts/index.ts';
import { useSelector } from '../../store/hooks/index.ts';

const ReposList = () => {
	const { repositories, loading, error } = useSelector(state => state.repos);

	if (loading) return (<div>Loading...</div>)
	if (error) return (<div>Error</div>)
	if (repositories && repositories?.length) {
		return (
			repositories.map((repo: Repo) => {
				return (
					<div key={repo.id} style={{ marginBottom: '10px' }}>
						<div>{repo.id}</div>
						<div>{repo.name}</div>
						<div>{repo.description}</div>
						<div>{repo.html_url}</div>
						<div>{repo.stars}</div>
						<div>{repo.lastUpdateDate}</div>
					</div>
				)
			})
		)
	} else {
		null
	}
};

export default ReposList;