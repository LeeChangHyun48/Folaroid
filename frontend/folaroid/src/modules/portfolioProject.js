import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../lib/api/portfolioProjectAPI';

export const getProjectsThunk = createAsyncThunk(
    'portfolioProject/GetProjects',
    async () => {
        const response = await api.getProjects();
        return response.data;
    }
);

export const portfolioProject = createSlice({
    name: 'portfolioProject',
    initialState: {
        projects: [],
    },
    reducers: {
        deleteProject: (state, action) => {
            return {
                projects: state.projects.filter(
                    (project) => project.id !== action.payload
                ),
            };
        },
    },
    extraReducers: {
        [getProjectsThunk.fulfilled.type]: (state, action) => {
            state.projects = action.payload;
        },
    },
});

export default portfolioProject.reducer;