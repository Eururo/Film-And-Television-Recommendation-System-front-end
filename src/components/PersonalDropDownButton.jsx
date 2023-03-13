import { useState } from "react";

const option_to_status = {
    "最近收藏": "collected_time",
    "最近添加": "add_time",
    "观看时间": "watch_time",
    "评分最高": "score",
    "最近发布": "year",
    "电影": "is_movie",
    "电视剧": "is_tv",
    "动画": "is_animation"
}

const status_to_option = {
    "collected_time": "最近收藏",
    "add_time": "最近添加",
    "watch_time": "观看时间",
    "score": "评分最高",
    "year": "最近发布",
    "is_movie": "电影",
    "is_tv": "电视剧",
    "is_animation": "动画"
}

function PersonalDropDownButton(props){
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    const defaultStyle = {
        color: color,
        backgroundColor: backgroundColor
    };

    const optionList = props.optionList;
    const [option,setOption] = useState(status_to_option[props.status]);

    const handleChange = (value)=>{
        setOption(value);
        if(props.setStatus){
            props.setStatus(option_to_status[value]);
        }
    };

    const option_list = optionList.map((item,index)=><button key={index} className="dropdown_option" onClick={()=>{handleChange(item)}}>{item}</button>) 

    return (
        <div className="select">
            <button className="dropdown_checked_option" style={defaultStyle}>{`${props.prefix}：${option}`}<div className="arrow_down"></div></button>
            <div className="dropdown_option_list">
                {option_list}
            </div>
        </div>
    )
}

export default PersonalDropDownButton;