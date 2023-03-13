import MainBody from "./MainBody";
import SideBar from "./SideBar";

const typelist = ["电影","电视剧","动画"];

function HomePage(props){

    const content = typelist.map((type,index)=><MainBody key={index} name={type}/>)

    return (
        <main>
            <div className="homepage_container">
                <div className="main_content_float_container">
                    <div className="homepage_main_content_container">      
                        {content}
                    </div>
                </div>
                <div className="sidebar_content_float_container">
                    <SideBar/>
                </div>
            </div>
        </main>
    )
}

export default HomePage;