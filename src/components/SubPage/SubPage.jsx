import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import OptionListTransverse from "../OptionListTransverse";
import PaginationComponent from "../PaginationComponent";
import SubCard from "./SubCard";

const option_list = ["推荐","高分","最新"];
const temp = {
    "电影": "film",
    "电视剧": "tv",
    "动画": "animation",
}

const kind = {
    "电影": "is_movie",
    "电视剧": "is_tv",
    "动画": "is_animation"  
}

const order_by = {
    "推荐": `score`,
    "高分": `score`,
    "最新": `year`
}

function SubPage(props){
    const [type,setType]=useState(props.type);
    const [orderBy,setOrderBy]=useState("score");
    const [currentPage,setCurrentPage]=useState(1);
    const [subjects,setSubjects]=useState([]);
    const page_size = 28;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const order = useParams();

    if(orderBy !== order["order_by"]){
        setOrderBy(order["order_by"]);
    }
  
    if(currentPage !== page){
        setCurrentPage(page);
    }

    if(type !== props.type){
        setType(props.type);
    }

    useEffect(()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/subject/findSubjectByKind?order_by=${orderBy}&current_page=${currentPage}&page_size=${page_size}&kind=${kind[type]}`;
        async function getSubject(){
            let response = await fetch(url);
            const result = await response.json();
            setSubjects(result);
            // console.log(result);
        }
        getSubject();
    },[type,currentPage,orderBy]) 

    const lists = subjects.map((subject)=><SubCard data={subject} key={subject["subject_id"]}/>)

    const option_to_link = {
        "推荐": `/${temp[type]}/recommend`,
        "高分": `/${temp[type]}/score`,
        "最新": `/${temp[type]}/year`
    }

    return (
        <div className="subpage_container">
            <div className="subpage_navbar">
                <div className="subpage_title">{type}</div>
                <div className="subpage_option_list">
                    <OptionListTransverse option_list={option_list} option_to_link={option_to_link} setOrderBy={setOrderBy} order_by={order_by} color={"white"} backgroundColor={"#5a7385"}/>
                </div>
            </div>
            <div className="subpage_section_container">
                {lists}
                <div className="subpage_pagination">
                    <PaginationComponent link={`/${temp[type]}/${order["order_by"]}`}/>
                </div>
            </div>
        </div>
    )
}

export default SubPage;