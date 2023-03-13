import { Outlet } from "react-router-dom";
import OptionListVertical from "../OptionListVertical";

const option_list = ["账号信息","注销账号"];
const option_to_link = {
    "账号信息":"/account/infoDisplay",
    "注销账号":"/account/delete"
};

function AccountManagePage(props){
    return (
        <div className="account_manage_page_container">
            <div className="account_manage_page_navbar">
                <div className="account_manage_page_title">账号管理</div>
                <OptionListVertical option_list={option_list} option_to_link={option_to_link} color={"#b6434a"} backgroundColor={"white"}/>
            </div>
            <Outlet/>
        </div>
    )
}

export default AccountManagePage;