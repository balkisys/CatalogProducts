import React, { useEffect, useState } from "react";
import { Row, Container, Form, Col  } from "react-bootstrap";
import { Input } from "reactstrap";
import { ProductItem } from "./ProductItem";
import ProductDataService from "../services/ProductService";
import Pagination from "@material-ui/lab/Pagination";
import { Header } from "./Header";
export default function ProductList() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [searchPrice, setSearchPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 15, 20];
  let limit = 10;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products", {
          mode: "cors",
        });
        const nbaData = await response.json();
        setIsLoaded(true);
        setItems(nbaData.products);
        const total = nbaData.totalItems;
        setpageCount(Math.ceil(total / limit));
      } catch (e) {
        console.log(e);
        setIsLoaded(true);
        setError(e);
      }
    };

    fetchProduct();
  }, [limit]);

  const getRequestParams = (
    searchPrice,
    searchProductName,
    searchCategory,
    page,
    pageSize
  ) => {
    let params = {};
    if (searchCategory) {
      params["category"] = searchCategory;
    }
    if (searchProductName) {
      params["productName"] = searchProductName;
    }
    if (searchPrice) {
      params["price"] = searchPrice;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrieveProducts = () => {
    const params = getRequestParams(
      searchPrice,
      searchProductName,
      searchCategory,
      page,
      pageSize
    );
    ProductDataService.getAllProducts(params)
      .then((response) => {
        const { products, totalPages } = response.data;
        setProducts(products);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveProducts, [
    searchProductName,
    searchCategory,
    searchPrice,
    page,
    pageSize,
  ]);
  const handleReset = () => {
    setSearchCategory("");
    setSearchProductName("");
    setSearchPrice(0);
    retrieveProducts();
    setPage(1);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const categoryList = items.map((e) => e.category);
  const options = categoryList.map((value) => (
    <option value={value}>{value}</option>
  ));
  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };
  const onChangeSearchProductName = (e) => {
    const searchProductName = e.target.value;
    setSearchProductName(searchProductName);
  };
  const onChangeSearchPrice = (e) => {
    const searchPrice = e.target.value;
    setSearchPrice(searchPrice);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="justify-content-center">
        <div className="spinner-border text-primary  justify-content-center"></div>{" "}
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Header />
        <br></br>
        <Container>
          <Row>
            <Col md={3}>
              <Row>
                <Row>
                  <button
                    outline
                    className="btn btn-primary"
                    block
                    onClick={handleReset}
                  >
                    mise à jour recherche 
                  </button>{" "}
                </Row>

                <Row>
                  <div> choisir categorie </div>
                  <Form.Select
                    aria-label="Default select example"
                    value={searchCategory}
                    onChange={onChangeSearchCategory}
                  >
                    <option value={""}></option>
                    {options}
                  </Form.Select>
                </Row>
                <div></div>
                <Row>
                  <div> recherche par prix</div>
                  <div className="input-group mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search by price"
                      value={searchPrice}
                      onChange={onChangeSearchPrice}
                    />
                  </div>
                </Row>
                <Row>
                  <div> recherche par nom de produit </div>
                  <div className="input-group mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="search product"
                      value={searchProductName}
                      onChange={onChangeSearchProductName}
                    />
                  </div>{" "}
                </Row>
              </Row>
            </Col>

            <br></br>
            <Col>
              <Row>
                {products.map((products, k) => (
                  <ProductItem
                    k={k}
                    productName={products.productName}
                    category={products.category}
                    price={products.price}
                    averageScore={products.averageScore}
                    imageUrl={products.imageUrl}
                    id={products.id}
                  />
                ))}
              </Row>
            </Col>
          </Row>
          <br></br>
          <Row>
            <div className="col-md-12 list">
              <div className="mt-3">
                {"produits par page: "}
                <select onChange={handlePageSizeChange} value={pageSize}>
                  {pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <Pagination
                  className="mt-3"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </Row>
          <br></br>
          <Row> </Row>
        </Container>
      </div>
    );
  }
}
