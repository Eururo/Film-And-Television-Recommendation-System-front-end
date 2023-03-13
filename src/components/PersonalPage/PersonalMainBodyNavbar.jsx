import { useEffect, useState } from "react";
import PersonalDropDownButton from "../PersonalDropDownButton";
import PopUpButton from "../PopUpButton";
import RecommendListPopUpButton from "../RecommendLIstPopUpButton";
import { useAuthContext } from "../useAuthContext";

const defaultStyle = {
    color: "white",
    backgroundColor: "#5a7385"
}

const kind = {
    "收藏": "is_collected",
    "在看": "is_watching",
    "已看": "is_watched" ,
    "喜欢": "is_like" ,
    "已评分": "is_scored"
}

function PersonalMainBodyNavbar(props){
    const {userId} = useAuthContext();
    const dropDownButtonOptionList = props.dropDownButtonOptionList;
    const popUpButtonOptionList = props.popUpButtonOptionList;
    const optionListOne = dropDownButtonOptionList[0];
    const optionListTwo = dropDownButtonOptionList[1];

    const [batch,setBatch] = useState(false);
    const [select,setSelect] = useState(false);

    const BatchHandle = ()=> setBatch((batch)=>!batch);
    const SelectHandle = ()=>setSelect((select)=>!select);

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        const checkboxLabelList = document.querySelectorAll(".checkbox_label");
        const links = document.querySelectorAll(".nestedpage_card_link");
        if(!batch){
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="hidden";
            });
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="hidden";
            })
            links.forEach((link)=>{
                link.removeAttribute("onclick");
            })
        }
        else{
            checkboxList.forEach((checkbox)=>{
                checkbox.style.visibility="visible";
            });
            checkboxLabelList.forEach((checkboxLabel)=>{
                checkboxLabel.style.visibility="visible";
            })
            links.forEach((link)=>{
                link.setAttribute("onclick","event.preventDefault()");
            })
        }
    },[batch])

    useEffect(()=>{
        const checkboxList = document.querySelectorAll("input.checkbox");
        if(!select||!batch){
            checkboxList.forEach((checkbox)=>{
                checkbox.checked=false;
            });
            setSelect(false);
        }
        else{
            checkboxList.forEach((checkbox)=>{
                checkbox.checked=true;
            });
        }
    },[batch,select])

    function handleSubmit(){
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        if(props.pageName === "收藏夹"){
            checkboxes.forEach(async (checkbox)=>{
                const subject_id = checkbox.getAttribute("id");
                const url = `${process.env.REACT_APP_IPADDRESS}/favoritesItem/delete?favorites_id=${props.favorites_id}&subject_id=${subject_id}`;
                await fetch(url);
                props.setRefresh();
            })
        }
        else{
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
                        [kind[props.pageName]]:false
                    })
                });
                props.setRefresh();
            })
        }
        BatchHandle();
        // props.setRefresh();
    }

    function TypeList(){
        if(!batch){
            return (
                <div className="personal_page_content_type_list">
                    <PersonalDropDownButton prefix={optionListOne[0]} optionList={optionListOne[1]} status={props.orderBy} setStatus={props.setOrderBy}/>
                    <PersonalDropDownButton prefix={optionListTwo[0]} optionList={optionListTwo[1]} status={props.type} setStatus={props.setType}/>
                    <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"批量操作"}</button>
                </div>
            )
        }
        else{
            if(props.tag){
                return (
                    <div className="personal_page_content_type_list">
                        <button className="customized_button" onClick={SelectHandle} style={defaultStyle}>{select?"取消全选":"全选"}</button>
                        <RecommendListPopUpButton setBatch={BatchHandle} popUpOption={popUpButtonOptionList} color={"#5a7385"} backgroundColor={"white"}/>
                        <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"批量操作"}</button>
                    </div>
                )
            }
            else{
                return (
                    <div className="personal_page_content_type_list">
                        <button className="customized_button" onClick={SelectHandle} style={defaultStyle}>{select?"取消全选":"全选"}</button>
                        {props.pageName==="已评分"?null:<button className="customized_button" style={defaultStyle} onClick={handleSubmit}>{`移出${props.pageName}`}</button>}
                        {props.pageName==="喜欢"?null:<PopUpButton setBatch={BatchHandle} popUpOption={popUpButtonOptionList} color={"#5a7385"} backgroundColor={"white"}/>}
                        <button className="customized_button" onClick={BatchHandle} style={defaultStyle}>{batch?"返回":"批量操作"}</button>
                    </div>
                )
            }
        }
    }

    return (
        <TypeList/>
    )
}

export default PersonalMainBodyNavbar;