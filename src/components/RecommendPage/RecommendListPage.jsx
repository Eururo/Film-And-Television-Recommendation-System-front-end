import { Outlet } from "react-router-dom";
import OptionListVertical from "../OptionListVertical";

const option_list = ["首页","列表管理","订阅列表"];
const option_to_link = {
    "首页":"/recommendList/home",
    "列表管理":"/recommendList/manage",
    "订阅列表":"/recommendList/subscribe"
};

function RecommendListPage(props){

    return (
        <div className="recommend_list_page_container">
            <div className="recommend_list_page_navbar">
                <div className="recommend_list_page_title">推荐列表</div>
                <OptionListVertical option_list={option_list} option_to_link={option_to_link} color={"#665867"} backgroundColor={"white"}/>
            </div>
            <div className="recommend_list_page_content_container">
                <Outlet/>
            </div>
        </div>
    )
}

export default RecommendListPage;