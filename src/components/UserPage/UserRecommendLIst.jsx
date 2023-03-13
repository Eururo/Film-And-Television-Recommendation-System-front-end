import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DropDownButton from "../DropDownButton";
import PaginationComponent from "../PaginationComponent";

const dropDownList_1 = ["创建时间","最多订阅"];
const dropDownList_1_prefix = "排序";

const defaultStyle = {
    color: "white", 
    backgroundColor: "#b6434a"
}

function UserRecommendList(props){
    const {user_id} = useParams();
    const [recommendList,setRecommendList]=useState([]);

    useEffect(()=>{
        const url=`${process.env.REACT_APP_IPADDRESS}/recommendList/findByUserId/${user_id}`;
        async function getRecommendList(){
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setRecommendList(result);
                // console.log(result);
            }
        }
        getRecommendList();
    },[user_id])

    const displayList = recommendList.map((recommend_list)=>{
        return (
            <div key={recommend_list["list_id"]} className="recommend_list">
                <Link to={`/user/${user_id}/recommendlist/${recommend_list["list_id"]}`} className="recommend_list_header" style={defaultStyle}>
                    <div className="recommend_list_title">{recommend_list["list_name"]}</div>
                </Link>
                <label htmlFor={recommend_list["list_id"]} className="recommend_list_label">
                    <input type="checkbox" name="recommend_list_id" id={recommend_list["list_id"]} className="recommend_list_checkbox checkbox"/>
                </label>
            </div>
        )
    });

    function TypeList(){
        return (
            <div className="personal_page_content_type_list">
                <DropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"#white"} backgroundColor={"#b6434a"}/>
            </div>
        )
    }

    return (
        <div className="recommend_manage_page_content">
            <div className="recommend_manage_page_content_header">
                <div className="user_recommend_list_title" style={{color:"#b6434a"}}>推荐列表</div>
                <TypeList/>
            </div>
            <div className="recommend_list_container">
                {displayList}
            </div>
            <div className="recommend_page_pagination">
                <PaginationComponent link={`/user/${user_id}`}/>
            </div>
        </div>
    )
}

export default UserRecommendList;