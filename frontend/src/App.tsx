import React from 'react';
import {Col, Input, Layout, Row, Select, theme} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import NumericInput from "./components/NumericInput";

const {Header, Content, Footer} = Layout;

const style: React.CSSProperties = {padding: '8px 0'};

const App: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center'}}>
                <div className="demo-logo"/>
            </Header>
            <Content style={{padding: '0 48px'}}>
                <div style={{
                    marginTop: 48,
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 24,
                    borderRadius: borderRadiusLG,
                }}>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Food truck name</h5>
                                <Input size="large" prefix={<UserOutlined/>}/>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Food</h5>
                                <Select
                                    mode="tags"
                                    size="large"
                                    placeholder="Please select"
                                    defaultValue={['a10', 'c12']}
                                    style={{width: '100%'}}
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Your location</h5>
                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                    <Col span={12}>
                                        <NumericInput value="12" onChange={() => {
                                        }} style={{width: '100%'}} placeholder="Latitude"></NumericInput>
                                    </Col>
                                    <Col span={12}>
                                        <NumericInput value="12" onChange={() => {
                                        }} style={{}} placeholder="Longitude"></NumericInput>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Search radius, km</h5>
                                <NumericInput value="5" onChange={() => {
                                }} style={{}} placeholder="Search radius"></NumericInput>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Food Truck Inc ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default App;