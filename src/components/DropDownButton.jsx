import { useState } from "react";

function DropDownButton(props){
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    const defaultStyle = {
        color: color,
        backgroundColor: backgroundColor
    };

    const optionList = props.optionList;
    const [option,setOption] = useState(optionList[0]);

    const handleChange = (value)=>{setOption(value)};

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

export default DropDownButton;