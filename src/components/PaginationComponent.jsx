import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function PaginationComponent(props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const keyword = query.get('keyword') || "";
  
  return (
    <Grid2 display="flex" justifyContent="center" alignItems="center">
        <Pagination
        page={page}
        count={20}
        size={"large"}
        variant="outlined"
        shape="rounded" 
        justify="center"
        renderItem={(item) => (
            <PaginationItem
            component={Link}
            to={`${props.link}?${keyword?`keyword=${keyword}&`:""}${item.page === 1 ? '' : `page=${item.page}`}`}
            {...item}
            />
        )}
        />
    </Grid2>
  );
}

export default PaginationComponent;