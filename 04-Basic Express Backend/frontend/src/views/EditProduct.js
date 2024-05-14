import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function EditProduct() {
    // const [searchTerm, setSearchTerm] = useState("");
    const [isReady, setIsReady] = useState(true);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            setIsReady(false);
            axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
                .then((res) => {
                    const productData = res.data;
                    setValue('productname', productData.productname);
                    setValue('price', productData.price);
                    setValue('description', productData.description);
                    setValue('category', productData.category);
                    setValue('stock', productData.stock);
                    setValue('image', productData.image);
                    setIsReady(true);
                })
                .catch((error) => {
                    setIsReady(true);
                    console.error("Error fetching product data", error);
                });
        }
    }, [id, setValue]);

    const handleEditProduct = (data) => {
        console.log("data", data);
        setIsReady(false);
        axios
            .put(`${process.env.REACT_APP_API_URL}/product/${id}` ,data)
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
        { label: 'ความงามและของใช้ส่วนตัว', value: 1 },
        { label: 'เสื้อผ้าแฟชั่น', value: 2 },
        { label: 'กระเป๋า', value: 3 },
        { label: 'รองเท้า', value: 4 },
        { label: 'นาฬิกาและแว่นตา', value: 5 },
        { label: 'สื่อบันเทิงภายในบ้าน', value: 6 },
        { label: 'เครื่องใช้ไฟฟ้าภายในบ้าน', value: 7 },
        { label: 'กล้องและอุปกรณ์ถ่ายภาพ', value: 8 },
        { label: 'ของเล่น สินค้าแม่และเด็ก', value: 9 },
        { label: 'สัตว์เลี้ยง', value: 10 },
        { label: 'กลุ่มผลิตภัณฑ์เพื่อสุขภาพ', value: 11 },
        { label: 'เครื่องประดับ', value: 12 },
        { label: 'เครื่องใช้ในบ้าน', value: 13 },
        { label: 'มือถือและอุปกรณ์เสริม', value: 14 },
        { label: 'คอมพิวเตอร์และแล็ปท็อป', value: 15 },
        { label: 'อาหารและเครื่องดื่ม', value: 16 },
        { label: 'กีฬาและกิจกรรมกลางแจ้ง', value: 17 },
        { label: 'เกมและอุปกรณ์เสริม', value: 18 },
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
                                <form onSubmit={handleSubmit(handleEditProduct)}>
                                    <div>ชื่อสินค้า</div>
                                    <Controller
                                        name='productname'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='ชื่อสินค้า' />
                                        )}
                                    />

                                    <div>ราคา</div>
                                    <Controller
                                        name='price'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='ราคา' />
                                        )}
                                    />
                                    <div>รายละเอียด</div>
                                    <Controller
                                        name='description'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='รายละเอียด' />
                                        )}
                                    />

                                    <div>หมวดหมู่</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={category}
                                        onChange={(event, newValue) => {
                                            setValue("category", newValue ? newValue.label : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="หมวดหมู่" />}
                                    />
                                    <div>คลัง</div>
                                    <Controller
                                        name='stock'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='รายละเอียด' />
                                        )}
                                    />
                                    <div>อัปโหลดรูปภาพ</div>
                                    <Controller
                                        name='image'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} placeholder='อัปโหลดรูปภาพ' />
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

export default EditProduct;

