import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage(props){
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }

    const nameChange = (event)=>{setName(event.target.value)};
    const passwordChange = (event)=>{setPassword(event.target.value)};

    async function onSubmit(){
        const url= `${process.env.REACT_APP_IPADDRESS}/user/login`;
        try{ 
            let response = await fetch(url,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    credentials: 'include',
                    body:JSON.stringify({
                        "user_name":`${name}`,
                        "password":`${password}`
                    })
                }
            );
            let text = await response.text();
            if(text === "登录成功"){
                // console.log(text);
                setName("");
                setPassword("");
                navigate("/");
                refreshPage();
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="login_page_container">
            <div className="login_page_header">
                <div className="login_page_title">登录</div>
            </div>
            <div className="login_page_content_container">
                <div className="login_page_content">
                    <div className="login_info_item">
                        <label htmlFor="user_name" className="login_info_label">用户名：</label>
                        <input type="text" name="user_name" id="user_name" className="login_info_input" value={name} onChange={nameChange}/>
                    </div>
                    <div className="login_info_item">
                        <label htmlFor="user_password" className="login_info_label">密码：</label>
                        <input type="password" name="user_password" id="user_password" className="login_info_input" value={password} onChange={passwordChange}/>
                    </div>
                    <div className="login_button_list">
                        <div className="login_button" onClick={onSubmit}>登录</div>
                    </div>
                </div>
            </div>
            <div className="forget_password_container">
                <NavLink to="/register"><div className="forget_password register_button">注册</div></NavLink>
                <NavLink to="/register"><div className="forget_password">忘记密码</div></NavLink>

            </div>
        </div>
    )
}

export default LoginPage;