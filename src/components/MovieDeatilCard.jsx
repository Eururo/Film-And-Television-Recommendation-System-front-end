import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "./Rating";
import { useAuthContext } from "./useAuthContext";
// import { Rating } from "@mui/material";

function MovieDetailCard(props){
    const {userId} = useAuthContext();
    const {subject_id} = useParams();
    const [subject,setSubject]=useState(null);
    const [userSubject,setUserSubject]=useState(null);
    const navigate = useNavigate();

    const url = `${process.env.REACT_APP_IPADDRESS}/subject/findSubjectById/${subject_id}`;
    const url2 = `${process.env.REACT_APP_IPADDRESS}/userSubject/findUserSubject?user_id=${userId}&subject_id=${subject_id}`;

    async function getSubject(){
        if(subject === null || subject_id !== subject["subject_id"]){
            let response = await fetch(url);
            const result = await response.json();
            setSubject(result);
            // console.log(result);
        }
        if(userSubject === null || subject_id !== userSubject["subject_id"]){
            let data = await fetch(url2);
            let user_subject = await data.json();
            setUserSubject(user_subject)
            // console.log(user_subject);
        }
    }   

    useEffect(()=>{
        getSubject();
        // eslint-disable-next-line
    },[subject_id]) 
    
    async function CollectedChange(field){
        if(userId){
            const url = `${process.env.REACT_APP_IPADDRESS}/userSubject/updateUserSubject`;
            let status = (!userSubject["is_collected"]);
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user_id: userId,
                    subject_id: subject_id,
                    is_collected: status
                })
            });
            const result = await response.json();
            getSubject();
            console.log(result);
        }
        else{
            navigate("/login");
        }
        
    }

    async function WatchingChange(field){
        if(userId){
            const url = `${process.env.REACT_APP_IPADDRESS}/userSubject/updateUserSubject`;
            let status = (!userSubject["is_watching"]);
            // console.log(status);
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user_id: userId,
                    subject_id: subject_id,
                    is_watching: status
                })
            });
            const result = await response.json();
            getSubject();
            console.log(result);
        }
        else{
            navigate("/login");
        }
    }

    async function WatchedChange(field){
        if(userId){
            const url = `${process.env.REACT_APP_IPADDRESS}/userSubject/updateUserSubject`;
            let status = (!userSubject["is_watched"]);
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user_id: userId,
                    subject_id: subject_id,
                    is_watched: status
                })
            });
            const result = await response.json();
            getSubject();
            console.log(result);
        }
        else{
            navigate("/login");
        }
    }


    function InfoDisplay(){
        let director="";
        let scripter="";
        let actor="";
        let type="";
        let premiere="";
        let release_time="";

        if(subject !== null){
            if(subject["director"]!== null){
                director = JSON.parse(subject["director"]);
                if(director instanceof Array){
                    director = director.join(" / ");
                }
            }
            if(subject["scripter"]!== null){
                scripter = JSON.parse(subject["scripter"]);
                if(scripter instanceof Array){
                    scripter = scripter.join(" / ");
                }
            }
            if(subject["actor"]!== null){
                actor = JSON.parse(subject["actor"]);
                if(actor instanceof Array){
                    actor = actor.join(" / ");
                }
            }
            if(subject["type"]!== null){
                type = JSON.parse(subject["type"]);
                if(type instanceof Array){
                    type = type.join(" / ");
                }
            }
            if(subject["premiere"]!== null){
                premiere = JSON.parse(subject["premiere"]);
                if(premiere instanceof Array){
                    premiere = premiere.join(" / ");
                }
            }
            if(subject["release_time"]!== null){
                release_time = JSON.parse(subject["release_time"]);
                if(release_time instanceof Array){
                    release_time = release_time.join(" / ");
                }
            }

            return (
                <div className="movie_detail_content">
                    <div className="item title">{`${subject["subject_name"]}`}{subject["year"]?`(${subject["year"]})`:null}</div>
                    {director?<div className="item">导演:<span>&nbsp;&nbsp;&nbsp;</span>{`${director}`}</div>:null}
                    {scripter?<div className="item">编剧:<span>&nbsp;&nbsp;&nbsp;</span>{`${scripter}`}</div>:null}
                    {actor?<div className="item">主演:<span>&nbsp;&nbsp;&nbsp;</span>{`${actor}`}</div>:null}
                    {type?<div className="item">类型:<span>&nbsp;&nbsp;&nbsp;</span>{`${type}`}</div>:null}
                    {subject["country"]?<div className="item">制片国家/地区:<span>&nbsp;&nbsp;&nbsp;</span>{`${subject["country"]}`}</div>:null}
                    {subject["language"]?<div className="item">语言:<span>&nbsp;&nbsp;&nbsp;</span>{`${subject["language"]}`}</div>:null}
                    {release_time?<div className="item">上映时间:<span>&nbsp;&nbsp;&nbsp;</span>{`${release_time}`}</div>:null}
                    {subject["duration"]?<div className="item">时长:<span>&nbsp;&nbsp;&nbsp;</span>{`${subject["duration"]}`}</div>:null}
                    {premiere?<div className="item">首播:<span>&nbsp;&nbsp;&nbsp;</span>{`${premiere}`}</div>:null}
                    {subject["episodes"]?<div className="item">集数:<span>&nbsp;&nbsp;&nbsp;</span>{`${subject["episodes"]}`}</div>:null}
                    {subject["duration_of_single_episode"]?<div className="item">单集时长:<span>&nbsp;&nbsp;&nbsp;</span>{`${subject["duration_of_single_episode"]}`}</div>:null}
                </div>
            )
        }
        else{
            return null;
        }
    }

    function Score(){
        if(subject !== null){
            return (
                <div className="rating_section">
                    <div className="rating_display_section">
                        <div className="rating_title">评分：</div>
                        <Rating size="normal" score={subject["score"]} readOnly={true}/>
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }

    function Profile(){
        if(subject !== null){
            return (
                <p className="profile_content">
                    {subject["profile"]?subject["profile"]:null}
                </p>
            )
        }
        else{
            return null;
        }

    }

    return (
        <div className="movie_detail_card">
            <div className="movie_img_container">
                <Link to={`/userSubject/display/${subject_id}`}><img src={"/images/subject/" + subject_id +".jpeg"} alt="" className="movie_img"/></Link>
            </div>
            <div className="movie_content">
                <InfoDisplay/>
            </div>
            <div className="edit_section">
                <div className="collect_edit_section">
                    <div className="collect_box">
                        {userSubject?(userSubject["is_collected"]?<button className="collect_type true_button" onClick={CollectedChange}>收藏</button>:<button className="collect_type" onClick={CollectedChange}>收藏</button>):<button className="collect_type" onClick={CollectedChange}>收藏</button>}
                        {userSubject?(userSubject["is_watching"]?<button className="collect_type true_button" onClick={WatchingChange}>在看</button>:<button className="collect_type" onClick={WatchingChange}>在看</button>):<button className="collect_type" onClick={WatchingChange}>在看</button>}
                        {userSubject?(userSubject["is_watched"]?<button className="collect_type true_button" onClick={WatchedChange}>已看</button>:<button className="collect_type" onClick={WatchedChange}>已看</button>):<button className="collect_type" onClick={WatchedChange}>已看</button>}
                    </div>
                </div>
                <Score/>
            </div>
            <div className="movie_profile">
                <h3>简介：</h3>
                <Profile/>
            </div>
            
        </div>
    )
}

export default MovieDetailCard;