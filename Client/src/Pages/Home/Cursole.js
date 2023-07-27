import React from "react";
import { Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "./ExampleCarouselImage";

function Cursole() {
  return (
    <>
      <div className="container-fluid ">
        <Row>
          <div className="col-12">
            <Carousel fade  >
              <Carousel.Item interval={1000}>
                <ExampleCarouselImage text="First slide" imagepath="https://as1.ftcdn.net/v2/jpg/05/88/37/30/1000_F_588373020_tv3j0uZypbhjG3x128g0j9GVUjrmWAzJ.jpg" />
                <Carousel.Caption>
                  <h3></h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <ExampleCarouselImage text="Second slide" imagepath ="https://as1.ftcdn.net/v2/jpg/05/28/55/64/1000_F_528556475_t2dqeDjIJnLGv35zNzxXPLCnzS7n6mTX.jpg" />
                <Carousel.Caption>
                  <h3></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <ExampleCarouselImage text="Third slide" imagepath="https://as2.ftcdn.net/v2/jpg/05/69/68/91/1000_F_569689191_mgAr4T6psu6lHh6h5kqiXmmflvktjFE6.jpg" />
                <Carousel.Caption>
                  <h3></h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Cursole;
