import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

// const kind = {
//     "收藏": "is_collected",
//     "在看": "is_watching",
//     "已看": "is_watched" ,
//     "喜欢": "is_like" 
// }

function RecommendListPopUpButton(props){
    const {userId} = useAuthContext();
    const [number,setNumber] = useState(0);
    const [recommendList,setRecommendList] = useState([]);
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    const defaultStyle = {
        color: backgroundColor,
        backgroundColor: color
    }

    // const options = props.popUpOption;

    useEffect(()=>{
        async function getRecommendList(){
            const url=`${process.env.REACT_APP_IPADDRESS}/recommendList/findByUserId/${userId}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result !== null){
                setRecommendList(result);
                // console.log(result);
            }
        }
        getRecommendList();
    },[userId]);

    const handleClick_1 = ()=>{
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
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
        let list_id = radios.getAttribute("id");
        // const verifyUrl = `${process.env.REACT_APP_IPADDRESS}/recommendList/findByUserIdAndListName?user_id=${userId}&list_name=${list_name}`;
        // let response = await fetch(verifyUrl);
        // const result = await response.json();
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        checkboxes.forEach(async (checkbox)=>{
            const subject_id = checkbox.getAttribute("id");
            const url = `${process.env.REACT_APP_IPADDRESS}/recommendListItem/insert?list_id=${list_id}&subject_id=${subject_id}`;
            await fetch(url);
        })
        handleClick_2();
        props.setBatch();
    };

    const popUpRadios = recommendList.map((recomend_list)=>{
        return (
            <div key={recomend_list["list_id"]} className="pop_up_radio_container">
                <label htmlFor={recomend_list["list_id"]} className="pop_up_label">{recomend_list["list_name"]}</label>
                <input type="radio" id={recomend_list["list_id"]} className="pop_up_radio" name="status" value={recomend_list["list_name"]}/>
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

export default RecommendListPopUpButton;