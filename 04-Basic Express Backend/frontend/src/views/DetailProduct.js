import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Grid,
    CardContent,
    Typography,
    LinearProgress,
    IconButton,
    Button,
    InputAdornment,
    Input,
    CardMedia,
    CardActions
} from "@mui/material";
import _ from 'lodash';
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';

function DetailProduct() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [cart, setCart] = useState([]);
    const [rerender, setRerender] = useState(false)

    const getAllProduct = () => {
        setIsReady(false);
        axios
            .get(`${process.env.REACT_APP_API_URL}/product`)
            .then((res) => {
                if (res?.data?.rows) {
                    setProducts(res.data.rows);
                }
                setIsReady(true);
                console.log("Product ", res?.data?.rows);
            })
            .catch((error) => {
                console.error("Error", error?.message);
            });
    };

    console.log("cart", cart);

    useEffect(() => {
        getAllProduct();
    }, []);

    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    // const selectedProduct = _.find(cart, { product: each });
    // if (selectedProduct) {
    //   selectedProduct.quantity += 1;
    // } else {
    //   cart.push({ product: each, quantity: 1 });
    // }

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='flex justify-center flex-wrap'>
                <div className='lg:w-3/4 w-full'>
                    <Card>
                        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Input
                                placeholder='Search products...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 6, marginRight: '8px' }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                            <Button
                                startIcon={<ShoppingCartOutlinedIcon />}
                                style={{ color: 'black' }}
                            >
                            </Button>
                        </CardContent>
                    </Card>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            ค้นหา : <span className='text-blue-500'>{searchTerm}</span>
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>สินค้าในตะกร้า</div>
                        {_.map(cart, (product, index) => (
                            <div key={index}>
                                {product?.product?.productname}{' '}
                                <Button
                                    onClick={() => {
                                        cart.splice(index, 1);
                                        setCart([...cart]);
                                        setRerender(!rerender);
                                    }}
                                >
                                    ลบ
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Grid container spacing={0.5}>
                        {products.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase())).map((product, index) => (
                            <Grid item key={index} xs={6} sm={3} md={2} lg={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card key={index} style={{ width: '100%', height: '100%', borderRadius: '0px' }}>
                                    <Link to={`/Checkout/${product?._id}`}>
                                        <CardMedia
                                            component="img"
                                            image={product?.image?.url}
                                            alt={product.productname}
                                            style={{ height: '50%' }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" noWrap>
                                                {product.productname}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                ฿ {product.price} บาท
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                    <CardActions style={{ justifyContent: 'space-between' }}>
                                        <IconButton
                                            aria-label="Add to Cart"
                                            onClick={() => {
                                                const selectedProduct = _.find(cart, productProductInCard => productProductInCard?.product?._id === product?._id)
                                                if (selectedProduct ){
                                                 selectedProduct.quantity = selectedProduct.quantity + 1
                                                }
                                                else {
                                                 cart.push({ product:product,quantity:1 })
                                                }
                                                 
                                                 setCart(cart)
                                                 console.log(cart)
                                                 setRerender(!rerender)
                                         }}>

                                            <AddShoppingCartIcon />
                                        </IconButton>

                                        <Link to={`/Product/edit/${product?._id}`}>
                                            <IconButton aria-label="Edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div >
    );
}

export default DetailProduct;
