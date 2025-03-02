import { PreparedRepo } from '../../api.ts/index.ts';
import { useDispatch, useSelector } from '../../store/hooks/index.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Paragraph from 'antd/es/typography/Paragraph';
import { Avatar, Card, Rate } from 'antd';
import { useCallback, useEffect } from 'react';
import { fetchRepos } from '../../store/slices/reposSlice.ts';

type ReposListProps = {
	userName: string;
	setPage: (page: number) => void;
}

const ReposList: React.FC<ReposListProps> = ({ userName, setPage }) => {
	const { repositories, loading, error, hasMore, page } = useSelector(state => state.repos);
	const dispatch = useDispatch();

	const loadMoreRepos = useCallback(() => {
		if (hasMore && !loading) {
			dispatch(fetchRepos({ userName, page }));
			setPage(page + 1)
		}
	}, [userName, page, hasMore, loading, dispatch]);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 300) {
				loadMoreRepos();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loadMoreRepos]);

	return (
		<div>
			{loading && <Card loading={loading} style={{ minWidth: 260 }} />}
			{error && (
				<div style={{ color: 'red', textAlign: 'center' }}>Попробуйте ввести другое имя</div>
			)}
			{repositories.length === 0 && (
				<span style={{ textAlign: 'center' }}>Введите имя, чтоб получить репозитории</span>
			)}
			{repositories && repositories?.length > 0 &&
				repositories.map((repo: PreparedRepo) => {
					return (
						<Card loading={loading} style={{ minWidth: 260, margin: 10 }} key={repo.id}>
							<Card.Meta
								avatar={<Avatar src={repo.avatar} />}
								title={repo.name}
								description={
									<>
										<section>{repo.description}</section>
										<a href={repo.html_url} target='_blank'>ссылка на репозиторий</a>
										<Rate disabled defaultValue={repo.stars} style={{ display: 'block', marginTop: '10px' }} allowHalf />
										<Paragraph style={{ marginTop: '10px' }}>Последнее обновление: {format(new Date(repo.lastUpdateDate), 'dd.MM.yyyy, HH:mm', {
											locale: ru
										})}</Paragraph>
									</>
								}
							/>
						</Card >
					)
				})
			}
			{!hasMore && <p>Репозиториев больше нет 🙄</p>}
			{!repositories && <p>У данного пользователя ещё нет репозиториев 😔</p>}
		</div>
	)
}

export default ReposList;