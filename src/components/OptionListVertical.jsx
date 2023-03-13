import { NavLink } from "react-router-dom";

function OptionListVertical(props){
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    let activeStyle = {
        color: color,
        backgroundColor: backgroundColor
    };
    
    let defaultStyle = {
        color: backgroundColor,
        backgroundColor: color
    }

    const option_list = props.option_list;
    const option_to_link = props.option_to_link;

    const options = option_list.map((option,index)=>{
        return (
            <div key={index} className="option_list_item_container">
                <NavLink to={option_to_link[option]} className="option_list_item" style={({ isActive }) => isActive ? activeStyle : defaultStyle}>{option}</NavLink>
            </div>
        )
    });

    return (
        <div className="option_list">
            {options}
        </div>
    )
}

export default OptionListVertical;