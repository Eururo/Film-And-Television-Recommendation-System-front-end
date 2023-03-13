import { Link } from "react-router-dom";

function SideCard(props){
    return (
        <div className="homepage_sidebar_card">
            <div className="sidebar_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]}><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="sidebar_card_img"/></Link>
            </div>
            <div className="sidebar_card_content">
                <div className="sidebar_card_name">{props.data["subject_name"]}</div>
                <div className="sidebar_card_score">{props.data["score"]}</div>
            </div>
        </div>
    )
}

export default SideCard;