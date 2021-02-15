import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Product({ product }){
    return(
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${product.id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
            <Link to={`/product/${product.id}`}>
                <Card.Title>
                    <strong>{product.title}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3" style={{color: '#000', textDecoration: 'none'}}>
                ${product.price}
            </Card.Text>

            </Card.Body>
        </Card>
    );
}

export default Product;