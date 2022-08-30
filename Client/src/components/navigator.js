import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { WalletOutlined,UserOutlined,ImportOutlined } from "@ant-design/icons";
import { logout } from "../APIs/auth";
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: "Roboto", sans-serif;
    background-color: #fefefe;
    @media (max-width: 1200px) {
    grid-template-columns: 4fr 1fr 4fr;

    ul {
        padding: 0;
    }
}
`;

const NavBar = styled.ul`
display: flex;
align-items: center;
justify-content: flex-end;
gap: 20px;
padding: 10px;
a {
    text-decoration: none;
    color: black;
    cursor: pointer;
}
a:hover {
    color: #05b388;
}
input {
    width: 200px;
}
li {
    list-style: none;
    text-decoration: none;
    width: 100%;
}
@media (max-width: 1200px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0;
    a {
        font-size: 13px;
    }
    input {
        height: 32px;
    }
    ul {
        padding: 0;
        justify-content: center;
    }
    li {
        text-align: center;
        width: 50px;
    }
}
`;

// const NavInput = styled.input`
//     font-size: 16px;
//     border-radius: 25px;
//     height: 42px;
//     outline: none;
//     transition: all 0.3s ease-in-out;
//     box-shadow: 0 0 5px rgb(109 207 246 / 50%);
//     padding-left: 2rem;
//     padding-right: 2.5rem;
//     cursor: auto;
//     border: none;
//     :hover {
//         transition: all 0.2s ease-in-out;
//         background-color: #999999;
//         color: white;
//         ::placeholder {
//             color: white;
//         }
//     }
// `;
const StyledButton = styled.button`
    padding: 10px 10px;
    border: 1px solid lightgrey;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: ${(p) => p.color || "gray"};
    background: ${(p) => p.background || "white"};

    :hover {
        transition: all 0.2s ease-in-out;
        background-color: #999999;
        color: white;
        ::placeholder {
            color: white;
        }
    }
`;

const Nav = () => {
    const navigate = useNavigate();
    // const isLogin = false;
    const islogout = async () => {
        await logout()
            // localStorage.removeItem('token');
            alert('로그아웃이 되었습니다.')
            console.log(alert);
            navigate('/');
    }

    return (

    <NavContainer>
        <StyledButton>        
            <Link to="/POSTList">
                <img src={logo} alt='logo' style={{width:'200px', height:'80px'}} />
            </Link>
        </StyledButton>      
    <NavBar>
        {/* 잠시보류 <NavInput type="text" placeholder="검색" /> */}

            {/* 전체글 보기, 글쓰기, 글수정, 글삭제, 코멘트 달기&수정&삭제  */}
            <Link to="/POSTList">커뮤니티</Link>
            <Link to="/POSTWrite">게시글 등록</Link>
        
            <StyledButton>
                <Link to="/mypage"><UserOutlined /></Link>
            </StyledButton>
            <StyledButton>
                <Link to="/logout" onClick={islogout}><ImportOutlined /></Link>    
            </StyledButton>
        </NavBar>
    </NavContainer>
    );
};


export default Nav;
