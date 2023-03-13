import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import OptionListVertical from "../OptionListVertical";
// import { useAuthContext } from "../useAuthContext";

const option_list = ["主页"];

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function UserHomePage(props){
    // const {userId} = useAuthContext();
    const {user_id} = useParams();
    const [userInfo,setUserInfo]=useState({});

    const option_to_link = {
        "主页": `/user/${user_id}`,
    }

    useEffect(()=>{
        async function getUserInfo(){
            const url=`${process.env.REACT_APP_IPADDRESS}/user/findById/${user_id}`;
            let response = await fetch(url);
            const result = await response.json();
            if(result["user_id"] !== 0){
                setUserInfo(result);
                // console.log(result);
            }
            else{
                // console.log("该用户不存在");
                alert("该用户不存在");
            }
        }
        getUserInfo();
    },[user_id])

    return (
        <div className="user_home_page_container">
            <div className="user_home_page_header">
                <div className="user_home_page_portrait_container">
                    <img src={userInfo["portrait"]?`${process.env.REACT_APP_IPADDRESS}/portraits/${userInfo["portrait"]}`:defaultPortrait} alt="" className="user_home_page_portrait"/>
                </div>
                <div className="user_home_page_user_info">
                    {userInfo["user_name"]}
                </div>
                <div className="user_home_page_navbar">
                    <OptionListVertical option_list={option_list} option_to_link={option_to_link} color={"#b6434a"} backgroundColor={"white"}/>
                </div>
            </div>
            <div className="user_home_page_content_container">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserHomePage;