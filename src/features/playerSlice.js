import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAsyncPlayers = createAsyncThunk('players/fetchAsyncPlayers',async (pageCurrent)=>{

    const fetchPlayers = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        params: {page: `${pageCurrent}`, per_page: '15'},
        headers: {
          'X-RapidAPI-Key': '590bee806cmsh68df35f26db9b04p1cb438jsn17872e05d345',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      };
      
     return (axios.request(fetchPlayers).then(function(response) {
        // console.log("asyncthunk",response.data.data)
        
        return response.data.data;
      }))
})

export const playerSlice = createSlice({
    name : "firstState",
    initialState: { 
    playerlist : [],
    pageCurrent : 1,
    loading:false,
    },
    reducers:{
        // currentList: (state) => state.listCurrent,
        nextPage: (state, action)=>{
            state.pageCurrent += 1;    
        },   
        
    },
    extraReducers:{
        [fetchAsyncPlayers.pending]: (state) =>{
        //  console.log("pending")
        state.loading=true;
        },
        [fetchAsyncPlayers.fulfilled]: (state, action) =>{
            let list=[...state.playerlist,...action.payload]
            // console.log("fetched successful",list)
          state.playerlist=list
          state.loading=false
        },
        [fetchAsyncPlayers.rejected]: (state) =>{
           console.log("Rejected")
           state.loading=false;
        },


    }
});

export const { nextPage, addPlayerInList } = playerSlice.actions

export const getCurrentPage = (state) =>state.players.pageCurrent;

export const selectLoading = (state) =>state.players.loading;

export const getPlayersList = (state) =>state.players.playerlist;   


export default playerSlice.reducer