import React, {useState} from "react";
import {Form, Link, NavLink, useActionData, useRevalidator} from "react-router-dom";
import {
  deleteDataById,
  getOutwordDataByDate,
  getOutwordDataByDepartment,
  getOutwordDataByTeacherName,
} from "../_lib/lib";
import toast from "react-hot-toast";

export default function OutwordData() {
  const [searchType, setSearchType] = useState("text");

  const filteredData = useActionData();
  const revalidator = useRevalidator();

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to download CSV file
  const handleDownloadCSV = () => {
    const csvContent = [
      ["SR NO", "Item Name", "Quantity", "Date"],
      ...filteredData.map((row, index) => [
        index + 1,
        row.item,
        row.quantity,
        row.date,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "outward_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    const getReponce = confirm("you want to delete this entry?");
    if (getReponce) {
      await deleteDataById(id);
      toast("delete successfully", {
        icon: "👍👍",
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
          fontSize: 20,
          width: "20%",
          fontWeight: "500",
          borderRadius: 50,
        },
      });
      revalidator.revalidate();
    }
  }

  return (
    <div className="main-content">
      <div className="section">
        <div className="row">
          <div className="container">
            <div className="card p-3 shadow">
              <h4 className="text-center mb-3">Search Items By</h4>
              <Form method={"POST"}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="search-element ">
                      <select
                        onChange={(e) => setSearchType(e.target.value)}
                        className={
                          "col-md-2 text-center p-2 font-15 form-control"
                        }
                      >
                        <option value={`text`}>Name</option>
                        <option value={`date`}>Date</option>
                        <option value={`department`}>Department</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <input
                      type={searchType}
                      className="form-control"
                      name={searchType}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Search Items
                  </button>
                </div>
              </Form>
            </div>

            {/* Buttons */}
            <div className="mt-3  ml-2 justify-content-between">
              <button
                className="btn btn-primary btn-sm shadow ml-2"
                onClick={handlePrint}
              >
                Print
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-success btn-sm shadow"
                onClick={handleDownloadCSV}
              >
                CSV
              </button>
            </div>

            {/* Table */}
            <div className="mt-4">
              <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SR NO</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    {/*<th scope="col">Mobile No</th>*/}
                    <th scope="col">Date</th>
                    {/*<th scope="col">Status</th>*/}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length > 0 ? (
                    filteredData?.map((row, index) => (
                      <tr key={row.id}>
                        <th>{index + 1}</th>
                        <td>{row.productName}</td>
                        <td>{row.productQuantity}</td>
                        {/*<td>{row.teacherName}</td>*/}
                        <td>{row.date}</td>

                        <td>
                          <Link to={`${row.id}`}>
                            <button className="btn btn-primary"> Edit</button>
                          </Link>
                          &nbsp; &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(row.id)}
                          >
                            {" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-danger">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const res = await request.formData();
  let data = Object.fromEntries(res);
  console.log(data);

  let name = data.text;
  let date = data.date;
  let department = data.department;

  console.log(name);
  console.log(date);
  console.log(department);

  if (date) {
    data = data.date.split("-");

    //  to reverce a date

    let newData = "";
    for (let i = data.length - 1; i >= 0; i--) {
      newData += data[i] + "/";
    }
    newData = newData.slice(0, newData.length - 1);

    const listOfData = await getOutwordDataByDate(newData);
    return listOfData.data;
  }
  if (name) {
    const listOfData = await getOutwordDataByTeacherName(name);
    console.log(listOfData.data);
    return listOfData.data;
  }
  if (department) {
    const listOfData = await getOutwordDataByDepartment(department);
    console.log(listOfData.data);
    return listOfData.data;
  }

  return null;
}