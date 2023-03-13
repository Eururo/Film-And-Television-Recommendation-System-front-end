import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

function UserSubjectPage(props){
    const {userId} = useAuthContext();
    const {subject_id} = useParams();

    if (!userId) {
        return <Navigate replace to="/login" />;
    }
    else {
        return (
            <div className="subject_edit_page_container">
                <div className="subject_edit_page_header_container"></div>
                <div className="subject_page_main_body">
                    <div className="subject_edit_page_img_container">
                        <Link to={`/subject/${subject_id}`}><img src={"/images/subject/" + subject_id +".jpeg"} alt="" className="subject_edit_page_img"/></Link>
                    </div>
                    <Outlet/>
                </div>
                <div className="subject_edit_page_footer_container"></div>
            </div>
        )
    }
}

export default UserSubjectPage;