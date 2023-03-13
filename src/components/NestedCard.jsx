import { Link } from "react-router-dom";

function NestedCard(props){
    return (
        <div className="nestedpage_card_container">
            <div className="nestedpage_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]} className="nestedpage_card_link"><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="nestedpage_card_img"/></Link>
                <label htmlFor={props["subject_id"]} className="checkbox_label">
                    <div className="nestedpage_card_img_checkbox">
                        {/* <input type="checkbox" name="id" id={props.data["subject_id"]} className="checkbox" checked="false"/> */}
                        <input type="checkbox" name="id" id={props.data["subject_id"]} className="checkbox"/>
                    </div>
                </label>
            </div>
            <div className="nestedpage_card_content">
                <div className="nestedpage_card_name">{props.data["subject_name"]}</div>
                <div className="nestedpage_card_score">{props.data["score"]}</div>
            </div>
        </div>
    )
}

export default NestedCard;