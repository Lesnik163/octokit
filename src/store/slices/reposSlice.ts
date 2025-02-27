import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRepos, Repo } from '../../api.ts';

interface ReposState {
	repositories: Repo[];
	loading: boolean;
	error: string | null;
}

const initialState: ReposState = {
	repositories: [],
	loading: false,
	error: null,
};

export const fetchRepos = createAsyncThunk<Repo[], string>('repos/fetchRepos',
	async (userName: string) => {
		const response = await getRepos(userName);
		return response;
	}
)

const reposSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRepos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRepos.fulfilled, (state, action) => {
				state.loading = false;
				console.log(action.payload);
				state.repositories = action.payload;
			})
			.addCase(fetchRepos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch repos';
			})
	}
})
const reposReducer = reposSlice.reducer;
export default reposReducer;