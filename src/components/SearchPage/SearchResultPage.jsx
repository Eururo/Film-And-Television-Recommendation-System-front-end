import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PaginationComponent from "../PaginationComponent";
import SearchCard from "./SearchCard";

function SearchResultPage(props) {
    const [searchParam,setSearchParam]=useState("");
    const [type,setType]=useState();
    // const [orderBy,setOrderBy]=useState("score");
    const [currentPage,setCurrentPage]=useState(1);
    const [subjects,setSubjects]=useState([]);
    const page_size = 28;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const search_param = query.get('keyword');

    if(searchParam !== search_param){
        setSearchParam(search_param);
    }

    // if(orderBy !== order["order_by"]){
    //     setOrderBy(order["order_by"]);
    // }
  
    if(currentPage !== page){
        setCurrentPage(page);
    }

    const {kind} = useParams();

    if(type !== kind){
        setType(kind);
    }

    useEffect(()=>{
        const url = `${process.env.REACT_APP_IPADDRESS}/subject/searchSubjectByKind?search_param=${searchParam}&order_by=score&current_page=${currentPage}&page_size=${page_size}&kind=${type}`;
        async function getSubject(){
            let response = await fetch(url);
            const result = await response.json();
            setSubjects(result);
            // console.log(result);
        }
        getSubject();
    },[searchParam,currentPage,type]) 

    const displayList = subjects.map((subject)=><SearchCard data={subject} key={subject["subject_id"]}/>);

    return (
        <div className="search_page_display_section">
            <div className="search_result_display_section">
                {displayList}
            </div>
            <div className="search_page_pagination">
                <PaginationComponent link={`/search/${type}`}/>
            </div>
        </div>
    )
}

export default SearchResultPage;