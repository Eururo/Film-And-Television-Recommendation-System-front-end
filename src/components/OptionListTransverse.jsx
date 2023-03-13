import { NavLink } from "react-router-dom";

function OptionListTransverse(props){
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
            <div key={index} className="option_list_transverse_item_container">
                <NavLink to={option_to_link[option]} className="option_list_transverse_item" style={({ isActive }) => isActive ? activeStyle : defaultStyle}>{option}</NavLink>
            </div>
        )
    });

    return (
        <div className="option_list_transverse">
            {options}
        </div>
    )
}

export default OptionListTransverse;