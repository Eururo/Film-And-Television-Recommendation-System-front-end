import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginationComponent from "../PaginationComponent";

// const portraitFolder = "/images/portraits/";
const defaultPortrait = "/images/example.jpg";

function UserSearchResultPage() {
    const [searchParam,setSearchParam]=useState("");
    const [users,setUsers]=useState([]);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    // const page = parseInt(query.get('page') || '1', 10);

    const search_param = query.get('keyword');

    if(searchParam !== search_param){
        setSearchParam(search_param);
    }

    useEffect(()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/user/searchUser?search_param=${searchParam}`;
        async function getUser(){
            let response = await fetch(url);
            const result = await response.json();
            setUsers(result);
            // console.log(result);
        }
        getUser();
    },[searchParam]) 

    const userList = users.map((user)=>{
        return (
            <div key={user["user_id"]} className="user_search_result_item">
                <Link to={`/user/${user["user_id"]}`} className="user_search_result_item_img_container">
                    <img src={user["portrait"]?`${process.env.REACT_APP_IPADDRESS}/portraits/${user["portrait"]}`:defaultPortrait} alt="" className="user_search_result_item_img"/>
                </Link>
                <div className="user_search_result_item_info">
                    <div className="user_search_result_item_name">{user["user_name"]}</div>
                </div>
            </div>
        )
    }) 

    return (
        <div className="search_page_display_section">
            <div className="search_result_display_section">
                <div className="user_search_result_page_container">
                    {userList}
                </div>
            </div>
            <div className="search_page_pagination">
                <PaginationComponent link={"/search/user"}/>
            </div>
        </div>

    )
}

export default UserSearchResultPage;
