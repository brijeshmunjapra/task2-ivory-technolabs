import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlayers, getCurrentPage, getPlayersList } from "../features/playerSlice";
import { nextPage } from "../features/playerSlice";
import { getPlayers } from "../features/playerSlice";

import { fetchAsyncPlayers } from "../features/playerSlice";
import { Link } from "react-router-dom";

function PlayerList() {
  const [isHovering, setIsHovering] = useState(false);
  const [select, setSelect] = useState(0);
  
  const dispatch = useDispatch();

  const players = useSelector(getPlayers);
  const curntPage = useSelector(getCurrentPage);
  // const playerlist = useSelector(addPlayers);
  
  const nextpage = useSelector(nextPage);

  let dataArray = players.data;


  useEffect(() => {
    !dataArray && dispatch(fetchAsyncPlayers(curntPage));
  },[curntPage, dispatch, dataArray, players]);

  // useEffect(() => {
  //   !playerlist && dispatch(fetchAsyncPlayers(curntPage));
  //   console.log(playerlist.payload.players.playerlist);
  // },[curntPage, dispatch]);


  const handleMouseOver = (event, index) => {
    setIsHovering(true);
    setSelect(index);
  };

  const scrollToEnd = ()=>{
     dispatch(nextpage);
  }

  window.onscroll = function(){
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      scrollToEnd()
    }

  }

  return (
    <>
      {/* <h1>You are on Page No: {curntPage}</h1>
    <hr/> */}

      <div className="sliderContainer">
        
          {/* loading ? (
          <Loading />
        ) : ( */}
          {dataArray &&
          dataArray.map((player, index) => (
            <div
              className="slider"
              key={index}
              onMouseOver={(event) => handleMouseOver(event, index)}
            >
              <Link to={`/${player.id}`}>
                {select === index && isHovering ? (
                  <h1 className="hovered_Container">
                    {player.first_name + " " + player.last_name}
                  </h1>
                ) : (
                  <div>
                    <h2>{player.first_name}</h2>
                  </div>
                )}
              </Link>

              <hr></hr>
            </div>
          ))}
          

        {/* <div className="pageContainer">
          <button className="buttons" onClick={() => dispatch(prevpage)}>
            Prev
          </button>
          <h1>{curntPage}</h1>
          <button className="buttons" onClick={() => dispatch(nextpage)}>
            Next
          </button>
        </div> */}
      </div>
    </>
  );
}

export default PlayerList;
