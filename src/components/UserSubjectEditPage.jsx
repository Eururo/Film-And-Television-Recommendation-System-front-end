import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Rating from "./Rating";
import { useAuthContext } from "./useAuthContext";

const defaultStyle = {
    color: "white",
    backgroundColor: "#636167",
}

function handleDate(date){
    let Y = date.getFullYear() + "-";
    let M = (date.getMonth()+1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getMonth()) + "T";
    return `${Y}${M}${D}${date.toLocaleTimeString()}`;
}
    
function UserSubjectEditPage(props){
    const navigate = useNavigate();
    const current_time = new Date();
    const {userId} = useAuthContext();
    const {subject_id} = useParams();
    const [subject,setSubject]=useState(null);
    const [score,setScore]=useState(0);
    const [watchTime,setWatchTime]=useState(current_time);
    const [recommendReason,setRecommendReason]=useState("");
    const [link,setLink]=useState("");

    const watchTimeChange = (event)=>{setWatchTime(event.target.value)};
    const recommendReasonChange = (event)=>{setRecommendReason(event.target.value)};
    const linkChange = (event)=>{setLink(event.target.value)};

    useEffect(()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/subject/findSubjectById/${subject_id}`;
        async function getSubject(){
            let response = await fetch(url);
            if(response !== null){
                let result = await response.json();
                setSubject(result);
                // console.log(result);
            }
            const url2 = `${process.env.REACT_APP_IPADDRESS}/userSubject/findUserSubject?user_id=${userId}&subject_id=${subject_id}`;
            // console.log(url2);
            let data = await fetch(url2);
            let user_subject = await data.json();
            if(user_subject["score"] != null){
                setScore(user_subject["score"]);
            }
            if(user_subject["watch_time"] != null){
                setWatchTime(user_subject["watch_time"]);
            }
            if(user_subject["recommend_reason"] != null){
                setRecommendReason(user_subject["recommend_reason"]);
            }
            if(user_subject["link"] != null){
                setLink(user_subject["link"]);
            }
            // console.log(user_subject);
        }
        getSubject();
        // eslint-disable-next-line 
    },[subject_id,userId]) 

    if (!userId) {
        return <Navigate replace to="/login" />;
    }
    else {
        function update(){
            const updateUrl = `${process.env.REACT_APP_IPADDRESS}/userSubject/updateUserSubject`;
            async function updateUserSubject(){
                let temp = await fetch(updateUrl,{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        user_id: userId,
                        subject_id: subject_id,
                        score: score,
                        watch_time:watchTime,
                        recommend_reason:recommendReason,
                        link:link
                    })
                });
                const res = await temp.json();
                setScore(res["score"]);
                setWatchTime(res["watch_time"]);
                setRecommendReason(res["recommend_reason"]);
                setLink(res["link"]);
                // console.log(res);
                navigate(`/userSubject/display/${subject_id}`);
            }
            updateUserSubject()
        }

        return (
            <div className="subject_edit_page_edit_section">
                <h2 className="subject_edit_page_title">{subject?subject["subject_name"]:""}</h2>
                <div className="subject_edit_page_rating_section">
                    <div className="subject_edit_page_rating_section_title">评分:</div>
                    <Rating score={score} getScore={setScore}/>
                </div>
                <div className="subject_edit_page_rating_section">
                    <div className="subject_edit_page_rating_section_title">观看时间:</div>
                    <div className="subject_edit_page_input watch_time">
                        <input type="datetime-local" name="watch_time" value={handleDate(new Date(watchTime))} onChange={watchTimeChange}/>
                    </div>
                </div>
                <div className="subject_edit_page_recommend_section">
                    <div className="subject_edit_page_rating_section_title">推荐理由:</div>
                    <div className="subject_edit_page_textarea">
                        <textarea value={recommendReason} onChange={recommendReasonChange}/>
                    </div>
                </div>
                <div className="subject_edit_page_rating_section">
                    <div className="subject_edit_page_rating_section_title">链接:</div>
                    <div className="subject_edit_page_input">
                        <input type="text" name="link" value={link} onChange={linkChange}/>
                    </div>
                </div>
                <Link to={`/userSubject/display/${subject_id}`}><button className="customized_button subject_edit_page_button" style={defaultStyle}>取消编辑</button></Link>
                <button className="customized_button subject_edit_page_button" style={defaultStyle} onClick={update}>提交</button>
            </div>
        )
    }
}

export default UserSubjectEditPage;