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
import PostList     from './pages/Post/PostList';
import PostWrite    from './pages/Post/PostWrite';
import PostView     from './pages/Post/PostView';
import PostEdit     from './pages/Post/PostEdit';

// page components
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';
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
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/notfound/" element={<NotFound />} />

                  {/* 전체글 보기, 글쓰기, 상세 보기, 글수정  */}
                  <Route path="/PostList" element={<PostList />} />
                  <Route path="/PostWrite" element={<PostWrite />} />           
                  <Route path="/PostView/:id" element={<PostView />} />             
                  <Route path="/PostEdit/:id" element={<PostEdit />} />
                 
                </Routes>     
            </MainContainer>
            <Footer />  
          </Layout> 
      </BrowserRouter>     
  );
}

export default App;
