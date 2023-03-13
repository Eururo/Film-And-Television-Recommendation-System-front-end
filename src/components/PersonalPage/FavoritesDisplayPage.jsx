// import FavoritesCard from "./FavoritesCard";
import PaginationComponent from "../PaginationComponent";
import PersonalMainBodyNavbar from "./PersonalMainBodyNavbar";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NestedCard from "../NestedCard";

const dropDownButtonOptionList = [
    ["排序",["最近收藏","评分最高","最近发布"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = ["在看","已看","喜欢","收藏夹","收藏夹","收藏夹"];

function FavoritesDisplayPage(props){
    const {favorites_id} = useParams();
    const [favoritesName,setFavoritesName]=useState("");
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
        const url = `${process.env.REACT_APP_IPADDRESS}/favoritesItem/findById?favorites_id=${favorites_id}&order_by=${orderBy}&current_page=${currentPage}&page_size=${page_size}&type=${type}`;
        async function getSubjectList(){
            let response = await fetch(url);
            const result = await response.json();
            setSubjects(result);
            // console.log(result);
        }
        getSubjectList();
        // eslint-disable-next-line
    },[refresh,type,orderBy,currentPage])

    useEffect(()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/favorites/findById/${favorites_id}`;
        async function getFavorites(){
            let response = await fetch(url);
            const result = await response.json();
            setFavoritesName(result["favorites_name"]);
        }
        getFavorites()
    },[favorites_id])

    const lists = subjects.map((subject)=><NestedCard key={subject["subject_id"]} data={subject}/>)

    return (
        // <div className="favorites_display_page_container">
        //     <div className="favorites_display_page_content">
        <div className="personal_page_content_container">
            <div className="favorites_page_content_container">
                <div className="personal_page_content_navbar">
                    <h2 className="personal_page_content_title">{favoritesName}</h2>
                    <PersonalMainBodyNavbar favorites_id={favorites_id} setRefresh={RefreshHandle} orderBy={orderBy} setOrderBy={setOrderBy} type={type} setType={setType} pageName="收藏夹" dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
                </div>  
                <div className="personal_page_content">
                    <div className="nested_page_container">
                        <div className="nested_page_content">
                            {lists}
                        </div>
                        <div className="nestedpage_pagination">
                            <PaginationComponent link={`/personal/favorite/${favorites_id}`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default FavoritesDisplayPage;