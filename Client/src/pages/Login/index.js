import React from "react";
import "antd/dist/antd.css";
import {  Divider,  Tabs,  Row,  Col,  Input,  Space,  Button} from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, AppleFilled} from "@ant-design/icons";

const { TabPane } = Tabs;

const LogIn = () => {
  const login = () => {};
  const signup = () => {};

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
                  <TabPane tab="Login" key="1" style={{
                      backgroundColor: "#fff",
                      padding: 25,
                      margin: 0,
                      borderRadius: 8,
                      borderColor: "#f0f0f0",
                      borderStyle: "solid",
                      borderWidth: 1 }}>
                    <Space direction="vertical">
                      <Divider plain>소셜로그인</Divider>
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                          <Button type="primary" block size="large" icon={<GoogleOutlined />}>
                            Google
                          </Button>
                        </Col>
                        <Col span={12}>
                          <Button type="primary" size="large" block icon={<AppleFilled />}>
                            Apple
                          </Button>
                        </Col>
                      </Row>
                      <Divider plain>Or use</Divider>
                      <Input placeholder="계정" size="large" block
                        prefix={<UserOutlined />}/>
                      <Input.Password placeholder="암호"
                        prefix={<LockOutlined />} block size="large" />
                      <Button type="primary" size="large" block onClick={login}>
                        로그인
                      </Button>
                      <Button block type="link">
                        비번찾기
                      </Button>
                    </Space>
                  </TabPane>
                  <TabPane tab="Sign up" key="2" style={{
                      backgroundColor: "#fff",
                      padding: 25,
                      margin: 0,
                      borderRadius: 8,
                      borderColor: "#f0f0f0",
                      borderStyle: "solid",
                      borderWidth: 1
                    }}>
                    <Space direction="vertical">
                      <Divider plain>기본정보입력</Divider>
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>                       
                      <Input placeholder="a" size="large" block
                        prefix={<UserOutlined />}/>
                      <Input placeholder="b" size="large" block
                        prefix={<UserOutlined />}/>
                      <Input placeholder="c" size="large" block
                        prefix={<UserOutlined />}/>
                      </Row>
                      <Divider plain>필수정보입력</Divider>
                      <Input placeholder="계정" size="large" block
                        prefix={<UserOutlined />}/>
                      <Input.Password placeholder="암호"
                        prefix={<LockOutlined />} block size="large"/>
                      <Input.Password placeholder="암호확인"
                        prefix={<LockOutlined />} block size="large"/>
                      <Button type="primary" size="large" block onClick={login}>
                        가입하기
                      </Button>
                      <Button block type="link" style={{ visibility: "hidden" }}>
                        암호찾기
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