import { Link } from "react-router-dom";
import Rating from "../Rating";

function FavoritesCard(props){
    const displayData = props.data;
    const director = displayData["director"].join(" ");
    const star = displayData["actor"].join(" ");
    const type = displayData["type"].join(" ");
    const end = displayData["release_time"][0].indexOf("-")
    const year = displayData["release_time"][0].slice(0, end);
    const description = `${year} / ${type} / ${director} / ${star}`;

    return (
        <div className="list_page_contaienr">
            <div className="list_page_img_container">
                <Link to={"/subject/" + props.data["subject_id"]} className="list_page_link"><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="list_page_img"/></Link>
            </div>
            <div className="list_page_content">
                <div className="list_page_name">{props.data["subject_name"]}</div>
                <Rating size="small" score={props.data["score"]} className="list_page_score" readOnly={true}/>
                <div className="list_page_description">{description}</div>
            </div>
            <label htmlFor={props["subject_id"]} className="checkbox_label">
                <div className="nestedpage_card_img_checkbox">
                    {/* <input type="checkbox" name="id" id={props.data["ID"]} className="checkbox" checked="false"/> */}
                    <input type="checkbox" name="id" id={props.data["subject_id"]} className="checkbox"/>
                </div>
            </label>
        </div>
    )
}

export default FavoritesCard;