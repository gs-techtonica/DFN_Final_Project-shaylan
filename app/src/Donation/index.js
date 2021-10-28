import * as React from "react";

import "./donationform.css";
import useApi from "../auth/useApi";

const Donation = () => {
  const { loading, apiClient } = useApi();
  // const [carrier_name, setCarrierName] = React.useState("");
  // const [donation_site_name, setDonationSiteName] = React.useState("");
  // const [product_owner, setProductOwner] = React.useState("");
  // const [product_type_id, setProductType] = React.useState("");
  // const [lbs, setPounds] = React.useState("");
  // const [date, setDate] = React.useState("");

  const addADonation = async (donation) => apiClient.addDonation(donation);

  //   const canAdd = carrier_name !== "";

  const onSubmit = (e) => {
    const form = e.currentTarget;
    const {
      carrier_name: { value: carrier_name },
      donation_site_name: { value: donation_site_name },
      product_owner: { value: product_owner },
      product_type_id: { value: product_type_id },
      lbs: { value: lbs },
      date: { value: date },
    } = form.elements;

    e.preventDefault();
    addADonation({
      carrier_name,
      donation_site_name,
      product_owner,
      product_type_id,
      lbs,
      date,
    });
    form.reset();
  };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     if (canAdd) {
  //       addDonation(
  //         carrier_name,
  //         donation_site_name,
  //         product_owner,
  //         product_type_id,
  //         lbs,
  //         date,
  //       );
  //     }
  //   };

  return loading ? null : (
    <div className="formpage">
      <form onSubmit={onSubmit}>
        <div className="formcontent">
          <label>
            Carrier Name: <input type="integer" name="carrier_name" />
          </label>
          <label>
            Donation Site: <input type="text" name="donation_site_name" />
          </label>
          <label>
            Product Owner Name: <input type="text" name="product_owner" />
          </label>
          <label htmlFor="healthy">Product Type: </label>
          <select id="product_type_id" name="product_type_id">
            <option value="1">Food</option>
            <option value="2">Consumer Packaged Goods</option>
          </select>
          <label>
            Lbs of goods: <input type="integer" name="lbs" />
          </label>
          <label>
            Today's Date: <input type="date" name="date" />
          </label>

          <button>Add</button>
        </div>
      </form>
    </div>
  );
};
export default Donation;
