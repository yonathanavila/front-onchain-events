"use client";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useProvider, useSigner } from 'wagmi';
import { LockOutlined } from '@ant-design/icons';
import { stepsList } from "../../../utils/constants.tsx";
import { Card, Col, Row, Steps, Input, DatePicker, Button, Typography, Result } from "antd";
import { validateEmail, validateEther } from "../../../utils/functions/validations.ts";
import { RegisterOnchainEvent } from "../../../utils/functions/OnchainEvents/RegisterEvent.tsx";
import GenerateMerkleTree from "../../../utils/functions/MerkleTree/index.tsx";

const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 280 : 280;

export default function Create() {
    const [result, setResult] = useState<any>();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const router = useRouter();
    const regex = /^\s*$/; // regular expression that matches empty strings or strings that only contain whitespace
    const { data: signer } = useSigner(chainId);
    const provider = useProvider(chainId);


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

    const handleCreateOnchainEvent = async () => {
        try {
            const { leaf, root } = GenerateMerkleTree(formInfo);
            await RegisterOnchainEvent(provider, signer, leaf);
            return `0x${root}`;
        } catch (error: any) {
            console.error(error);
        }
    }

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
        const { name, value } = event.target;
        setFormInfo({ ...formInfo, [name]: value });
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

            if (
                regex.test(formInfo.event_name) ||
                regex.test(formInfo.event_date_start) ||
                regex.test(formInfo.event_date_end) ||
                regex.test(formInfo.event_location) ||
                regex.test(formInfo.event_organizer) ||
                regex.test(formInfo.event_organizer_email) ||
                regex.test(formInfo.event_fee) ||
                regex.test(formInfo.event_description)
            ) {
                console.log('Information is: ', formInfo);
                throw new Error('Empty values');
            }
            const root = await handleCreateOnchainEvent();
            const newData = { ...formInfo, root };
            const response = await fetch('/api/v1/T2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                console.log('data: ', data);
                setResult(data);

            }
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { Title } = Typography;
    const isValid = () => {
        return (
            formInfo.event_name &&
            formInfo.event_date_start &&
            formInfo.event_date_end &&
            formInfo.event_location &&
            formInfo.event_organizer &&
            validateEmail(formInfo.event_organizer_email) &&
            validateEther(formInfo.event_fee) &&
            formInfo.event_description

        );
    };
    const isValidData = isValid();

    const getStep = () => {
        if (!!result) {
            return 2;
        } else if (isValidData) {
            return 1;
        }
        return 0;
    };

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    if (result) {

        return (
            <Result
                status="success"
                title="Created Onchain event!"
                subTitle="Your Onchain event request has been created and is ready to be listed."
                extra={[
                    <Button key="contract">
                        <a href={`/events/${result[0]?.id}/attend`} target="_blank">
                            View created event
                        </a>
                    </Button>,
                    <Button key="share">
                        <a href={`/events/${result[0]?.id}/attend`} target="_blank">
                            Share this url
                        </a>
                    </Button>
                ]}
            />
        );
    }

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
                            required={true}
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
                            required={true}
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
                            required={true}
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
                            required={true}
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
                            required={true}
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
                            required={true}
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