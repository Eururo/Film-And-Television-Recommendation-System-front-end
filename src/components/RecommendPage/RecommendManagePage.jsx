import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateListButton from "../CreateListButton";
// import CreateRecommendListButton from "../CreateRecommendListButton";
import DropDownButton from "../DropDownButton";
import PaginationComponent from "../PaginationComponent";
import { useAuthContext } from "../useAuthContext";

const dropDownList_1 = ["创建时间","最多订阅"];
const dropDownList_1_prefix = "排序";

const defaultStyle = {
    color: "white", 
    backgroundColor: "#665867"
}

// const recommend_lists = ["有村架纯","吉高由里子","长泽雅美"];

function RecommendManagePage(props){
    const {userId} = useAuthContext();
    const [batch,setBatch] = useState(false);
    const [recommendList,setRecommendList]=useState([]);
    const [refresh,setRefresh]=useState(false);

    const BatchHandle = ()=> setBatch((batch)=>!batch);
    const RefreshHandle = ()=> setRefresh((refresh)=>!refresh);

    useEffect(()=>{
        const url=`${process.env.REACT_APP_IPADDRESS}/recommendList/findByUserId/${userId}`;
        async function getRecommendList(){
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setRecommendList(result);
                // console.log(result);
            }
        }
        getRecommendList();
    },[userId,refresh])

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        const checkboxLabelList = document.querySelectorAll(".recommend_list_label");
        const links = document.querySelectorAll(".recommend_list_header");

        if(!batch){
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="hidden";
            });
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="hidden";
                checkbox.checked=false;
            });
            links.forEach((link)=>{
                link.removeAttribute("onclick");
            });
        }
        else{
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="visible";
            });
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="visible";
            });
            links.forEach((link)=>{
                link.setAttribute("onclick","event.preventDefault()");
            })
        }
    },[batch])

    function DeleteList(){
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(async (checkbox)=>{
            const list_id = checkbox.getAttribute("id");
            const url = `${process.env.REACT_APP_IPADDRESS}/recommendList/deleteById/${list_id}`;
            await fetch(url);
            
        })
        BatchHandle();
        RefreshHandle();
    }

    const recommendDisplayList = recommendList.map((recommend_list)=>{
        return (
            <div key={recommend_list["list_id"]} className="recommend_list">
                <Link to={`/recommendList/${recommend_list["list_id"]}`} className="recommend_list_header">
                    <div className="recommend_list_title">{recommend_list["list_name"]}</div>
                </Link>
                <label htmlFor={recommend_list["list_id"]} className="recommend_list_label">
                    <input type="checkbox" name="recommend_list_id" id={recommend_list["list_id"]} className="recommend_list_checkbox checkbox"/>
                </label>
            </div>
        )
    });

    function TypeList(){
        if(!batch){
            return (
                <div className="personal_page_content_type_list">
                    <DropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#665867"}/>
                    <CreateListButton color={"#665867"} backgroundColor={"white"} setRefresh={RefreshHandle}/>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"编辑"}</button>
                </div>
            )
        }
        else{
            return (
                <div className="personal_page_content_type_list">
                    <button className="customized_button" style={defaultStyle} onClick={DeleteList}>删除列表</button>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"编辑"}</button>
                </div>
            )
        }
    }

    return (
        <div className="recommend_manage_page_content">
            <div className="recommend_manage_page_content_header">
                <div className="recommend_manage_page_content_title">列表管理</div>
                <TypeList/>
            </div>
            <div className="recommend_list_container">
                {recommendDisplayList}
            </div>
            <div className="recommend_page_pagination">
                <PaginationComponent link={"/recommendList/manage"}/>
            </div>
        </div>
    )
}

export default RecommendManagePage;