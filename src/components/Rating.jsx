import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

export default function HalfRating(props) {
  const [score,setScore] = useState(parseFloat(props.score));

  useEffect(()=>{
    setScore(props.score);
  },[props.score,score])

  const handleChange = (e)=>{
    setScore(e.target.value * 2);
    if(props.getScore){
      props.getScore(e.target.value * 2);
    }
  }

  if(props.readOnly){
    return (
      <div className='rating_box'>
        <Rating size={props.size} precision={0.1} max={5} value={score/2} onChange={handleChange} readOnly className="rating"/>
        <div className='rating_value'>{score?score:"未评分"}</div>
      </div>
    );
  }
  else{
    return (
      <div className='rating_box'>
        <div  className="rating">
          <Rating size={props.size} precision={0.1} max={5} value={score/2} onChange={handleChange}/>
        </div>
        <div className='rating_value'>{score?score:"未评分"}</div>
      </div>
    );
  }
}