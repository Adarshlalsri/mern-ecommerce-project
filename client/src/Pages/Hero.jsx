// import React, { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Hero = () => {
//   return (
//     <Carousel style={{ height: "500px" }}>
//       <Carousel.Item style={{ height: "500px" }}>
//         <img
//           className="d-block w-100"
//           src="/images/Ban1.jpg"
//           alt="First slide"
//           style={{
//             height: "500px",
//             objectFit: "cover",
//           }}
//         />
//         <Carousel.Caption>
//           <h5>First slide label</h5>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="/images/Ban2.jpg"
//           alt="Second slide"
//           style={{
//             height: "500px",
//             objectFit: "cover",
//           }}
//         />
//         <Carousel.Caption>
//           <h5>Second slide label</h5>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="/images/Ban4.jpg"
//           alt="Third slide"
//           style={{
//             height: "500px",
//             objectFit: "cover",
//           }}
//         />
//         <Carousel.Caption>
//           <h5>Third slide label</h5>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default Hero;

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css"; // 👈 custom css

const Hero = () => {
  return (
    <Carousel className="hero-carousel">
      <Carousel.Item>
        <img src="/images/Ban1.jpg" alt="First slide" className="hero-img" />
        <Carousel.Caption className="hero-caption">
          <h1>The Next Generation</h1>
          <p>Watch Collection</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="/images/Ban2.jpg" alt="Second slide" className="hero-img" />
        <Carousel.Caption className="hero-caption">
          <h1>Premium Watches</h1>
          <p>Luxury & Style</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src="/images/Ban4.jpg" alt="Third slide" className="hero-img" />
        <Carousel.Caption className="hero-caption">
          <h1>Timeless Design</h1>
          <p>Crafted Excellence</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
