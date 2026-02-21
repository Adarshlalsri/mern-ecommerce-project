import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import Categoryform from "../../components/Forms/Categoryform";
import { useAuth } from "../../context/auth";
import { Modal  } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [Visible,setVisible] = useState(false);
  const[updatedName, setUpdatedName] = useState("");
  const[selected,setSelected]=useState(null);
  const [auth] = useAuth(); // Get auth from context

  //Hnadle form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        {
          name: name,
        },
        {
          headers: {
            Authorization: auth?.token, // Include token in headers
          },
        }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // getAllCategories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //update category
  const handleUpdate = async(e)=>{
    e.preventDefault();
   try {
    const { data } = await axios.put(
      `/api/v1/category/update-category/${selected._id}`,
      { name: updatedName },
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    if (data?.success) {
      toast.success(`${updatedName} updated successfully`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while updating category");
  }
  };

// ✅ Delete category function
const handleDelete = async (cId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${cId}`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    if (data?.success) {
      toast.success("Category deleted successfully");
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while deleting category");
  }
};


  

  return (
    <Layout title={"Dashboard - create category"}>
      <div className="container-fluid py-5 px-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <Categoryform
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div className="my-3 w-75">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {categories?.map((c, index) => (
                    <tr key={c._id}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>

                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c);}}>Edit</button>
                         <button className="btn btn-danger ms-3" onClick={() => handleDelete(c._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              {/* ✅ Ant Design Modal */}
  <Modal
    title="Edit Category"
    onCancel={() => setVisible(false)}
    footer={null}
    open={Visible}
  >
    <Categoryform
    value={updatedName}
    setValue={setUpdatedName}
    handleSubmit={handleUpdate}
  />
  </Modal>
          </div>
         
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
