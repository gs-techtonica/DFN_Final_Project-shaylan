import * as React from "react";

const Filter = (props) => {
  return (
    <form class="form-check">
      <div>
        <label class="form-check-label" for="inlineRadio1">
          Food
          <input
            class="form-check-input px-40"
            type="radio"
            name="ProductOption"
            id="Option1"
            value="1"
            onChange={(e) => props.setCheckedProduct(e.currentTarget.value)}
          />
        </label>
        <label class="form-check-label" for="inlineRadio2">
          Consumer Goods
          <input
            class="form-check-input"
            type="radio"
            name="ProductOption"
            id="Option2"
            value="2"
            onChange={(e) => props.setCheckedProduct(e.currentTarget.value)}
          />
        </label>
      </div>
    </form>
  );
};

export default Filter;
