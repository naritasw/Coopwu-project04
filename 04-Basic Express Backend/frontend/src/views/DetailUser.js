import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/joy";
import _ from "lodash";
import Avatar from '@mui/material/Avatar';

import {
    Card,
    CardHeader,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

function DetailUser() {
    const params = useParams();
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState({});
    console.log("params", params);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/${params.id}`)
            .then((res) => {
                setData(res.data);
                setIsReady(true);
                console.log("data", data);
            });
        return () => { };
    }, [params]);

    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    return (
        <Card className="w-96" style={{ marginTop: '20px' }}>
            <CardHeader floated={false} className="h-80">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
                    <br />
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {data.prefix} {data.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        อายุ {data.age} ปี
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        เบอร์โทรศัพท์ {data.telephone}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        แผนก {data.department}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" textGradient>
                        ที่อยู่ {data.address}
                    </Typography>

                </div>
            </CardHeader>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
export default DetailUser;
