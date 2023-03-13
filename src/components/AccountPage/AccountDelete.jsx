import ConfirmButton from "../ConfirmButton";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function AccountDelete(props) {
    return (
        <div className="account_manage_page_content_container">
            <div className="account_manage_page_content">
                <div className="img_upload_container">
                    <div className="img_display_section">
                        {/* <img src={props.userInfo["portrait"]?`${portraitFolder}${props.userInfo["portrait"]}`:defaultPortrait} alt="头像" className="example_image"/> */}
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
                    <ConfirmButton buttonText="注销账号" displayText1="确定要注销账号吗？" displayText2="注销后该账号信息将被清除!" color="#b6434a" backgroundColor="white" userInfo={props.userInfo}/>
                </div>
            </div>
        </div>
    )
}

export default AccountDelete;