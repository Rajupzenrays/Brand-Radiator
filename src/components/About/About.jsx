import React, { useEffect, useState } from "react";
import "./style.css";
const About = () => {
  const [photo, setPhoto] = useState(
    "https://brandradiator.sirv.com/Images/himani.jpg"
  );
  const [text, setText] = useState("This is replaced by api's text");
  const parser = new DOMParser();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://api.unsplash.com/photos/random/?client_id=6fK7rcTJ89zf8X95DpUFDjic6XvJ1xAQyePkYMC7FDI&id=Dwu85P9SOIk&w=1500",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setPhoto(result.urls.raw))
      .catch((error) => console.log("error", error));
  }, [photo]);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=dajps3gevm6ua1f756ijtmlr2v");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://loripsum.net/api/2/short", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setText(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  console.log("photo--->", photo);
  return (
    <>
      <div className="about_container">
        <div className="who_we_are">
          <h2>Who We Are</h2>
          <p>{text.replace(/<\/?p>/gi, "")}</p>
        </div>
        <div className="about_us">
          <h2>What People Say About Us</h2>
          <p>{text.replace(/<\/?p>/gi, "")}</p>
        </div>
        <div className="our_founders">
          <h2>Our Founders</h2>
          <div className="inside_founder">
            <img
              src={photo}
              alt="photo"
              height={"100px"}
              width={"100px"}
              style={{ borderRadius: "50%" }}
            />
            <span style={{ fontWeight: "bold" }}>Himani</span>
            <p>{text.replace(/<\/?p>/gi, "")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
