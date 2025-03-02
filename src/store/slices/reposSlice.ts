import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRepos, PreparedRepo } from '../../api.ts';

interface ReposState {
	repositories: PreparedRepo[];
	page: number;
	hasMore: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: ReposState = {
	repositories: [],
	page: 1,
	hasMore: true,
	loading: false,
	error: null,
};

export const fetchRepos = createAsyncThunk<PreparedRepo[], { userName: string; page: number }>('repos/fetchRepos',
	async ({ userName, page }) => {
		const response = await getRepos(userName, page);
		return response;
	}
)

const reposSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {
		resetRepos(state) {
			state.repositories = [];
			state.page = 1;
			state.hasMore = true;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRepos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRepos.fulfilled, (state, action) => {
				state.loading = false;
				state.repositories = [...state.repositories, ...action.payload];
				state.hasMore = action.payload.length > 0;
				state.page += 1;
			})
			.addCase(fetchRepos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch repos';
			})
	}
})
const reposReducer = reposSlice.reducer;
export const { resetRepos } = reposSlice.actions;
export default reposReducer;