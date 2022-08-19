import './App.css';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';

//navigation bar & footer
import Footer from './components/Footer';
import Navi from './components/navigator';

//작업용
import POSTList         from './components/POST/List';
import POSTWirte        from './components/POST/Wirte';
import POSTModified     from './components/POST/Modified';
import POSTDelete       from './components/POST/Delete';
import CommentWrite     from './components/POST/Comment/Write';
import CommentModified  from './components/POST/Comment/Modified';
import CommentDelete    from './components/POST/Comment/Delete';

// page components
import Login from './pages/Login';
import Main from './pages/Main';
import Page from './pages/Post';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

const MainContainer = styled.div`
  min-height: 880px;
  padding: 24px;
  background: #fff542;
  border: 1px solid lightgrey;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  `;

function App() {
  useEffect(() => {  }, [ ]);

    return (
      <BrowserRouter>   
          <Navi />      
          <Layout>
            <MainContainer>   
                <Routes>
                  <Route exact path="/" element={<Main />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/page" element={<Page />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/notfound/" element={<NotFound />} />
                  {/* 전체글 보기, 글쓰기, 글수정, 글삭제, 코멘트 달기&수정&삭제  */}
                  <Route path="/POSTList" element={<POSTList />} />
                  <Route path="/POSTWirte" element={<POSTWirte />} />
                  <Route path="/POSTDelete" element={<POSTDelete />} />
                  <Route path="/POSTModified" element={<POSTModified />} />
                  <Route path="/CommentWrite" element={<CommentWrite />} />
                  <Route path="/CommentModified" element={<CommentModified />} />
                  <Route path="/CommentDelete" element={<CommentDelete />} />
                </Routes>     
            </MainContainer>
            <Footer />  
          </Layout> 
      </BrowserRouter>     
  );
}

export default App;
