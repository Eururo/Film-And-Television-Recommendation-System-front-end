import { useEffect } from "react";
import { useAuthContext } from "../useAuthContext";
import PersonalPageMainBody from "./PersonalPageMainBody";

const pageName = "收藏";
const pageLink = "/personal/collected";
const dropDownButtonOptionList = [
    ["排序",["最近收藏","评分最高","最近发布"]],
    ["类别",["电影","电视剧","动画"]]
];
let popUpButtonOptionList = ["在看","已看"];

function PersonalFavoritePage(props){
    const {userId}=useAuthContext();

    useEffect(()=>{
        async function getFavoritesList(){
            const url = `${process.env.REACT_APP_IPADDRESS}/favorites/findByUserId/${userId}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result instanceof Array){
                popUpButtonOptionList = ["在看","已看"];
                result.forEach((favorites)=>{
                    popUpButtonOptionList.push(favorites["favorites_name"]);
                })
            }
        }
        getFavoritesList();
        // eslint-disable-next-line
    },[])

    return (
        <PersonalPageMainBody pageName={pageName} pageLink={pageLink} data={props.data} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
    )
}

export default PersonalFavoritePage;