import { Link } from "react-router-dom";

function MainCard(props){
    return (
        <div className="homepage_main_card">
            <div className="main_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]}><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="main_card_img"/></Link>
            </div>
            <div className="main_card_content">
                <div className="main_card_name">{props.data["subject_name"]}</div>
                <div className="main_card_score">{props.data["score"]}</div>
            </div>
        </div>
    )
}

export default MainCard;