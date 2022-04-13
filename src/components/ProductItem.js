import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export const ProductItem = (
  { productName, category, price, averageScore, imageUrl,id },
  k
) => {
  return (
    <Col key={k} xs={12} md={8} lg={3}>
      <Link to={`/product/${id}`} key={k}>
        <Card>
          <Card.Img src={imageUrl} />

          <Card.Body>
            <Card.Title>
              {" "}
              <strong> </strong>
              {productName}
            </Card.Title>

            <Card.Text>
              {" "}
              <strong> categorie : </strong> {category}
            </Card.Text>
            <Card.Text>
              {" "}
              <strong>prix : </strong> {price}
            </Card.Text>
            <Card.Text>
              {" "}
              <strong> score moyen : </strong> {averageScore}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
