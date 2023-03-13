import { Navigate, Outlet } from "react-router-dom";
import OptionListVertical from "../OptionListVertical";
import SearchBox from "../SearchBox";
import { useAuthContext } from "../useAuthContext";

const type_kinds = ["收藏","收藏夹","在看","已看","已评分","喜欢"];

const type_links = {
    "收藏": `/personal/collected`,
    "收藏夹": `/personal/favorites`,
    "在看":`/personal/watching`,
    "已看": `/personal/watched`,
    "已评分": `/personal/scored`,
    "喜欢": `/personal/like`
}

function PersonalPage(){
    const {userId} = useAuthContext();

    if (!userId) {
        return <Navigate replace to="/login" />;
    }
    else{
        return (
            <div className="personal_page_container">
                <div className="personal_page_header">
                    <div className="personal_page_title">个人中心</div>
                    <div className="personal_page_searchbox">
                        <SearchBox/>
                    </div>
                </div>
                <div className="personal_page_navbar">
                    <OptionListVertical option_list={type_kinds} option_to_link={type_links} color={"white"} backgroundColor={"#5a7385"}/>
                </div>
                <Outlet/>
            </div>
        )
    }
}

export default PersonalPage;