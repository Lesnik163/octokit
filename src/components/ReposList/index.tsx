import { PreparedRepo } from '../../api.ts/index.ts';
import { useSelector } from '../../store/hooks/index.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Paragraph from 'antd/es/typography/Paragraph';
import { Avatar, Card, Rate } from 'antd';

const ReposList = () => {
	const { repositories, loading, error } = useSelector(state => state.repos);
	return (
		<div>
			{loading && <Card loading={loading} style={{ minWidth: 400 }} />}
			{error && (
				<div style={{ color: 'red', textAlign: 'center' }}>Попробуйте ввести другое имя</div>
			)}
			{repositories && repositories.length === 0 && (
				<div style={{ textAlign: 'center', padding: '20px' }}>Введите имя, чтоб получить репозитории</div>
			)}
			{repositories && repositories?.length > 0 &&
				repositories.map((repo: PreparedRepo) => {
					return (
						<Card loading={loading} style={{ minWidth: 400, margin: 10 }} key={repo.id}>
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
			{!repositories && <p>У данного пользователя ещё не репозиториев</p>}
		</div>
	)
}

export default ReposList;