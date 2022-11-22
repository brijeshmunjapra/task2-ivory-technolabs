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
        // console.log(response.data);
        return response.data;
      }))
})

export const playerSlice = createSlice({
    name : "players",
    initialState: {
    players : [],
    // playerlist : [],
    pageCurrent : 1,
    },
    reducers:{
        // currentList: (state) => state.listCurrent,
        nextPage: (state, action)=>{
            state.pageCurrent += 1;
            // console.log(action.payload.players.players.data,"payload")
            // state.players = {...state.players, ...action.payload};
            state.players = action.payload;
        },
        
        // addPlayers: (state, action)=>{
            // console.log(state.players, action.payload)
        //     state.playerlist = action.payload;
        // }
        
    },
    extraReducers:{
        [fetchAsyncPlayers.pending]: () =>{
         console.log("pending")
        },
        [fetchAsyncPlayers.fulfilled]: (state, action) =>{
            console.log("fetched successful")
         return {...state, players: action.payload}
        },
        [fetchAsyncPlayers.rejected]: () =>{
           console.log("Rejected")
        },


    }
});

export const { nextPage } = playerSlice.actions

export const getPlayers = (state) =>state.players.players;
export const getCurrentPage = (state) =>state.players.pageCurrent;
// export const getPlayersList = (state) =>state.playerlist;


export default playerSlice.reducer