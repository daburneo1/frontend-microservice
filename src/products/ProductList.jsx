import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./Product.jsx";
import ProductH from "./ProductH.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount.jsx";
import { fetchProducts, fetchProductById } from "../hooks/useProducts.js";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const disponibilidad = ["Disponible", "No disponible"];

function FilterMenuLeft({ minPrice, setMinPrice, maxPrice, setMaxPrice, applyFilters, availability, setAvailability }) {
  return (
      <Box>
        <Typography variant="h5">Disponibilidad</Typography>
        <Box>
          {disponibilidad.map((v, i) => (
              <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                        checked={availability.includes(v)}
                        onChange={() => setAvailability(v)}
                    />
                  }
                  label={v}
              />
          ))}
        </Box>
        <Typography variant="h5">Price Range</Typography>
        <Box>
          <TextField
              label="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              fullWidth
              margin="normal"
          />
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply
          </Button>
        </Box>
      </Box>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, lastPage: 1 });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(pagination.page, 9)
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
            setFilteredProducts(data);
          } else if (data && Array.isArray(data.data)) {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setPagination({ page: data.meta.page, lastPage: data.meta.lastPage });
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
  }, [pagination.page]);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  function goToPage(page) {
    setPagination((prev) => ({ ...prev, page }));
  }

  function applyFilters() {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    const filtered = products.filter((product) => {
      const priceMatch = product.price >= min && product.price <= max;
      const availabilityMatch =
          availability.length === 0 ||
          (availability.includes("Disponible") && product.available) ||
          (availability.includes("No disponible") && !product.available);
      return priceMatch && availabilityMatch;
    });
    setFilteredProducts(filtered);
  }

  function searchProductById() {
    fetchProductById(searchId)
        .then((data) => {
          if (data) {
            setFilteredProducts([data]);
          } else {
            console.error("Product not found");
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
  }

  function handleProductClick(product) {
    navigate(`/products/${product.id}`, { state: { product } });
  }

  return (
      <Container>
        <ScrollToTopOnMount />
        <Box component="nav" aria-label="breadcrumb" sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
          <Typography component="ol" className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/products" replace>
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cases &amp; Covers
            </li>
          </Typography>
        </Box>

        <Grid container spacing={3} className="mb-3 d-block d-lg-none">
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Filter Products</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FilterMenuLeft
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    applyFilters={applyFilters}
                    availability={availability}
                    setAvailability={(value) => {
                      setAvailability((prev) => {
                        if (prev.includes(value)) {
                          return prev.filter((item) => item !== value);
                        } else {
                          return [...prev, value];
                        }
                      });
                    }}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mb-4 mt-lg-3">
          <Grid item lg={3} className="d-none d-lg-block">
            <Box className="border rounded shadow-sm">
              <FilterMenuLeft
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  applyFilters={applyFilters}
                  availability={availability}
                  setAvailability={(value) => {
                    setAvailability((prev) => {
                      if (prev.includes(value)) {
                        return prev.filter((item) => item !== value);
                      } else {
                        return [...prev, value];
                      }
                    });
                  }}
              />
            </Box>
          </Grid>
          <Grid item lg={9}>
            <Box className="d-flex flex-column h-100">
              <Grid container spacing={2} className="mb-3">
                <Grid item lg={9} xl={5} className="offset-xl-4 d-flex flex-row">
                  <TextField
                      label="Search products by id"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      fullWidth
                  />
                  <Button variant="outlined" color="primary" onClick={searchProductById}>
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </Button>
                  <Button variant="outlined" color="primary" onClick={changeViewType} className="ms-2 d-none d-lg-inline">
                    <FontAwesomeIcon icon={["fas", viewType.grid ? "th-list" : "th-large"]} />
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mb-4 flex-shrink-0">
                {filteredProducts.map((product, i) => (
                    <Grid item key={i} xs={12} md={6} lg={viewType.grid ? 4 : 6}>
                      {viewType.grid ? (
                          <Product product={product} onClick={() => handleProductClick(product)} />
                      ) : (
                          <ProductH product={product} onClick={() => handleProductClick(product)} />
                      )}
                    </Grid>
                ))}
              </Grid>
              <Box className="d-flex align-items-center mt-auto">
                <Typography className="text-muted small d-none d-md-inline">
                  Showing {filteredProducts.length} of {pagination.total}
                </Typography>
                <Pagination
                    count={pagination.lastPage}
                    page={pagination.page}
                    onChange={(e, page) => goToPage(page)}
                    className="ms-auto"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
}

export default ProductList;