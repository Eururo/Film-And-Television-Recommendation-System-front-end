import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const kind = {
    "收藏": "is_collected",
    "在看": "is_watching",
    "已看": "is_watched" ,
    "喜欢": "is_like" 
}

function PopUpButton(props){
    const {userId} = useAuthContext();
    const [number,setNumber] = useState(0);
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    const defaultStyle = {
        color: backgroundColor,
        backgroundColor: color
    }

    const options = props.popUpOption;

    const handleClick_1 = ()=>{
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        // console.log(checkboxes.length);
        setNumber(checkboxes.length);
        if(checkboxes.length !== 0){
            const curtain = document.getElementById("curtain");
            curtain.style.display="block";
        }
    };

    const handleClick_2 = ()=>{
        const curtain = document.getElementById("curtain");
        curtain.style.display="none";
        setNumber(0);
    };

    async function handleSubmit(){
        const radios = document.querySelector("input[type='radio']:checked");
        let favorites_name = radios.getAttribute("value");
        const verifyUrl = `${process.env.REACT_APP_IPADDRESS}/favorites/findByUserIdAndFavoritesName?user_id=${userId}&favorites_name=${favorites_name}`;
        let response = await fetch(verifyUrl);
        const result = await response.json();
        if(result["favorites_id"]){
            const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
            checkboxes.forEach(async (checkbox)=>{
                const subject_id = checkbox.getAttribute("id");
                const url = `${process.env.REACT_APP_IPADDRESS}/favoritesItem/insert?favorites_id=${result["favorites_id"]}&subject_id=${subject_id}`;
                await fetch(url);
            })
        }
        else{
            const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
            checkboxes.forEach(async (checkbox)=>{
                const url = `${process.env.REACT_APP_IPADDRESS}/userSubject/updateUserSubject`;
                const subject_id = checkbox.getAttribute("id");
                await fetch(url,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        user_id:userId,
                        subject_id:subject_id,
                        [kind[favorites_name]]:true
                    })
                });
            })
        }
        handleClick_2();
        props.setBatch();
    };

    const popUpRadios = options.map((item,index)=>{
        return (
            <div key={index} className="pop_up_radio_container">
                <label htmlFor={index} className="pop_up_label">{item}</label>
                <input type="radio" id={index} className="pop_up_radio" name="status" value={item}/>
            </div>
        )
    });

    return (
        <div className="pop_up_button">
            <button className="customized_button" onClick={handleClick_1} style={defaultStyle}>移动到</button>
            <div id="curtain">
                <div className="pop_up_information">
                    <div className="pop_up_header" style={defaultStyle}>
                        <div className="pop_up_header_title">{`已选择${number}个影片`}<br/>{`将其移动到`}</div>
                        <div className="pop_up_exit_button" onClick={handleClick_2}></div>
                    </div>
                    <div className="pop_up_content">
                        {popUpRadios}
                    </div>
                    <div className="pop_up_footer">
                        <button className="pop_up_confirm_button" onClick={handleSubmit} style={defaultStyle}>确定</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpButton;