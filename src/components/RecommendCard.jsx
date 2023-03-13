import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function RecommendCard(props){
    const score = parseFloat(props.data["score"]);
    const displayScore = score/2;

    return (
        <div className="recommend_card_container">
            <div className="recommend_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]}>
                    <img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="recommend_card_img"/>
                </Link>
            </div>
            <div className="recommend_card_content">
                <div className="recommend_card_name">{props.data["subject_name"]}</div>
                <div className='rating_box'>
                    <Rating size="small" max={5} value={displayScore} className="recommend_card_score" readOnly/>
                    <div className='rating_value'>{score}</div>
                </div>
                <div className="recommend_card_review">
                    {`推荐理由：${props.data["recommend_reason"]?props.data["recommend_reason"]:"暂未填写"}`}
                </div>
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

export default RecommendCard;