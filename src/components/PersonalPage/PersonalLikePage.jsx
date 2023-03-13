import PersonalPageMainBody from "./PersonalPageMainBody";

const pageName = "喜欢";
const pageLink = "/personal/like";
const dropDownButtonOptionList = [
    ["排序",["观看时间","评分最高"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = [];

function PersonalLikePage(props){
    return (
        <PersonalPageMainBody pageName={pageName} pageLink={pageLink} data={props.data} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
    )
}

export default PersonalLikePage;