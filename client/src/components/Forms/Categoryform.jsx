import React from "react";

const Categoryform = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <div>
      <form onSubmit={handleSubmit} className="w-75">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        </form>
      </div>
      
    </>
  );
};

export default Categoryform;
