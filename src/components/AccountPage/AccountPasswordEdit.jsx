import { useState } from "react";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function AccountPasswordEdit(props) {
    const [pwd1,setPwd1] = useState("");
    const [pwd2,setPwd2] = useState("");

    const pwd1Change = (event)=>{setPwd1(event.target.value)};
    const pwd2Change = (event)=>{setPwd2(event.target.value)};

    async function onSubmit(){
        const url = `${process.env.REACT_APP_IPADDRESS}/user/findUser`;
        const changePwdUrl = `${process.env.REACT_APP_IPADDRESS}/user/changePassword`;
        let response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
            body:JSON.stringify({
                user_id:`${props.userInfo["user_id"]}`,
                password:`${pwd1}`
            })
        })
        const result = await response.json();
        // console.log(result);
        if(result != null){
            let res = await fetch(changePwdUrl,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    user_id:`${props.userInfo["user_id"]}`,
                    password:`${pwd2}`,
                })
            })
            const temp = await res.text();
            // console.log(temp);
            alert(temp);
        }
    }

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
                        <label className="user_info_label">密码1:</label>
                        <input type="password" className="user_info_input" value={pwd1} placeholder="请输入之前使用的密码" onChange={pwd1Change}/>
                    </div>
                    <div className="user_info">
                        <label className="user_info_label">密码2:</label>
                        <input type="password" className="user_info_input" value={pwd2} placeholder="请输入想要使用的密码" onChange={pwd2Change}/>
                    </div>
                </div>
                <div className="extra_option">
                    <button className="upload_file_button" onClick={onSubmit}>提交</button>
                </div>
            </div>
        </div>
    )
}

export default AccountPasswordEdit;