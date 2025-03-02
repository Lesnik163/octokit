import { useCallback, useState } from 'react';
import './App.css';
import Input from './components/Input';
import ReposList from './components/ReposList';
import { useDispatch, useSelector } from './store/hooks';
import { fetchRepos, resetRepos } from './store/slices/reposSlice';
import { debounce } from './helpers';
import ErrorBoundary from './components/ErrorBoundaries';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const firstPage = useSelector(state => state.repos.page)
  const [page, setPage] = useState<number>(firstPage)
  const dispatch = useDispatch();

  const fetchReposDebounced = useCallback(
    debounce((userName: string) => {
      dispatch(resetRepos());
      dispatch(fetchRepos({ userName, page }));
    }, 500),
    [dispatch]
  );

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value;
    setUserName(newUserName);
    setPage(1);
    fetchReposDebounced(newUserName);
  }, [fetchReposDebounced]);

  return (
    <>
      <ErrorBoundary>
        <Input handleInput={handleInput} name={userName} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ReposList userName={userName} setPage={setPage} />
      </ErrorBoundary>
    </>
  )
}

export default App
