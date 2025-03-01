import { useCallback, useState } from 'react';
import './App.css';
import Input from './components/input';
import ReposList from './components/ReposList';
import { useDispatch } from './store/hooks';
import { fetchRepos } from './store/slices/reposSlice';


const App = () => {
  const [userName, setUserName] = useState<string>('')
  const dispatch = useDispatch();

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    if (event.target.value === 'anton') {
      dispatch(fetchRepos(event.target.value));
    }
  }, [dispatch]);

  return (
    <>
      <Input handleInput={handleInput} name={userName} />
      <ReposList />
    </>
  )
}

export default App
