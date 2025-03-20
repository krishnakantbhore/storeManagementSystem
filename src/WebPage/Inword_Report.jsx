import React  from "react";
import { Form, NavLink, useActionData } from "react-router-dom";
import { getInwordReport } from "../_lib/lib";

export default function SearchableTable() {
  const filteredData = useActionData();

  return (
    <div className="main-content">
      <div className="section">
        <div className="row ">
          <div className="container ">
            {/* 🔹 Search Bar */}
            <div className="card p-3 shadow">
              <h4 className="text-center mb-3">Search Items</h4>

              <Form method={"POST"}>
                <div className="row">
                  <div className="col-md-6">
                    <input type="date" className="form-control" name={"date"} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Search Items
                  </button>
                </div>
              </Form>
            </div>

            {/* 🔹 Table */}
            <div className="mt-4">
              <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SR NO</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Date</th>
                    {/*<th>Status</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length > 0 ? (
                    filteredData?.map((row, index) => (
                      <tr key={row.id}>
                        <th>{index + 1}</th>
                        <td>{row.stockName}</td>
                        <td>{row.stockQuantity}</td>
                        <td>{row.date}</td>
                        {/*<td>*/}
                        {/*  <NavLink>*/}
                        {/*    <button className="btn btn-primary"> Edit</button>*/}
                        {/*  </NavLink>*/}
                        {/*  &nbsp; &nbsp;*/}

                        {/*    <button className="btn btn-danger"> Delete</button>*/}

                        {/*</td>*/}
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
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data = data.date.split("-");

  //  to reverce a date

  let newData = "";
  for (let i = data.length - 1; i >= 0; i--) {
    newData += data[i] + "/";
  }
  newData = newData.slice(0, newData.length - 1);
  console.log(newData);

  const res = await getInwordReport(newData);
  console.log(res.data);

  return res.data;
}
