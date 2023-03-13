import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainCard from "./MainCard";

const links = {
    "电影": "/film/recommend",
    "电视剧": "/tv/recommend",
    "动画": "/animation/recommend"
}

const kind = {
    "电影": "is_movie",
    "电视剧": "is_tv",
    "动画": "is_animation"  
}

function MainBody(props){
    const [subjects,setSubjects]=useState([]);
    const url = `${process.env.REACT_APP_IPADDRESS}/subject/findSubjectByKind?order_by=score&current_page=1&page_size=6&kind=${kind[props.name]}`;

    useEffect(()=>{
        async function getSubject(){
            let response = await fetch(url);
            const result = await response.json();
            setSubjects(result);
            // console.log(result);
        }
        getSubject();
    // eslint-disable-next-line
    },[]) 

    const displayList = subjects.map((subject)=><MainCard data={subject} key={subject["subject_id"]}/>);

    return (
        <div className="homepage_section_container">
            <section>
                <div className="homepage_main_content_navbar">
                    <h2 className="homepage_main_content_title">{props.name}</h2>
                    <Link to={links[props.name]}><div className="more">更多</div></Link>
                </div>
                <div className="homepage_main_content">
                    {displayList}
                </div>
            </section>
        </div>
    );
}

export default MainBody;