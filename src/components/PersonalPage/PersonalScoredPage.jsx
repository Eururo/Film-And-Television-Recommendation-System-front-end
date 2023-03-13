import PersonalPageMainBody from "./PersonalPageMainBody";

const pageName = "已评分";
const pageLink = "/personal/scored";
const dropDownButtonOptionList = [
    ["排序",["评分最高","观看时间"]],
    ["类别",["电影","电视剧","动画"]]
];
const popUpButtonOptionList = ["喜欢"];

function PersonalScoredPage(props){
    return (
        <PersonalPageMainBody pageName={pageName} pageLink={pageLink} data={props.data} dropDownButtonOptionList={dropDownButtonOptionList} popUpButtonOptionList={popUpButtonOptionList}/>
    )
}

export default PersonalScoredPage;