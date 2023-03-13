import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NestedCard from "../NestedCard";
import PaginationComponent from "../PaginationComponent";
import { useAuthContext } from "../useAuthContext";
import PersonalMainBodyNavbar from "../PersonalPage/PersonalMainBodyNavbar";

const kind = {
    "收藏": "is_collected",
    "在看": "is_watching",
    "已看": "is_watched" ,
    "喜欢": "is_like" ,
    "已评分": "is_scored"
}

const pageName = "已看";
const pageLink = "/recommendList/home";
const dropDownButtonOptionList = [
    ["排序",["最近收藏","评分最高","最近发布"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = ["在看","喜欢"];

function RecommnedListHomePage(props){
    // const listsDatas = props.data;
    const {userId} = useAuthContext();
    const [type,setType]=useState("is_movie");
    const [orderBy,setOrderBy]=useState("collected_time");
    const [currentPage,setCurrentPage]=useState(1);
    const [subjects,setSubjects]=useState([]);
    const [refresh,setRefresh]=useState(false);
    const page_size = 12;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    if(currentPage !== page){
        setCurrentPage(page);
    }

    const RefreshHandle = ()=> setRefresh((refresh)=>!refresh);

    useEffect(()=>{
        // console.log(refresh);
        const url = `${process.env.REACT_APP_IPADDRESS}/personalPage/findItemList?user_id=${userId}&order_by=${orderBy}&current_page=${currentPage}&page_size=${page_size}&kind=${kind[pageName]}&type=${type}`;
        async function getSubjectList(){
            let response = await fetch(url);
            const result = await response.json();
            setSubjects(result);
            // console.log(result);
        }
        getSubjectList();
        // eslint-disable-next-line
    },[refresh,type,orderBy,currentPage])

    let lists = subjects.map((subject)=><NestedCard key={subject["subject_id"]} data={subject}/>);

    return (
        <div className="recommend_list_home_page_container">
            <div className="favorites_page_content_container">
                <div className="personal_page_content_navbar">
                    <h2 className="personal_page_content_title">首页</h2>
                    <PersonalMainBodyNavbar tag={true} setRefresh={RefreshHandle} orderBy={orderBy} setOrderBy={setOrderBy} type={type} setType={setType} link={pageLink} pageName={pageName} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
                </div>
                <div className="personal_page_content">
                    <div className="nested_page_container">
                        <div className="nested_page_content">
                            {lists}
                        </div>
                        <div className="nestedpage_pagination">
                            <PaginationComponent link={pageLink}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default RecommnedListHomePage;