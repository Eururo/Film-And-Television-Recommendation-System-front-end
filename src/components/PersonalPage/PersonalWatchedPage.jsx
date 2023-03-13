import PersonalPageMainBody from "./PersonalPageMainBody";

const pageName = "已看";
const pageLink = "/personal/watched";
const dropDownButtonOptionList = [
    ["排序",["最近收藏","评分最高","最近发布"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = ["在看","喜欢"];

function PersonalWatchedPage(props){
    return (
        <PersonalPageMainBody pageName={pageName} pageLink={pageLink} data={props.data} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
    )
}

export default PersonalWatchedPage;