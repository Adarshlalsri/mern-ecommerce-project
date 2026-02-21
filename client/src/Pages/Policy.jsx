import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title='privacy policy'>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and
            protect your data when you visit or make a purchase from our
            website.
          </p>

          <h5>Contact Us</h5>
          <p>
            If you have any questions regarding our privacy practices, please
            contact us at: <br />
            📧 support@yourecommerce.com
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
