import { ReactElement } from "react";
import Carousel from "react-bootstrap/Carousel";
import jetClouds from "../../assets/dall-e-underbelly-jet-clouds.webp";
import cargoPlane from "../../assets/dall-e-cargo-plane.webp";
import weatherEquipment from "../../assets/dall-e-weather-equipment.webp";
import "../../styles/carousel.css";

/**
 * @description The component that holds the Carousel with weather/aviation
 * related images and hook captions for the HomePage.
 *
 * @returns {ReactElement} The HomePage Carousel.
 */
const HomeCarousel: React.FC = (): ReactElement => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={jetClouds}
          alt="First slide"
          height={"400px"}
        />
        <div className="carousel-gradient-overlay"></div>
        <Carousel.Caption>
          <h3 className="carousel-caption-text">Adaptability</h3>
          <p className="carousel-caption-text">
            Quickly react to ever-changing environments.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={cargoPlane}
          alt="Second slide"
          height={"400px"}
        />
        <div className="carousel-gradient-overlay"></div>
        <Carousel.Caption>
          <h3 className="carousel-caption-text">Capabilities</h3>
          <p className="carousel-caption-text">
            Serve a broad range of aircraft and missions.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={weatherEquipment}
          alt="Third slide"
          height={"400px"}
        />
        <div className="carousel-gradient-overlay"></div>
        <Carousel.Caption>
          <h3 className="carousel-caption-text">Dependency</h3>
          <p className="carousel-caption-text">
            Leverage a large number of resources in one place and focus on the
            essentials.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
