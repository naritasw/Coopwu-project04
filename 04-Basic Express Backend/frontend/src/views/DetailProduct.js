import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@mui/joy";
import {
    Card,
    Grid,
    CardContent,
    Typography,
    LinearProgress,
    IconButton,
} from "@mui/material"; // Updated import statement
import axios from "axios";
import _ from "lodash";
import CardMedia from '@mui/material/CardMedia';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function DetailProduct() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const getAllProduct = () => {
        setIsReady(false);
        axios
            .get(`${process.env.REACT_APP_API_URL}/product`)
            .then((res) => {
                setProducts(res?.data?.rows);
                setIsReady(true);
                console.log("Product ", res?.data?.rows);
            })
            .catch((error) => {
                console.error("Error", error?.message);
            });
    };
    useEffect(() => {
        getAllProduct();
        return () => { };
    }, []);

    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    return (
        <div className='min-h-screen'>
        <div className='flex justify-center  flex-wrap'>
          <div className='lg:w-3/4'>
            <Card>
              <CardContent>
                <div>Search Box</div>
                <Input
                  placeholder='Input Some Search Word'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                  You Search <span className='text-blue-500'>{searchTerm}</span>
                </div>
              </CardContent>
            </Card>
            <div>
        <Grid container spacing={0} >
            {products.map((product, index) => (
                <Grid item key={index} xs={6} sm={4} md={4} lg={2} sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Card key={index} sx={{ width: 200, height: 250, m: 2, marginTop: "3rem" }}>
                       
                        <Link to={`/Checkout/${product?._id}`}>
                            <CardMedia
                                component="img"
                                image={product?.image?.url}
                                alt={product.productname}
                                sx={{ height: 100, width: 'auto', margin: 'auto' }}
                            />
                            <CardContent>
                                <Typography font-bold>
                                    {product.productname}
                                </Typography>
                                <Typography color="red">
                                    ฿ {product.price} บาท
                                </Typography>
                            </CardContent>
                        </Link>
                        <Link to={`/Product/edit/${product?._id}`}>
                            <IconButton aria-label="Edit">
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </div>
        </div>
      </div>
    </div>
    );
}
export default DetailProduct;