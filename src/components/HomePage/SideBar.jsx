import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { useAuthContext } from "../useAuthContext";
import SideCard from "./SideCard";

function SideBar(props){
    const {userId}=useAuthContext();
    const [subjects,setSubjects]=useState([]);
    const page_size = 10;

    useEffect(()=>{
        if(userId){
            async function getWatchingList(){
                const url=`${process.env.REACT_APP_IPADDRESS}/personalPage/findWatchingList?user_id=${userId}&type=is_watching&order_by=collected_time&current_page=1&page_size=${page_size}`;
                let response = await fetch(url);
                const result = await response.json();
                setSubjects(result);
                // console.log(result);
            }
            getWatchingList();
        }
    },[userId])
    
    const displayList = subjects.map((subject)=><SideCard data={subject} key={subject["subject_id"]}/>);

    if(userId){
        return (
            <div className="homepage_sidebar_content_container">
                <section>
                    <div className="homepage_sidebar_content_navbar">
                        <h2 className="homepage_sidebar_content_title">正在观看的影片</h2>
                        <div className="more"><Link to="/personal/watching">更多</Link></div>
                    </div>
                    <div className="homepage_sidebar_content">
                        {displayList}
                    </div>
                </section>
            </div>
        )
    }
    else{
        return (
            <div className="homepage_sidebar_content_container">
                <section>
                    你还没有登录哦！<br/>
                    登录后可查看正在观看的影片！
                </section>
            </div>
        )
    }
}

export default SideBar;