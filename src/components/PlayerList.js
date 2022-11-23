import React, { useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getPlayersList, selectLoading, getCurrentPage, nextPage } from "../features/playerSlice";
import LoadingBar from 'react-top-loading-bar'

import { fetchAsyncPlayers } from "../features/playerSlice";
import { Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

function PlayerList() {
  const ref = useRef(null)
  const [isHovering, setIsHovering] = useState(false);
  const [select, setSelect] = useState(0);

  const dispatch = useDispatch();

  const playerslist = useSelector(getPlayersList);
  const loading = useSelector(selectLoading)
  // const [page, setPage] = useState(1);

  const curntPage = useSelector(getCurrentPage);
 // const nextpage = useSelector(nextPage);
  // const addinplayerlist = useSelector(addPlayerInList);

  // const playerslistArrayUpadetd = [];

  
  // playerslistArray.map((place)=>{
  //     playerslistArrayUpadetd.push(place);
  //   })
  

  useEffect(() => {
    //console.log(playerslist)
   playerslist && dispatch(fetchAsyncPlayers(curntPage))
  }, [curntPage])
  
useEffect(() => {
  console.log("player",playerslist)
}, [playerslist])



  // useEffect(() => {
  //   !dataArray && dispatch(fetchAsyncPlayers(curntPage));
    
  //   // console.log(dataArray)
  // }, [curntPage, dispatch, dataArray, players]);

  

  const handleMouseOver = (event, index) => {
    setIsHovering(true);
    setSelect(index);
  };

  const scrollToEnd = () => {
    //setPage(page+1)
    dispatch(nextPage());
  };
  
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };


  useEffect(() => {
   if(loading){
    ref.current.continuousStart()
   }else{
    ref.current.complete()
   }
  }, [loading])
  

  return (
    <>
      <LoadingBar color='#f11946' ref={ref} />
      <div className="sliderContainer">
    
    
          { playerslist &&
            playerslist.map((player, index) => (
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
        {/* </InfiniteScroll> */}

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
