import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAsyncPlayers, getPlayers, getCurrentPage} from '../features/playerSlice';
import {useParams} from 'react-router-dom';



function PlayerInfo() {

  const params = useParams();

  const dispatch = useDispatch();

  const players = useSelector(getPlayers);
  const curntPage = useSelector(getCurrentPage);

  let dataArray = players.data;
  

  useEffect(() => {

    !dataArray && dispatch(fetchAsyncPlayers(curntPage));
    
   });

   const play = dataArray && dataArray.filter((player)=> 
  
   player.id.toString() === params.id,
   );

  //  useEffect(()=>{
  //   dataArray && dataArray.filter((player)=> 

  //   console.log(typeof(params.id)))
  //  })
  
  return (
    <div>
    <h1> First Name : {play && play[0].first_name}</h1>

    <h2> Last Name : {play && play[0].last_name}</h2>

    {/* <h2>Height : {(play && play[0]?.height_feet == null)? (<>Not available</>):(play[0]?.height_feet)}</h2> */}
    <hr/>

    <h1>Team Details</h1>

    <h2>City : {play && play[0].team.city}</h2>
    <h2>Division : {play && play[0].team.division}</h2>
    <h2>Full name : {play && play[0].team.full_name}</h2>

    </div>
  )
}

export default PlayerInfo