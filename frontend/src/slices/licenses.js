import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getLicenses = createAsyncThunk(
	'licenses/getLicenses',
	async () => {
		return fetch('api/metadata/licenses/').then((res)=> res.json()) 
	})


const licensesSlice = createSlice ({
	name: 'licenses',
	initialState: [],
	extraReducers: {
		[getLicenses.pending] : (state) => { state= 'loading'},
		[getLicenses.fulfilled] : (state, {payload}) => { 
			return state=[... payload.results]
		},
		[getLicenses.rejected] : (state) => { state= 'failed'}
	},
	 
})

export default licensesSlice.reducer