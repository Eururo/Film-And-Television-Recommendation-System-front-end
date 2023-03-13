import PersonalPageMainBody from "./PersonalPageMainBody";

const pageName = "在看";
const pageLink = "/personal/watching";
const dropDownButtonOptionList = [
    ["排序",["评分最高","最近发布"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = ["已看","喜欢"];

function PersonalWatchingPage(props){
    return (
        <PersonalPageMainBody pageName={pageName} pageLink={pageLink} data={props.data} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
    )
}

export default PersonalWatchingPage;