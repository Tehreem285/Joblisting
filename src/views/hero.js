import React from "react";
import { CardImg, CardImgOverlay, Card, CardTitle, CardText } from "reactstrap";

const Hero = () => {
  return (
    <>
      <div>
        <Card inverse>
          <div style={{ position: "relative" }}>
            {/* Background Image */}
            <CardImg
              alt="Card image cap"
              src="/images/hero.jpg"
              style={{
                height: 600,
                width: "100%",
                objectFit: "cover",
              }}
            />
            {/* Dark Overlay with Opacity */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.5, // controls image darkness
              }}
            ></div>
            {/* Overlay Text */}
            <CardImgOverlay>
              <CardTitle  className="text-center mt-5 pt-4">
                <h1>
                Welcome to JobsHub!                
                </h1>
              </CardTitle>
              <CardText className="mt-3">
                <h5 className="text-center">
                  Building this page for practice purpose. Main focus is to make grip on firebase concepts.               
                </h5>
              </CardText>
            </CardImgOverlay>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Hero;
