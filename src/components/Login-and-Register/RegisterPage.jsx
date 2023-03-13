import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [checkpwd,setCheckpwd] = useState("");

    const nameChange = (event)=>{setName(event.target.value)};
    const emailChange = (event)=>{setEmail(event.target.value)};
    const passwordChange = (event)=>{setPassword(event.target.value)};
    const checkpwdChange = (event)=>{setCheckpwd(event.target.value)};

    async function onSubmit(){
        if(!isEmail(email)){
            alert("邮箱格式错误，请重新输入");
        }
        else{
            if(password === ""){
                alert("请先输入密码！");
            }
            else if(checkpwd !== password){
                alert("再次输入的密码与先前的不一致，请重新输入！");
            }
            else{
                try{
                    const url = `${process.env.REACT_APP_IPADDRESS}/user/register`;
                    let response = await fetch(url,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json;charset=UTF-8"
                        },
                        credentials: 'include',
                        body:JSON.stringify({
                            user_name:`${name}`,
                            email:`${email}`,
                            password:`${password}`
                        })
                    })
                    const result = await response.text();
                    // console.log(result);
                    alert(result);
                    if(result === "注册成功"){
                        setName("");
                        setEmail("");
                        setPassword("");
                        setCheckpwd("");
                        navigate("/login");
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
        }
    }

    return (
        <div className="login_page_container">
            <div className="login_page_header">
                <div className="login_page_title">注册</div>
            </div>
            <div className="register_page_content_container">
                <div className="register_page_content">
                    <div className="register_info_item">
                        <label htmlFor="user_name" className="login_info_label">用户名：</label>
                        <input type="text" name="user_name" id="user_name" className="login_info_input" value={name} onChange={nameChange}/>
                    </div>
                    <div className="register_info_item">
                        <label htmlFor="user_name" className="login_info_label">邮箱：</label>
                        <input type="text" name="email" id="email" className="login_info_input" value={email} onChange={emailChange}/>
                    </div>
                    <div className="register_info_item">
                        <label htmlFor="user_password" className="login_info_label">密码：</label>
                        <input type="password" name="user_password" id="user_password" className="login_info_input" value={password} onChange={passwordChange}/>
                    </div>
                    <div className="register_info_item">
                        <label htmlFor="user_password" className="login_info_label">再次确认：</label>
                        <input type="password" name="check_password" id="check_password" className="login_info_input" value={checkpwd} onChange={checkpwdChange}/>
                    </div>
                    <div className="login_button_list">
                        <button className="login_button" onClick={onSubmit}>注册</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;