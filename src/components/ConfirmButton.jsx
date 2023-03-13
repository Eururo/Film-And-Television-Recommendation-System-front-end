import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

function ConfirmButton(props){
    const {userId}=useAuthContext();
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }

    const color = props.backgroundColor;
    const backgroundColor = props.color;

    const buttonStyle = {
        color: color,
        backgroundColor: backgroundColor
    }

    async function deleteAccount(){ 
        const url = `${process.env.REACT_APP_IPADDRESS}/user/deleteUser/${userId}`;
        let response = await fetch(url,{
            credentials: "include"
        })
        const result = await response.text();
        if(parseInt(result)){
            // console.log("注销成功");
            alert("注销成功");
            localStorage.removeItem("userId");
            navigate("/");
            refreshPage();
        }
        else{
            // console.log("注销失败");
            alert("注销失败");
        }

        const curtain = document.getElementById("curtain");
        curtain.style.display="none";
    }

    const handleClick_1 = ()=>{
        const curtain = document.getElementById("curtain");
        curtain.style.display="block";
    };

    const handleClick_2 = ()=>{
        const curtain = document.getElementById("curtain");
        curtain.style.display="none";
    };

    return (
        <div className="pop_up_button">
            <button className="upload_file_button" onClick={handleClick_1} style={buttonStyle}>{props.buttonText}</button>
            <div id="curtain">
                <div className="confirm_page_container">
                    <div className="confirm_page_header" style={buttonStyle}>
                        <div className="confirm_page_header_title">{props.displayText1}<br/>{props.displayText2}</div>
                        <div className="confirm_page_exit_button" onClick={handleClick_2}></div>
                    </div>
                    <div className="confirm_page_footer">
                        <button className="pop_up_confirm_button" onClick={deleteAccount} style={buttonStyle}>确定</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmButton;