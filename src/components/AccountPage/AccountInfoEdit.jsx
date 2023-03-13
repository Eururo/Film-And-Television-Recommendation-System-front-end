import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function AccountInfoEdit(props) {
    const navigate = useNavigate();
    const [name,setName] = useState(props.userInfo["user_name"]);
    const [email,setEmail] = useState(props.userInfo["email"]);
    const [password,setPassword] = useState("");

    const nameChange = (event)=>{setName(event.target.value)};
    const emailChange = (event)=>{setEmail(event.target.value)};
    const passwordChange = (event)=>{setPassword(event.target.value)};

    function uploadFile(){
        const uploadButton = document.querySelector('input[type="file"]') ;
        uploadButton.click();
        uploadButton.addEventListener("change",(event)=>{
            const img = document.querySelector(".example_image");
            const url = URL.createObjectURL(event.target.files[0]);
            img.src = url;
        })
    }

    async function onSubmit() {
        let temp = props.userInfo["portrait"];
        const uploadImageUrl = `${process.env.REACT_APP_IPADDRESS}/image/upload`;
        const url = `${process.env.REACT_APP_IPADDRESS}/user/updateById`;

        if(password){
            const fileInput = document.querySelector("#fileInput");
            if(fileInput.files[0] != null){
                if(temp != null){
                    const deleteImageUrl = `${process.env.REACT_APP_IPADDRESS}/image/delete/${temp}`;
                    await fetch(deleteImageUrl);
                    // let deleteText = await fetch(deleteImageUrl);
                    // const text = await deleteText.text();
                    // console.log(text);
                }
                let formData = new FormData();
                formData.append("file",fileInput.files[0]);
                let res = await fetch(uploadImageUrl,{
                    method: "POST",
                    body: formData
                });
                temp = await res.text();
                console.log(temp);
            }
            let response = await fetch(url,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body:JSON.stringify({
                    user_id: `${props.userInfo["user_id"]}`,
                    user_name:`${name}`,
                    email:`${email}`,
                    password:`${password}`,
                    portrait:`${temp}`
                })
            })
            const result = await response.text();
            if(parseInt(result) === 1){
                props.getUserInfo(props.userInfo["user_id"]).then((value)=>{
                    // console.log(value);
                    if(value != null){
                        props.setUserInfo(value);
                    }
                });
                // console.log("信息修改成功");
                alert("信息修改成功");
                navigate("/account/infoDisplay");
            }
            else{
                // console.log("信息修改失败");
                alert("信息修改失败");
            }
        }
        else{
            // console.log("密码为空");
            alert("请输入密码");
        }
    }

    return (
        <div className="account_manage_page_content_container">
            <div className="account_manage_page_content">
                <div className="img_upload_container">
                    <div className="img_display_section">
                        <img src={props.userInfo["portrait"]?`${process.env.REACT_APP_IPADDRESS}/portraits/${props.userInfo["portrait"]}`:defaultPortrait} alt="头像" className="example_image"/>
                    </div>
                    <input type="file" name="file" id="fileInput" style={{display:"none"}}/>
                    <button onClick={uploadFile} className="upload_file_button">上传头像</button>
                </div>
                <div className="user_info_display_section">
                    <div className="user_info">
                        <label className="user_info_label">用户名：</label>
                        <input type="text" className="user_info_input" value={name} onChange={nameChange}/>
                    </div>
                    <div className="user_info">
                        <label className="user_info_label">邮箱：</label>
                        <input type="text" className="user_info_input" value={email} onChange={emailChange}/>
                    </div>
                    <div className="user_info">
                        <label className="user_info_label">密码：</label>
                        <input type="password" className="user_info_input" value={password} placeholder="请输入密码" onChange={passwordChange}/>
                    </div>
                </div>
                <div className="extra_option">
                    <button className="upload_file_button" onClick={onSubmit}>提交</button>
                </div>
            </div>
        </div>
    )
}

export default AccountInfoEdit;