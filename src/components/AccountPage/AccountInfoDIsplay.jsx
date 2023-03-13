import { Link } from "react-router-dom";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function AccountInfoDisplay(props) {
    return (
        <div className="account_manage_page_content_container">
            <div className="account_manage_page_content">
                <div className="img_upload_container">
                    <div className="img_display_section">
                        <img src={props.userInfo["portrait"]?`${process.env.REACT_APP_IPADDRESS}/portraits/${props.userInfo["portrait"]}`:defaultPortrait} alt="头像" className="example_image"/>
                    </div>
                </div>
                <div className="user_info_display_section">
                    <div className="user_info">
                        <label className="user_info_label">用户名：</label>
                        <input type="text" className="user_info_input" value={props.userInfo["user_name"]} readOnly/>
                    </div>
                    <div className="user_info">
                        <label className="user_info_label">邮箱：</label>
                        <input type="text" className="user_info_input" value={props.userInfo["email"]} readOnly/>
                    </div>
                </div>
                <div className="extra_option">
                    <Link to="/account/infoEdit"><button className="upload_file_button">修改账号信息</button></Link>
                    <Link to="/account/passwordEdit"><button className="upload_file_button">修改密码</button></Link>
                </div>
            </div>
        </div>
    )
}

export default AccountInfoDisplay;