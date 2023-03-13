// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../SearchBox";
import { useAuthContext } from "../useAuthContext";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function Navbar(props){
    const {userId} = useAuthContext();
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }

    const handleClick = async ()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/user/logout`;
        const response = await fetch(url,{
            credentials: 'include'
        });
        // eslint-disable-next-line
        const result = await response.text();
        // console.log(result);
        props.setUserInfo(props.defaultUserInfo);
        localStorage.removeItem("userId");
        navigate("/");
        refreshPage();
    }

    function LoginContent(){
        return (
            <div className="user_information">
                <Link to={`/user/${userId}`}><div className="user_information_item">主页</div></Link>
                <Link to="/personal/collected"><div className="user_information_item">个人中心</div></Link>
                <Link to="/recommendList/home"><div className="user_information_item">推荐列表</div></Link>
                <Link to="/account/infoDisplay"><div className="user_information_item">账号管理</div></Link>
                <button className="user_information_item logout_button" onClick={handleClick}>退出登录</button>
            </div>
        )
    }
    function LogoutContent(){
        return (
            <div className="user_information">
                <Link to="/login"><div className="user_information_item">登录</div></Link>
            </div>
        )
    }

    return (
        <header className="header">
            <div className="navbar_container">
                <div className="navbar_content_one">
                    <Link to="/"><div className="navbar_item">首页</div></Link>
                    <Link to="/film/recommend"><div className="navbar_item">电影</div></Link>
                    <Link to="/tv/recommend"><div className="navbar_item">电视剧</div></Link>
                    <Link to="/animation/recommend"><div className="navbar_item">动画</div></Link>
                </div>
                <div className="navbar_searchbox">
                    <SearchBox/>
                </div>
                <div className="navbar_content_two">
                    <Link to="/personal/collected"><div className="navbar_item">收藏</div></Link>
                </div>
                <div className="user_container">
                    <div className="user_img_container">
                        <img src={props.userInfo["portrait"]?`${process.env.REACT_APP_IPADDRESS}/portraits/${props.userInfo["portrait"]}`:defaultPortrait} alt="" className="user_img"/>
                    </div>
                    <div className="user_information_container">
                        {userId?<LoginContent/>:<LogoutContent/>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;