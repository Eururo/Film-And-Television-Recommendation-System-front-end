import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

function UserSubjectDisplayPage(){
    const {userId} = useAuthContext();
    const {subject_id} = useParams();
    const [subject,setSubject]=useState(null);
    const [userSubject,setUserSubject]=useState(null);

    const url = `${process.env.REACT_APP_IPADDRESS}/subject/findSubjectById/${subject_id}`;
    const url2 = `${process.env.REACT_APP_IPADDRESS}/userSubject/findUserSubject?user_id=${userId}&subject_id=${subject_id}`;

    // if(userSubject !== null){
    //     console.log(userSubject["score"]);
    // }

    async function getSubject(){
        if(subject === null || subject_id !== subject["subject_id"]){
            let response = await fetch(url);
            if(response !== null){
                let result = await response.json();
                setSubject(result);
                // console.log(result);
            }
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
    },[subject_id,userId]) 

    return (
        <div className="subject_edit_page_edit_section">
            <div className="subject_edit_page_title">{subject?subject["subject_name"]:""}</div>
            <div className="subject_edit_page_rating_section">
                <div className="subject_edit_page_rating_section_title">评分:</div>
                <Rating score={userSubject?userSubject["score"]:null} readOnly={true}/>
            </div>
            <div className="subject_edit_page_rating_section">
                <div className="subject_edit_page_rating_section_title">观看时间:</div>
                {userSubject?(userSubject["watch_time"]?handleDate(new Date(userSubject["watch_time"])).replace("T"," "):"还未填写"):"还未填写"}
            </div>
            <div className="subject_edit_page_recommend_section">
                <div className="subject_edit_page_rating_section_title">推荐理由:</div>
                <div className="subject_edit_page_recommend_reason">
                    {userSubject?(userSubject["recommend_reason"]?userSubject["recommend_reason"]:"还未填写"):"还未填写"}
                </div>
            </div>
            <div className="subject_edit_page_rating_section">
                <div className="subject_edit_page_rating_section_title">链接:</div>
                <div className="link_text"><a href={userSubject?userSubject["link"]:""} target="_blank" rel="noreferrer">{userSubject?(userSubject["link"]?userSubject["link"]:"还未添加"):"还未添加"}</a></div>
            </div>
            <Link to={`/userSubject/edit/${subject_id}`}><button className="customized_button subject_edit_page_button" style={defaultStyle}>编辑</button></Link>
        </div>
    )
}

export default UserSubjectDisplayPage;