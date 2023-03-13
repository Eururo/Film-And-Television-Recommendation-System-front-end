import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import MovieDetailCard from './components/MovieDeatilCard';
import SubPage from "./components/SubPage/SubPage";
import SearchPage from "./components/SearchPage/SearchPage";
import PersonalPage from "./components/PersonalPage/PersonalPage";
// import PaginationComponent from "./components/PaginationComponent";
import PersonalFavoritePage from "./components/PersonalPage/PersonalFavoritePage";
import PersonalWatchingPage from "./components/PersonalPage/PersonalWatchingPage";
import PersonalWatchedPage from "./components/PersonalPage/PersonalWatchedPage";
import PersonalScoredPage from "./components/PersonalPage/PersonalScoredPage";
import PersonalLikePage from "./components/PersonalPage/PersonalLikePage";
import RecommendManagePage from "./components/RecommendPage/RecommendManagePage";
import AccountManagePage from "./components/AccountPage/AccountManagePage";
import RecommendListPage from "./components/RecommendPage/RecommendListPage";
import FavoritesPage from "./components/PersonalPage/FavoritesPage";
import LoginPage from "./components/Login-and-Register/LoginPage";
import RegisterPage from "./components/Login-and-Register/RegisterPage";
import FavoritesDisplayPage from "./components/PersonalPage/FavoritesDisplayPage";
import RecommendListDisplayPage from "./components/RecommendPage/RecommendListDisplayPage";
import ErrorPage from "./components/404Page";
import UserSearchResultPage from "./components/SearchPage/UserSearchResultPage";
import SearchResultPage from "./components/SearchPage/SearchResultPage";
import UserHomePage from "./components/UserPage/UserHomePage";
import UserRecommendList from "./components/UserPage/UserRecommendLIst";
// import RecommendList from "./components/UserPage/RecommendListDisplayPage";
import { useEffect, useState } from "react";
import AccountInfoDisplay from "./components/AccountPage/AccountInfoDIsplay";
import AccountInfoEdit from "./components/AccountPage/AccountInfoEdit";
import AccountPasswordEdit from "./components/AccountPage/AccountPasswordEdit";
import AccountDelete from "./components/AccountPage/AccountDelete";
import UserSubjectPage from "./components/UserSubjectPage";
import UserSubjectEditPage from "./components/UserSubjectEditPage";
import { useAuthContext } from "./components/useAuthContext";
import UserSubjectDisplayPage from "./components/UserSubjectDisplayPage";
import RecommendListHomePage from "./components/RecommendPage/RecommendListHomePage";
import UserRecommendListDisplayPage from "./components/UserPage/UserRecommendLisrDisplayPage";
import RecommendListSubscribePage from "./components/RecommendPage/RecommendListSubscribePage";

const defaultUserInfo = {
  user_name: "游客",
  user_id:0
};

async function getUserInfo(id){
  const url = `${process.env.REACT_APP_IPADDRESS}/user/findById/${id}`;
  // console.log(url);
  let response = await fetch(url,{
      credentials: "include"
  })
  return response.json();
}

function App() {
  const {userId} = useAuthContext();
  const [userInfo,setUserInfo] = useState(defaultUserInfo);

  useEffect(()=>{
    if(userId){
      if(userId === userInfo["user_id"]){
        // console.log("已获取用户数据");
      }
      else{
        try{
          getUserInfo(userId).then((value)=>{
            // console.log(value);
            if(value != null){
              setUserInfo(value);
            }
            return value
          });
        }
        catch(error){
            console.log(error);
        }
      }
    }
    // eslint-disable-next-line
  },[userId])

  return (
    <div className="App">
      <Navbar userInfo={userInfo} setUserInfo={setUserInfo} defaultUserInfo={defaultUserInfo}/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/film/:order_by' element={<SubPage type="电影"/>}/>
        <Route path='/tv/:order_by' element={<SubPage type="电视剧"/>}/>
        <Route path='/animation/:order_by' element={<SubPage type="动画"/>}/>
        <Route path='/subject/:subject_id' element={<MovieDetailCard/>}/>
        <Route path='/userSubject' element={<UserSubjectPage/>}>
          <Route path='edit/:subject_id' element={<UserSubjectEditPage/>}/>
          <Route path='display/:subject_id' element={<UserSubjectDisplayPage/>}/>
        </Route>
        <Route path='/search' element={<SearchPage/>}>
          <Route path='user' element={<UserSearchResultPage/>}/>
          <Route path=':kind' element={<SearchResultPage/>}/>
        </Route>
        <Route path='/personal' element={<PersonalPage/>}>
          <Route path='collected' element={<PersonalFavoritePage/>}/>
          <Route path='favorites' element={<FavoritesPage/>}/>
          <Route path='favorite/:favorites_id' element={<FavoritesDisplayPage/>}/>
          <Route path='watching' element={<PersonalWatchingPage/>}/>
          <Route path='watched' element={<PersonalWatchedPage/>}/>
          <Route path='scored' element={<PersonalScoredPage/>}/>
          <Route path='like' element={<PersonalLikePage/>}/>
        </Route>
        <Route path='/recommendList'  element={<RecommendListPage/>}>
          <Route path='home'  element={<RecommendListHomePage/>}/>
          <Route path='manage'  element={<RecommendManagePage/>}/>
          <Route path='subscribe'  element={<RecommendListSubscribePage/>}/>
          <Route path=':list_id' element={<RecommendListDisplayPage/>}/>
        </Route>
        <Route path='/account' element={<AccountManagePage/>}>
          <Route path='infoDisplay' element={<AccountInfoDisplay userInfo={userInfo}/>}/>
          <Route path='infoEdit' element={<AccountInfoEdit userInfo={userInfo} setUserInfo={setUserInfo} getUserInfo={getUserInfo}/>}/>
          <Route path='passwordEdit' element={<AccountPasswordEdit userInfo={userInfo}/>}/>
          <Route path='delete' element={<AccountDelete userInfo={userInfo}/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/user' element={<UserHomePage userInfo={userInfo}/>}>
          <Route path=':user_id' element={<UserRecommendList/>}/>
          <Route path=':user_id/recommendlist/:list_id' element={<UserRecommendListDisplayPage/>}/>
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
