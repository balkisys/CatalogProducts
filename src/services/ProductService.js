import http from "../httpComon";
const getAllProducts = (params) => {
  return http.get("/products", { params });
};
const getProductDetails = (id) => {
 return http.get(`/products/${id}`);
}
// other CRUD methods
export default {
  getAllProducts,
  getProductDetails,
};
