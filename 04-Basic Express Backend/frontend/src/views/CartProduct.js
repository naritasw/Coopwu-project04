// import React, { useState, useEffect } from "react";
// import {
//     Card,
//     Grid,
//     CardContent,
//     Typography,
//     IconButton,
//     CardMedia,
//     CardActions,
//     Checkbox,
//     FormControlLabel
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';


// function Cart() {
//     const [cart, setCart] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);

//     useEffect(() => {
//         const savedCart = JSON.parse(localStorage.getItem("cart"));
//         if (savedCart) {
//             setCart(savedCart);
//         }
//     }, []);

//     const removeFromCart = (productToRemove) => {
//         const updatedCart = cart.filter(product => product._id !== productToRemove._id);
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//     };

//     const handleCheckboxChange = (product) => {
//         setSelectedItems(prevSelectedItems => {
//             if (prevSelectedItems.includes(product._id)) {
//                 return prevSelectedItems.filter(item => item !== product._id);
//             } else {
//                 return [prevSelectedItems, product._id];
//             }
//         });
//     };

//     return (
//         <div className='min-h-screen bg-gray-100 p-4'>
//             <div className='flex justify-center flex-wrap'>
//                 <div className='lg:w-3/4 w-full'>
//                     <Typography variant="h6" gutterBottom>
//                         สินค้าในตะกร้า
//                     </Typography>
//                     <Grid container spacing={2}>
//                         {cart.length > 0 ? cart.map((product, index) => (
//                             <Grid item key={index} xs={12}>
//                                 <Card style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
//                                     <FormControlLabel
//                                         control={
//                                             <Checkbox
//                                                 checked={selectedItems.includes(product._id)}
//                                                 onChange={() => handleCheckboxChange(product)}
//                                             />
//                                         }
//                                         label=""
//                                     />
//                                     <Link to={`/Checkout/${product?._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
//                                         <CardMedia
//                                             component="img"
//                                             image={product?.image?.url}
//                                             alt={product.productname}
//                                             style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
//                                         />
//                                         <CardContent style={{ flex: '1' }}>
//                                             <Typography variant="h6" noWrap>
//                                                 {product.productname}
//                                             </Typography>
//                                             <Typography variant="body2" color="textSecondary" noWrap>
//                                                 ฿ {product.price} บาท
//                                             </Typography>
//                                         </CardContent>
//                                     </Link>
//                                     <CardActions>
//                                         <IconButton
//                                             aria-label="Remove from Cart"
//                                             onClick={() => removeFromCart(product)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </CardActions>
//                                 </Card>
//                             </Grid>
//                         )) : (
//                             <Typography variant="h6" style={{ width: '100%', textAlign: 'center' }}>
//                                 ไม่มีสินค้า
//                             </Typography>
//                         )}
//                     </Grid>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Cart;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Input,
  LinearProgress,
  Table,
} from "@mui/joy";
import axios from "axios";
import _ from "lodash";

function Cart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Cart, setCart] = useState([]);
  const [isReady, setIsReady] = useState(false);

      useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

//   const getAllUser = () => {
//     setIsReady(false);
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/user`)
//       .then((res) => {
//         setCart(res?.data?.rows);
//         setIsReady(true);
//         console.log("User ", res?.data?.rows);
//       })
//       .catch((error) => {
//         console.error("Error", error?.message);
//       });
//   };

//   useEffect(() => {
//     getAllUser();
//     return () => { };
//   }, []);

//   const handleDeleteUser = (userId) => {
//     axios
//       .delete(`${process.env.REACT_APP_API_URL}/user/${userId}`)
//       .then((res) => {
//         getAllUser();
//       })
//       .catch((error) => {
//         alert(error?.message);
//         console.error("Error", error?.message);
//       });
//   };

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
              <h3 className='font-bold'>User List</h3>
              <Table>
                <thead>
                  <tr>
                    <th>ลำดับที่</th>
                    <th>สินค้า</th>
                    <th>ราคาต่อชิ้น</th>
                    <th>จำนวน</th>
                    <th>ราคารวม</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                {_.map(Cart, (eachCart, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eachCart?.productname}</td>
                    <td>{eachCart?.productname}</td>
                    <td>{eachCart?.productname}</td>
                    <td>{eachCart?.productname}</td>
                    <td>
                      {/* <Button
                        color='danger'
                        onClick={() => handleDeleteUser(eachCart?._id)}
                      >
                        ลบ
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;