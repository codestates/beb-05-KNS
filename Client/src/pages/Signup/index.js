import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tabs,  Row,  Col,  Input,  Space,  Button} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const { TabPane } = Tabs;

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName:'',
        password:'',
        confirmPassword:''
    });

    const handleSignup = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

    const isSignup = async () => {
        const { userName, password, confirmPassword } = user;
        if (userName && password && password === confirmPassword) {
            await axios
                .post(`http://localhost:8080/signup`, user)
                .then((res) => {
                    console.log(res);
                    alert('회원가입이 되었습니다.')
                    navigate(`/login`);
                })
                // .catch((err) => {
                //     if (err) {
                //         alert(err.response.data.message);
                //     }
                // })
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    };

    return (
    <div style={{ width: "100%"}}>
        <Row style={{ backgroundColor: "#f8faff" }}>
            <Col xs={1} sm={1} md={6} lg={6} xl={6}></Col>
            <Col xs={22} sm={22} md={12} lg={12} xl={12}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10%" }}>
                    <Space direction="vertical" align="center">
                    <h1 className="signinheader">회원가입</h1>
                    <Tabs defaultActiveKey="1" centered style={{ width: "100%" }}>
                        <TabPane key="2" style={{
                            backgroundColor: "#fff",
                            padding: 25,
                            margin: 0,
                            borderRadius: 8,
                            borderColor: "#f0f0f0",
                            borderStyle: "solid",
                            borderWidth: 1
                            }}>
                            <Space direction="vertical">
                                <Input 
                                    type="userName" 
                                    name="userName"
                                    value={user.userName}
                                    placeholder="계정"
                                    size="large" 
                                    prefix={<UserOutlined />}
                                    onChange={handleSignup}
                                    />
                                <Input.Password 
                                    type="passwoed"
                                    name="password"
                                    value={user.password}
                                    placeholder="암호"
                                    prefix={<LockOutlined />} 
                                    size="large"
                                    onChange={handleSignup}
                                    />
                                <Input.Password 
                                    type="password"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    placeholder="암호확인"
                                    prefix={<LockOutlined />} 
                                    size="large"
                                    onChange={handleSignup}
                                    />
                                <Button type="primary" size="large" block onClick={isSignup}>
                                    가입하기
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

export default Signup;