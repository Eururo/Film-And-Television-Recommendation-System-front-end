import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PaginationComponent from "../PaginationComponent";
import PersonalDropDownButton from "../PersonalDropDownButton";
import RecommendCard from "../RecommendCard";
import { useAuthContext } from "../useAuthContext";

const dropDownList_1 = ["最近添加","评分最高","最近发布"];
const dropDownList_1_prefix = "排序";
const dropDownList_2 = ["电影","电视剧","动画"];
const dropDownList_2_prefix = "类别";

const defaultStyle = {
    color: "white", 
    backgroundColor: "#b6434a"
}

function UserRecommendListDisplayPage(props){
    const {userId}=useAuthContext();
    // const [id,setId]=useState(0);
    const {user_id}=useParams();
    const {list_id}=useParams();
    const [listName,setListName]=useState("");
    const [type,setType]=useState("is_movie");
    const [orderBy,setOrderBy]=useState("add_time");
    const [currentPage,setCurrentPage]=useState(1);
    const [subjects,setSubjects]=useState([]);
    const [subscribe,setSubscribe]=useState(false);
    const [refresh,setRefresf]=useState(false);
    const page_size = 4;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const RefreshHandle = ()=>setRefresf((refresh)=>!refresh);

    if(currentPage !== page){
        setCurrentPage(page);
    }

    useEffect(()=>{
        async function getSubscribeStatus(){
            const url=`${process.env.REACT_APP_IPADDRESS}/subscribe/findByUserIdAndListId?user_id=${userId}&list_id=${list_id}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result["user_id"] !== 0){
                // console.log(result);
                setSubscribe(true);
                // console.log("已订阅");
            }
            else{
                setSubscribe(false);
                // console.log("未订阅");
            }
        }
        async function getListName(){
            const url = `${process.env.REACT_APP_IPADDRESS}/recommendList/findById/${list_id}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setListName(result["list_name"]);
            }
        }
        getSubscribeStatus()
        getListName()
    },[userId,list_id,refresh])

    useEffect(()=>{
        async function getData(){
            const url=`${process.env.REACT_APP_IPADDRESS}/recommendListItem/findByListId?list_id=${list_id}&order_by=${orderBy}&type=${type}&current_page=${currentPage}&page_size=${page_size}`
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setSubjects(result);
                // console.log(result);
            }
        }
        getData();
        // eslint-disable-next-line
    },[orderBy,type,currentPage])

    async function Subscribe(){
        const url = `${process.env.REACT_APP_IPADDRESS}/subscribe/insert`;
        let response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user_id:userId,
                list_id:list_id
            })
        });
        const result = await response.text();
        // console.log(result);
        if(parseInt(result)){
            RefreshHandle();
        }
    }

    async function Unsubscribe(){
        const url = `${process.env.REACT_APP_IPADDRESS}/subscribe/deleteById`;
        let response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user_id:userId,
                list_id:list_id
            })
        });
        const result = await response.text();
        // console.log(result);
        if(parseInt(result)){
            RefreshHandle();
        }
    }

    const lists = subjects.map((subject)=><RecommendCard key={subject["subject_id"]} data={subject}/>)

    function Navbar(){
        if(userId===parseInt(user_id)){
            return (
                <div className="personal_page_content_type_list">
                    <PersonalDropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#b6434a"} status={orderBy} setStatus={setOrderBy}/>
                    <PersonalDropDownButton optionList={dropDownList_2} prefix={dropDownList_2_prefix} color={"white"} backgroundColor={"#b6434a"} status={type} setStatus={setType}/>
                </div>
            )
        }
        else if(subscribe){
            return (
                <div className="personal_page_content_type_list">
                    <PersonalDropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#b6434a"} status={orderBy} setStatus={setOrderBy}/>
                    <PersonalDropDownButton optionList={dropDownList_2} prefix={dropDownList_2_prefix} color={"white"} backgroundColor={"#b6434a"} status={type} setStatus={setType}/>
                    <button className="customized_button" style={defaultStyle} onClick={Unsubscribe}>取消订阅</button>
                </div>
            )
        }
        else{
            return (
                <div className="personal_page_content_type_list">
                    <PersonalDropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#b6434a"} status={orderBy} setStatus={setOrderBy}/>
                    <PersonalDropDownButton optionList={dropDownList_2} prefix={dropDownList_2_prefix} color={"white"} backgroundColor={"#b6434a"} status={type} setStatus={setType}/>
                    <button className="customized_button" style={defaultStyle} onClick={Subscribe}>订阅</button>
                </div>
            )
        }
    }

    return (
        <div className="recommend_page_container">
            <div className="recommend_page_navbar">
                <div className="recommend_list_display_page_title" style={{color:"#b6434a"}}>{listName}</div>
                <Navbar/>
            </div>
            <div className="recommend_page_content_container">
                <div className="recommend_page_content">
                    {lists}
                </div>
            </div>
            <div className="recommend_page_pagination">
                <PaginationComponent link={`/user/${user_id}/recommendlist/${list_id}`}/>
            </div>
        </div>  
    )
}

export default UserRecommendListDisplayPage;