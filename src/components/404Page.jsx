import { Link } from "react-router-dom";

function ErrorPage(){
    return (
        <div className="error_page_container">
            <h1 className="error_page_title">404</h1>
            <div className="error_page_description">您所找的页面不存在。</div>
            <Link to="/"><div className="error_page_button">返回首页</div></Link>
        </div>
    )
}

export default ErrorPage;