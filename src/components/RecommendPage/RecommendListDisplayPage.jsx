import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import DropDownButton from "../DropDownButton";
import PaginationComponent from "../PaginationComponent";
import PersonalDropDownButton from "../PersonalDropDownButton";
// import PopUpButton from "../PopUpButton";
import RecommendCard from "../RecommendCard";

const dropDownList_1 = ["最近添加","评分最高","最近发布"];
const dropDownList_1_prefix = "排序";
const dropDownList_2 = ["电影","电视剧","动画"];
const dropDownList_2_prefix = "类别";

// const popUpOption = ["列表一","列表二","列表三"];

const defaultStyle = {
    color: "white", 
    backgroundColor: "#665867"
}

function RecommendListDisplayPage(props){
    const {list_id} = useParams();
    const [listName,setListName]=useState("");
    const [type,setType]=useState("is_movie");
    const [orderBy,setOrderBy]=useState("add_time");
    const [currentPage,setCurrentPage]=useState(1);
    const [subjects,setSubjects]=useState([]);
    const [refresh,setRefresh]=useState(false);
    const page_size = 4;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    if(currentPage !== page){
        setCurrentPage(page);
    }

    const RefreshHandle = ()=> setRefresh((refresh)=>!refresh);

    useEffect(()=>{
        async function getListName(){
            const url = `${process.env.REACT_APP_IPADDRESS}/recommendList/findById/${list_id}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setListName(result["list_name"]);
            }
        }
        getListName()
    },[list_id])

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
    },[orderBy,type,currentPage,refresh])

    const [batch,setBatch] = useState(false);
    const [select,setSelect] = useState(false);

    const BatchHandle = ()=> setBatch((batch)=>!batch);
    const SelectHandle = ()=>setSelect((select)=>!select);

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        const checkboxLabelList = document.querySelectorAll(".checkbox_label");
        const links = document.querySelectorAll(".nestedpage_card_link");
        if(!batch){
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="hidden";
            });
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="hidden";
            })
            links.forEach((link)=>{
                link.removeAttribute("onclick");
            })
        }
        else{
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="visible";
            });
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="visible";
            })
            links.forEach((link)=>{
                link.setAttribute("onclick","event.preventDefault()");
            })
        }
    },[batch])

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        if(!select||!batch){
            checkboxList.forEach((checkbox)=>{
                checkbox.checked=false;
            });
            setSelect(false);
        }
        else{
            checkboxList.forEach((checkbox)=>{
                checkbox.checked=true;
            });
        }
    },[batch,select])

    function removeCard(){
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(async (checkbox)=>{
            const subject_id = checkbox.getAttribute("id");
            const url = `${process.env.REACT_APP_IPADDRESS}/recommendListItem/delete?list_id=${list_id}&subject_id=${subject_id}`;
            await fetch(url);
        })
        BatchHandle();
        RefreshHandle();
    }

    function TypeList(){
        if(!batch){
            return (
                <div className="personal_page_content_type_list">
                    <PersonalDropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"#white"} backgroundColor={"#665867"} status={orderBy} setStatus={setOrderBy}/>
                    <PersonalDropDownButton optionList={dropDownList_2} prefix={dropDownList_2_prefix} color={"white"} backgroundColor={"#665867"} status={type} setStatus={setType}/>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"批量操作"}</button>
                </div>
            )
        }
        else{
            return (
                <div className="personal_page_content_type_list">
                    <button className="customized_button" onClick={SelectHandle} style={defaultStyle}>{select?"取消全选":"全选"}</button>
                    <button className="customized_button" style={defaultStyle} onClick={removeCard}>移出列表</button>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"批量操作"}</button>
                </div>
            )
        }
    }

    const lists = subjects.map((subject)=><RecommendCard key={subject["subject_id"]} data={subject}/>)

    return (
        <div className="recommend_page_container">
            <div className="recommend_page_navbar">
                <div className="recommend_list_display_page_title">{listName}</div>
                <TypeList/>
            </div>
            <div className="recommend_page_content_container">
                <div className="recommend_page_content">
                    {lists}
                </div>
            </div>
            <div className="recommend_page_pagination">
                <PaginationComponent link={`/recommendList/${list_id}`}/>
            </div>
        </div>  
    )
}

export default RecommendListDisplayPage;