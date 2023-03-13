import { Link } from "react-router-dom";

function SubCard(props){
    return (
        <div className="subpage_card_container">
            <div className="subpage_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]}><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="subpage_card_img"/></Link>
            </div>
            <div className="subpage_card_content">
                <div className="subpage_card_name">{props.data["subject_name"]}</div>
                <div className="subpage_card_score">{props.data["score"]}</div>
            </div>
        </div>
    )
}

export default SubCard;