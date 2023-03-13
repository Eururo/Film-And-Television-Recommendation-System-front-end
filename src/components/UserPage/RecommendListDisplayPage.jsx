import DropDownButton from "../DropDownButton";
import PaginationComponent from "../PaginationComponent";
// import RecommendCard from "../RecommendCard";

const dropDownList_1 = ["最近添加","评分最高"];
const dropDownList_1_prefix = "排序";
const dropDownList_2 = ["电影","电视剧","动画"];
const dropDownList_2_prefix = "类别";

const defaultStyle = {
    color: "white", 
    backgroundColor: "#b6434a"
}

function RecommendList(props){
    // const listsDatas = props.data;
    // const lists = listsDatas.map((listsData)=><RecommendCard data={listsData}/>)

    return (
        <div className="recommend_manage_page_content">
            <div className="recommend_manage_page_content_header">
                <div className="user_recommend_list_title" style={{color:"#b6434a"}}>推荐列表</div>
                <div className="personal_page_content_type_list">
                    <DropDownButton optionList={dropDownList_1} prefix={dropDownList_1_prefix} color={"white"} backgroundColor={"#b6434a"}/>
                    <DropDownButton optionList={dropDownList_2} prefix={dropDownList_2_prefix} color={"white"} backgroundColor={"#b6434a"}/>
                    <button className="customized_button" style={defaultStyle}>订阅</button>
                </div>
            </div>
            <div className="recommend_list_container">
                {/* {lists} */}
            </div>
            <div className="recommend_manage_page_content_pagination">
                <PaginationComponent link={"/user/recommendlist"}/>
            </div>
        </div>
    )
}

export default RecommendList;