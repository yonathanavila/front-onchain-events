"use client";
import { useState } from "react";
import { LockOutlined } from '@ant-design/icons';
import { stepsList } from "../../../utils/constants.tsx";
import { Card, Col, Row, Steps, Input, DatePicker, Button, Typography } from "antd";
import { validateEmail, validateEther } from "../../../utils/functions/validations.ts";


export default function Create() {
    const [result, setResult] = useState();
    const [isValidData, setIsValiData] = useState();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();

    const [formInfo, setFormInfo] = useState<any>({
        event_name: "",
        event_date_start: "",
        event_date_end: "",
        event_location: "",
        event_organizer: "",
        event_organizer_email: "",
        event_fee: "",
        event_description: ""
    });

    const handlerFill = () => {
        setFormInfo({
            event_name: "Onchain Events",
            event_date_start: "2021-08-03T00:00:00.000Z",
            event_date_end: "2021-08-03T00:00:00.000Z",
            event_location: "Barrio la cumbre",
            event_organizer: "Mike",
            event_organizer_email: "evenst@onchainevents.com",
            event_fee: "0.1",
            event_description: "This is a demo event"
        });
    }

    const handleCallerInfoChange = (event: any) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
    };

    function handlerDate(time: any): void {
        setFormInfo({ ...formInfo, event_date_start: time[0]['$d'].toString(), event_date_end: time[1]['$d'].toString() });
    }

    const handleSubmit = async () => {
        try {

            //------- validate information
            if (!validateEmail(formInfo.event_organizer_email)) {
                throw new Error("Invalid email");
            };

            if (!validateEther(formInfo.event_fee)) {
                throw new Error("Invalid fee");
            }

            const response = await fetch('/api/v1/T2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formInfo),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResult(data.result);
            }
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { Title } = Typography;

    const getStep = () => {
        if (!!result) {
            return 2;
        } else if (isValidData) {
            return 1;
        }
        return 1;
    }

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    return (

        <div>
            <Row>
                <Col span={16}>
                    <Title>Onchain Events</Title>
                    <br />
                    <br />
                    <Card className="create-form boxed" bordered={false}>
                        <a href="#" onClick={handlerFill} >Set demo data</a>
                        <br />
                        <br />
                        <p>
                            The name of the event
                        </p>
                        <Input
                            value={formInfo.event_name}
                            name="event_name"
                            className="form-control"
                            prefix="Event Name:"
                            onChange={handleCallerInfoChange}
                        />
                        <br />
                        <br />
                        <p>
                            The start date and the end date of the event 📅
                        </p>
                        <RangePicker showTime onChange={(e) => handlerDate(e)} name="event_date" value={formInfo.event_date} />
                        <br />
                        <br />
                        <p>
                            Be the most descriptive so your attendees don&apos;t get lost 🕵🏽‍♂️
                        </p>
                        <Input
                            value={formInfo.event_location}
                            name="event_location"
                            className="form-control"
                            prefix="Event Location:"
                            onChange={handleCallerInfoChange}
                        />
                        <br />
                        <br />
                        <p>
                            The name of the event organizer 👤
                        </p>
                        <Input
                            value={formInfo.event_organizer}
                            name="event_organizer"
                            className="form-control"
                            prefix="Event Organizer:"
                            onChange={handleCallerInfoChange}
                        />
                        <br />
                        <br />
                        <p>
                            The email of the organizer 📧
                        </p>
                        <Input
                            value={formInfo.event_organizer_email}
                            name="event_organizer_email"
                            type="email"
                            className="form-control"
                            prefix="Organizer Email:"
                            onChange={handleCallerInfoChange}
                        />
                        <br />
                        <br />
                        <p>
                            Set the price of the attendance 💰, help cover the costs of organizing the event and provide an incentive for attendees to show up. Charging a fee can also help to filter out attendees who may not be serious about attending, which can help to ensure that the event is well-attended and productive
                        </p>
                        <Input
                            value={formInfo.event_fee}
                            name="event_fee"
                            className="form-control"
                            type="number"
                            prefix="Entrance fee:"
                            onChange={handleCallerInfoChange}
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
                            value={formInfo.event_description}
                            name="event_description"
                            prefix="Event Description:"
                            onChange={handleCallerInfoChange}
                        />
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                            icon={<LockOutlined />}
                            size={size}
                            disabled={loading}
                            loading={loading}
                            onClick={() => {
                                setLoading(true);
                                setError(undefined);
                                setResult(undefined);
                                handleSubmit();
                            }}

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
                        // if status is done change the icon check to 🎉

                        items={stepsList}
                        style={{
                            color: '#fff',
                        }}
                        current={getStep()}
                    />
                </Col>
            </Row>
            <br />
            <br />
        </div>
    )

}