import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateRecommendListButton from "../CreateRecommendListButton";
import DropDownButton from "../DropDownButton";
import PaginationComponent from "../PaginationComponent";
import { useAuthContext } from "../useAuthContext";

const dropDownList_1 = ["创建时间","名称"];
const dropDownList_1_prefix = "排序";

const defaultStyle = {
    color: "white", 
    backgroundColor: "#5a7385"
}

function FavoritesPage(props){
    const {userId} = useAuthContext();
    const [batch,setBatch] = useState(false);
    const [favoritesList,setFavoritesList] = useState([]);
    const [refresh,setRefresh]=useState(false);

    const BatchHandle = ()=> setBatch((batch)=>!batch);
    const RefreshHandle = ()=> setRefresh((refresh)=>!refresh);

    useEffect(()=>{
        async function getFavoritesList(){
            const url = `${process.env.REACT_APP_IPADDRESS}/favorites/findByUserId/${userId}`;
            let response = await fetch(url);
            const result = await response.json();
            setFavoritesList(result);
            // console.log(result);
        }
        getFavoritesList();
        // eslint-disable-next-line
    },[refresh])

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        const checkboxLabelList = document.querySelectorAll(".recommend_list_label");
        const links = document.querySelectorAll(".favorites_folder_header");
        
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

    function handleDelete(){
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(async (checkbox)=>{
            const favorites_id = checkbox.getAttribute("id");
            const url = `${process.env.REACT_APP_IPADDRESS}/favorites/deleteById/${favorites_id}`;
            let response = await fetch(url);
            // eslint-disable-next-line
            const result = await response.text();
            // if(result){
            //     console.log("删除成功");
            // }
            // else{
            //     console.log("删除失败");  
            // }
        })
        BatchHandle();
        RefreshHandle();
    }

    function TypeList(){
        if(!batch){
            return (
                <div className="personal_page_content_type_list">
                    <DropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#5a7385"}/>
                    <CreateRecommendListButton color={"#5a7385"} backgroundColor={"white"} setRefresh={RefreshHandle} />
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"编辑"}</button>
                </div>
            )
        }
        else{
            return (
                <div className="personal_page_content_type_list">
                    <button className="customized_button" style={defaultStyle} onClick={handleDelete}>删除</button>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"编辑"}</button>
                </div>
            )
        }
    }

    let favorites_list = favoritesList.map((favorites)=>{
        return (
            <div className="favorites_folder" key={favorites["favorites_id"]}>
                <Link to={`/personal/favorite/${favorites["favorites_id"]}`}className="favorites_folder_header">
                    <div className="favorites_folder_title">{favorites["favorites_name"]}</div>
                </Link>
                <label htmlFor={favorites["favorites_id"]} className="recommend_list_label">
                    <input type="checkbox" name="recommend_list_id" id={favorites["favorites_id"]} className="recommend_list_checkbox checkbox"/>
                </label>
            </div>
        )
    });

    return (
        <div className="favorites_page_container">
            <div className="favorites_page_content_container">
                <div className="favorites_page_header">
                    <div className="favorites_page_title">收藏夹</div>
                    <TypeList/>
                </div>
                <div className="favorites_folder_container">
                    {favorites_list}
                </div>         
                <div className="favorites_page_pagination">
                    <PaginationComponent link={"/personal/favorites"}/>
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage;