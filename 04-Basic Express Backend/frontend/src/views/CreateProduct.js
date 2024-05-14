import React, { useState } from "react";
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';


function CreateProduct() {
    // const [searchTerm, setSearchTerm] = useState("");
    const [isReady, setIsReady] = useState(true);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleCreateProduct = (data) => {
        console.log("data", data);
        setIsReady(false);
        axios
            .post(`${process.env.REACT_APP_API_URL}/product`, data)
            .then((res) => {
                axios.get(`${process.env.REACT_APP_API_URL}/product`).then((res) => {
                    setIsReady(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            })
            .catch((error) => {
                setIsReady(true);
                console.error("Error", error?.message);
            });
    };
    const category = [
        { label: 'ความงามและของใช้ส่วนตัว', id: 1 },
        { label: 'เสื้อผ้าแฟชั่น', id: 2 },
        { label: 'กระเป๋า', id: 3 },
        { label: 'รองเท้า', id: 4 },
        { label: 'นาฬิกาและแว่นตา', id: 5 },
        { label: 'สื่อบันเทิงภายในบ้าน', id: 6 },
        { label: 'เครื่องใช้ไฟฟ้าภายในบ้าน', id: 7 },
        { label: 'กล้องและอุปกรณ์ถ่ายภาพ', id: 8 },
        { label: 'ของเล่น สินค้าแม่และเด็ก', id: 9 },
        { label: 'สัตว์เลี้ยง', id: 10 },
        { label: 'กลุ่มผลิตภัณฑ์เพื่อสุขภาพ', id: 11 },
        { label: 'เครื่องประดับ', id: 12 },
        { label: 'เครื่องใช้ในบ้าน', id: 13 },
        { label: 'มือถือและอุปกรณ์เสริม', id: 14 },
        { label: 'คอมพิวเตอร์และแล็ปท็อป', id: 15 },
        { label: 'อาหารและเครื่องดื่ม', id: 16 },
        { label: 'กีฬาและกิจกรรมกลางแจ้ง', id: 17 },
        { label: 'เกมและอุปกรณ์เสริม', id: 18 },
    ];
    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    return (
        <div>
            <div className='min-h-screen'>
                <div className='flex justify-center  flex-wrap'>
                    <div className='lg:w-3/4 '>
                        <div className='my-1 font-semibold text-lg'>เพิ่มสินค้า</div>
                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit(handleCreateProduct)}>
                                    <div>ชื่อสินค้า</div>
                                    <Controller
                                        name='productname'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='ชื่อสินค้า'required />
                                        )}
                                    />

                                    <div>ราคา</div>
                                    <Controller
                                        name='price'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='ราคา'required />
                                        )}
                                    />

                                    <div>รายละเอียด</div>
                                    <Controller
                                        name='description'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='รายละเอียด'required />
                                        )}
                                    />

                                    <div>หมวดหมู่สินค้า</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={category}
                                        onChange={(event, newValue) => {
                                            setValue("category", newValue ? newValue.label : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label='หมวดหมู่สินค้า' required />}
                                    />

                                    <div>คลัง</div>
                                    <Controller
                                        name='stock'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='จำนวนสินค้า' required />
                                        )}
                                    />
                
                                    <div>อัปโหลดรูปภาพ</div>
                                    <Controller
                                        name='image'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='อัปโหลดรูปภาพ' required />
                                        )}
                                    />
                                    <div>
                                        <Button type='submit'>บันทึก</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateProduct;

