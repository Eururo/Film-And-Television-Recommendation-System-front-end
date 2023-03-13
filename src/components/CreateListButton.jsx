import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

function CreateListButton(props){
    const {userId} = useAuthContext();
    const [listName,setListName]=useState("");
    const color = props.color;
    const backgroundColor = props.backgroundColor;

    const defaultStyle = {
        color: backgroundColor,
        backgroundColor: color
    }

    const handleChange = (event)=>setListName(event.target.value);

    const handleClick_1 = ()=>{
        const curtain = document.getElementById("curtain");
        curtain.style.display="block";
    };

    const handleClick_2 = ()=>{
        const curtain = document.getElementById("curtain");
        curtain.style.display="none";
    };

    async function onSubmit(){
        const url = `${process.env.REACT_APP_IPADDRESS}/recommendList/insert`;
        if(listName){
            let response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user_id:userId,
                    list_name:listName
                })
            })
            const result = await response.text();
            if(parseInt(result)){
                // console.log("创建成功");
                props.setRefresh();
            }
            // else{
            //     console.log("创建失败");
            // }
        }
        else{
            // console.log("请输入要创建的推荐列表名称");
            alert("请输入推荐列表的名称");
        }
        setListName("");
        handleClick_2();
    }

    return (
        <div className="pop_up_button">
            <button className="customized_button" onClick={handleClick_1} style={defaultStyle}>创建推荐列表</button>
            <div id="curtain">
                <div className="pop_up_information">
                    <div className="pop_up_header" style={defaultStyle}>
                        <div className="pop_up_header_title">正在创建推荐列表</div>
                        <div className="pop_up_exit_button" onClick={handleClick_2}></div>
                    </div>
                    <div className="pop_up_content">
                        <div className="pop_up_form_container">
                            <label htmlFor="listname">推荐列表的名称:</label>
                            <input type="text" id="listname" name="listname" className="recommend_list_name_input" value={listName} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="pop_up_footer">
                        <button className="pop_up_confirm_button" onClick={onSubmit} style={defaultStyle}>确定</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateListButton;