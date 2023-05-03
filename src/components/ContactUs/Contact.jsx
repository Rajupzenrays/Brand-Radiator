import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Contact = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data-->", data);
    axios
      .post("http://localhost:8081/contactus", data)
      .then((res) => {
        console.log("res", res);
        if (res.data.Status == "Success") {
          setIsSubmit(true)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div>
          <img
            src="https://brandradiator.sirv.com/Images/service.jpg"
            alt="contact image"
            className="banner_img"
          />
        </div>
        <div>
          <div className="contact_container">
            <div className="title">
              <h2>
                <span>Reach</span>
                {"  "}
                <span>Us</span>
              </h2>
              <h3>Enter your details below to conquer your business goals</h3>
            </div>
            {!isSubmit ? <div className="container">
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={data.message}
                    onChange={(e) =>
                      setData({ ...data, message: e.target.value })
                    }
                    rows="3"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div> 
            : <div className="Submited_after">Submited SuccessFully</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
