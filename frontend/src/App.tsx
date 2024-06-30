import React, {useEffect, useState} from 'react';
import {Col, Input, Layout, Row, Select, SelectProps, theme} from 'antd';
import NumericInput from "./components/NumericInput";

const {Header, Content, Footer} = Layout;
const style: React.CSSProperties = {padding: '8px 0'};


const App: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const [foodItems, setFoodItems] = useState([] as SelectProps['options']);
    const [searchTruckName, setSearchTruckName] = useState("");
    const [searchLatitude, setSearchLatitude] = useState(37.74530);
    const [searchLongitude, setSearchLongitude] = useState(-122.40342);
    const [searchRadius, setSearchRadius] = useState(0.2);

    const fetchFoodItems = async () => {
        const response = await fetch("/api/foodtrucks/foodItems");
        const result: string[] = await response.json();
        const options: SelectProps['options'] = [];
        result.forEach(item => {
            options.push({
                value: item,
                label: item,
            })
        })
        setFoodItems(options);
    }
    useEffect(() => {
        fetchFoodItems();
    }, []);

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
                    <h2>Search for the best street food</h2>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Food truck name</h5>
                                <Input size="large" value={searchTruckName}
                                       onChange={(e) => setSearchTruckName(e.target.value)}/>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Food</h5>
                                <Select
                                    mode="tags"
                                    size="large"
                                    placeholder="Please select"
                                    style={{width: '100%'}}
                                    options={foodItems}
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Your location</h5>
                                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                                    <Col span={12}>
                                        <NumericInput value={searchLatitude} onChange={setSearchLatitude}
                                                      style={{width: '100%'}}
                                                      placeholder="Latitude"></NumericInput>
                                    </Col>
                                    <Col span={12}>
                                        <NumericInput value={searchLongitude} onChange={setSearchLongitude} style={{}}
                                                      placeholder="Longitude"></NumericInput>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="gutter-row" xs={24} xl={6}>
                            <div style={style}>
                                <h5>Search radius, km</h5>
                                <NumericInput value={searchRadius} onChange={setSearchRadius} style={{}}
                                              placeholder="Search radius"></NumericInput>
                            </div>
                        </Col>
                    </Row>
                    <h2>Search results:</h2>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Food Truck Inc ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default App;