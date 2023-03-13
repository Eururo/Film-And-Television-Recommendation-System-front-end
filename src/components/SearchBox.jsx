import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBox(){
    const [value,setValue]=useState("");

    const handleChange = (event)=>{setValue(event.target.value)};

    let link = value===""?`/search/all`:`/search/all?keyword=${value}`;

    return (
        <div className="search_box">
            <input type="text" name="keyword" value={value} onChange={handleChange}/>
            <Link to={link} className="search_icon_container"><div className="search_icon"></div></Link>
        </div>
    )
}

export default SearchBox;