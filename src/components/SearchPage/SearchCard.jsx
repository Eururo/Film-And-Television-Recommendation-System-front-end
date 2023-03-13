import { Link } from "react-router-dom";

function SearchCard(props) {
    return (
        <div className="search_card_container">
            <div className="search_card_img_container">
                <Link to={"/subject/" + props.data["subject_id"]}><img src={"/images/subject/" + props.data["subject_id"]+".jpeg"} alt="" className="search_card_img"/></Link>
            </div>
            <div className="search_card_content">
                <div className="search_card_name">{props.data["subject_name"]}</div>
                <div className="search_card_score">{props.data["score"]}</div>
            </div>
        </div>
    )
}

export default SearchCard;