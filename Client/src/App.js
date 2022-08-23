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
import POST         from './components/POST';
import POSTList         from './components/POST/List';
import POSTWirte        from './components/POST/Wirte';
import POSTModified     from './components/POST/Modified';

// page components
import Login from './pages/Login';
import Main from './pages/Main';
import Page from './pages/Post';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

const MainContainer = styled.div`
  min-height: 880px;
  padding: 24px;
  background: #f8faff;
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
                  <Route path="/POST" element={<POST />} />
                  <Route path="/POSTList" element={<POSTList />} />
                  <Route path="/POSTWirte" element={<POSTWirte 
                      defaultContent="**<br />hello<br /> world<br />**<br />"
                      actionBarClass="my-custom-class"
                    />} />
                  <Route path="/POSTModified" element={<POSTModified />} />
                </Routes>     
            </MainContainer>
            <Footer />  
          </Layout> 
      </BrowserRouter>     
  );
}

export default App;
