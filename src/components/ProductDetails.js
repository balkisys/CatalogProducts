import React, { useState, useEffect } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Header } from "./Header";
const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        mode: "cors",
      });
      const nbaData = await response.json();

      setProduct(nbaData);
      console.log("playerData", product);
    };
    fetchProduct();
  }, []);
  const {
    imageUrl,
    productName,
    category,
    price,
    averageScore,
    reviews,
    description,
  } = product;
  const Reviews = (props) => {
    const { review } = props;
    console.log(review.value, review.content);
    return (
      <div>
        <ul>
          <li>
            {" "}
            <strong> note des reviews :</strong> {review.value}
            <strong> commentaire :</strong> {review.content}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={3}>
            <Button bg="dark" onClick={() => navigate(-1)}>
              <i class="bi bi-skip-backward-fill"></i> retourner
            </Button>
            <Card>
              <Card.Img src={imageUrl} />

              <Card.Body>
                <Card.Title>{productName}</Card.Title>

                <Card.Text>
                  <strong>categorie :</strong> {category}
                </Card.Text>
                <Card.Text>
                  {" "}
                  <strong> description : </strong> {description}
                </Card.Text>
                <Card.Text>
                  {" "}
                  <strong> prix :</strong> {price}
                </Card.Text>
                <Card.Text>
                  {" "}
                  <strong> score moyen : </strong> {averageScore}
                </Card.Text>
                <Card.Text>
                  {" "}
                  {reviews &&
                    reviews.map((review, index) => (
                      <Reviews key={index} review={review} />
                    ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardProduct;
