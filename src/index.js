import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles/HomePage.css';
import './styles/SubPage.css';
import './styles/PersonalPage.css';
import './styles/PageOptionListTransverse.css';
import './styles/SearchPage.css';
import './styles/SideBar.css';
import './styles/NestedPage.css';
import './styles/PopUpButton.css';
import './styles/RecommendList.css';
import './styles/AccountManage.css';
import './styles/OptionList.css';
import './styles/FavoritesPage.css';
import './styles/LoginPage.css';
import './styles/404Page.css';
import './styles/ListPage.css';
import './styles/UserSearchResultPage.css';
import './styles/UserHomePage.css'
import './styles/Customized.css';
import './styles/SubjectEditPage.css'
import './styles/detail.css';
import { AuthProvider } from './components/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
