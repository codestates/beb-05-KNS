import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tabs,  Row,  Col,  Input,  Space,  Button} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { login } from "../../APIs/auth";

const { TabPane } = Tabs;

const LogIn = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName:'',
        password:'',
    });

    const handleLogin = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

    const isLogin = async () => {
        await login(user.userName, user.password)
        .then((res) => {
            const loginData = res.data;

            console.log(loginData.accessToken);
            
            localStorage.setItem('token', loginData.accessToken);
            //setUserInfo({accessToken, userName})
            navigate('/POSTList');
        })
        .catch((err) => {
            if (err) {
                alert(err.response.data.message);
            }
        });           
        // setUserInfo({accessToken, userName});
        // navigate('/');
        // await Axios.post(`http://localhost:8080/login`, user)
            // .then(() => {
            //     console.log(data);
            //     alert('로그인이 되었습니다.');
            //     navigate(`/`);
            // })
            // .catch((err) => {
            //     alert(err);
            // })
    }
    
    return (
    <div style={{ width: "100%"}}>
        <Row style={{ backgroundColor: "#f8faff" }}>
            <Col xs={1} sm={1} md={6} lg={6} xl={6}></Col>
            <Col xs={22} sm={22} md={12} lg={12} xl={12}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10%" }}>
                    <Space direction="vertical" align="center">
                    <h1 className="signinheader">로그인</h1>
                    <Tabs defaultActiveKey="1" centered style={{ width: "100%" }}>
                        <TabPane key="1" style={{
                            backgroundColor: "#fff",
                            padding: 25,
                            margin: 0,
                            borderRadius: 8,
                            borderColor: "#f0f0f0",
                            borderStyle: "solid",
                            borderWidth: 1 }}>
                            <Space direction="vertical">
                                <Input 
                                    type="userName" 
                                    name="userName"
                                    value={user.userName}
                                    placeholder="계정" 
                                    size="large" 
                                    prefix={<UserOutlined />}
                                    onChange={handleLogin}
                                    />
                                <Input.Password 
                                    type="password" 
                                    name="password"
                                    value={user.password}
                                    placeholder="암호"
                                    prefix={<LockOutlined />}
                                    size="large" 
                                    onChange={handleLogin}
                                    />
                                <Button type="primary" size="large" block onClick={isLogin}>
                                    로그인
                                </Button>
                                <Button type="primary" size="large" block onClick={() => navigate('/signup')}>
                                    회원가입
                                </Button>
                            </Space>
                        </TabPane>
                    </Tabs>
                </Space>
            </div>
        </div>
        </Col>
        <Col xs={1} sm={1} md={6} lg={6} xl={6}></Col>
    </Row>
    </div>
    );
};

export default LogIn;