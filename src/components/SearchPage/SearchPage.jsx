import { Outlet, useLocation } from "react-router-dom";
import OptionListTransverse from "../OptionListTransverse";

const option_list = ["综合","电影","电视剧","动画","用户"];



function SearchPage(props){
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    let params = "?";
    query.forEach((value,key)=>{
        params =`${params}${key}=${value}&`;
    })
    let suffix = params.slice(0,params.length-1);

    const option_to_link = {
        "综合": `/search/all${suffix}`,
        "电影": `/search/movie${suffix}`,
        "电视剧": `/search/tv${suffix}`,
        "动画": `/search/animation${suffix}`,
        "用户": `/search/user${suffix}`
    }

    return (
        <div className="search_page_container">
            <div className="search_page_navbar">
                <OptionListTransverse option_list={option_list} option_to_link={option_to_link} color={"white"} backgroundColor={"#5a7385"}/>
            </div>
            <Outlet/>
        </div>
    )
}

export default SearchPage;