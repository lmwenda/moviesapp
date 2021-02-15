import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

import Products from "./Products";

function Home(){
    const [ products, setProducts ] = useState([]);

    useEffect(() => { 
        async function getProducts(){
            const { data } = await axios.get('https://fakestoreapi.com/products');
            console.log(data);

            setProducts(data);
        }

        getProducts();
    }, [])

    return(
        <> 
        <Row>
            {products.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
            </Col>
            ))}
        </Row>
        </>
    );
}

export default Home;