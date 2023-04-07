"use client";
import { Card, Col, Row, Steps, Input, DatePicker, Button } from "antd";
import { LockOutlined } from '@ant-design/icons';
import { useState } from "react";
import { stepsList } from "../../../utils/constants";


export default function Create() {
    const [data, setData] = useState<any>({ reward: 0, rewardChecked: false })
    const [result, setResult] = useState();
    const [isValidData, setIsValiData] = useState();
    const [steps, setSteps] = useState();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const updateData = (key: any, value: any) => {
        if (key === 'redirectUrl') {
            value = (value.indexOf('://') === -1) ? 'http://' + value : value;
        }
        setData({ ...data, [key]: value });
    };

    const getStep = () => {
        if (!!result) {
            return 2;
        } else if (isValidData) {
            return 1;
        }
        return 3;
    }

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    return (

        <div>
            <Row>
                <Col span={16}>
                    <Card className="create-form boxed" bordered={false} title="Create a new Onchain Events">
                        <a href="#" >Set demo data</a>
                        <br />
                        <h3 className="vertical-margin">Event name 🎉:</h3>
                        <Input
                            placeholder="This title will be displayed on the Onchain Events page."
                            value={data.title}
                            className="form-control"
                            prefix="Event Name:"
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <br />
                        <br />
                        <p>
                            The start date and the end date of the event 📅
                        </p>
                        <h4 className="vertical-margin">Event Date:</h4>
                        <RangePicker showTime />
                        <br />
                        <br />
                        <p>
                            Be the most descriptive so your attendees don't get lost 🕵🏽‍♂️
                        </p>
                        <Input
                            placeholder="This location will be displayed on the Onchain Events page."
                            value={data.title}
                            className="form-control"
                            prefix="Event Location:"
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <br />
                        <br />
                        <p>
                            The name of the event organizer 👤
                        </p>
                        <Input
                            placeholder="This name will be displayed on the Onchain Events page."
                            value={data.title}
                            className="form-control"
                            prefix="Event Organizer:"
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <br />
                        <br />
                        <p>
                            The email of the organizer 📧
                        </p>
                        <Input
                            placeholder="This email will be displayed on the Onchain Events page."
                            value={data.title}
                            className="form-control"
                            prefix="Organizer Email:"
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <br />
                        <br />
                        <p>
                            The description of the event 📝
                        </p>
                        <TextArea
                            rows={4}
                            className="form-control"
                            placeholder="This description will be displayed on the Onchain Events page."
                            value={data.title}
                            prefix="Event Description:"
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                            icon={<LockOutlined />}
                            size={size}
                            disabled={loading}
                            loading={loading}

                        >
                            Generate Proof
                        </Button>
                        {!error && !result && loading && (
                            <span>&nbsp;Note this may take a few moments.</span>
                        )}
                        {error && <div>
                            <div className="error-text">{error}</div>
                        </div>
                        }
                        <br />
                        <br />
                    </Card>
                </Col>
                <Col span={1}></Col>
                <Col span={7}>
                    <Steps
                        className="standard-margin"
                        direction="vertical"
                        size="small"
                        items={stepsList}
                        style={{
                            color: '#fff',
                        }}
                        current={getStep()}
                    />
                </Col>
            </Row>
        </div>
    )

}