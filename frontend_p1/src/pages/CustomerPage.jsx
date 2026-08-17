import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./CustomerPage.css";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  const [searchPhone, setSearchPhone] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [customer, setCustomer] = useState({
    customerId: "",
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    axios
      .get("http://localhost:9866/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveCustomer = () => {
    axios
      .post("http://localhost:9866/customers", customer)
      .then(() => {
        alert("Customer Saved Successfully");
        setShowModal(false);
        loadCustomers();

        setCustomer({
          customerId: "",
          name: "",
          phone: "",
          address: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCustomer = () => {
    axios
      .put(
        `http://localhost:9866/customers/${editId}`,
        customer
      )
      .then(() => {
        alert("Customer Updated Successfully");
        setShowModal(false);
        loadCustomers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCustomer = (customerData) => {
    setCustomer(customerData);
    setEditId(customerData.customerId);
    setEditMode(true);
    setShowModal(true);
  };

  const deleteCustomer = (id) => {
    if (!window.confirm("Delete this customer?")) return;

    axios
      .delete(`http://localhost:9866/customers/${id}`)
      .then(() => {
        alert("Customer Deleted Successfully");
        loadCustomers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchCustomer = () => {
    axios
      .get(
        `http://localhost:9866/customers/phone/${searchPhone}`
      )
      .then((response) => {
        setCustomers(response.data);
      })
      .catch(() => {
        alert("Customer Not Found");
      });
  };
  const searchCustomerById = () => {

  axios
    .get(`http://localhost:9866/customers/${searchId}`)
    .then((response) => {

      setCustomers(response.data);

    })
    .catch(() => {

      alert("Customer Not Found");

    });

};

const searchCustomerByName = () => {

  axios
    .get(`http://localhost:9866/customers/name/${searchName}`)
    .then((response) => {

      setCustomers(response.data);

    })
    .catch(() => {

      alert("Customer Not Found");

    });

};

  return (
    <div className="customer-page">

      
     <div className="customer-header">

  <h1 className="customer-title">
    Customers
  </h1>

  <button
    className="add-btn"
    onClick={() => {

      setEditMode(false);

      setCustomer({
        customerId: "",
        name: "",
        phone: "",
        address: ""
      });

      setShowModal(true);

    }}
  >
    + Add Customer
  </button>

</div>

<div className="search-card">

  <h4 className="mb-4">
    Search Customer
  </h4>

  <div className="search-grid">

    <div>

      <label className="search-label">
        Search By ID
      </label>

      <div className="search-row">

        <input
          className="form-control"
          placeholder="Customer ID"
          value={searchId}
          onChange={(e) =>
            setSearchId(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={searchCustomerById}
        >
          Search
        </button>

      </div>

    </div>

    <div>

      <label className="search-label">
        Search By Name
      </label>

      <div className="search-row">

        <input
          className="form-control"
          placeholder="Customer Name"
          value={searchName}
          onChange={(e) =>
            setSearchName(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={searchCustomerByName}
        >
          Search
        </button>
        

      </div>

    </div>

    <div>

      <label className="search-label">
        Search By Phone
      </label>

      <div className="search-row">

        <input
          className="form-control"
          placeholder="Phone Number"
          value={searchPhone}
          onChange={(e) =>
            setSearchPhone(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={searchCustomer}
        >
          Search
        </button>
        <button
  className="show-all-btn"
  onClick={() => {
    loadCustomers();
    setSearchResult(null);
  }}
>
  Show All Customers
</button>

      </div>

    </div>

  </div>

</div>
        

       
        

      

      
      {searchResult && (
        <div className="search-result">

          <h5>Customer Found</h5>

          <p>
            <b>ID :</b> {searchResult.customerId}
          </p>

          <p>
            <b>Name :</b> {searchResult.name}
          </p>

          <p>
            <b>Phone :</b> {searchResult.phone}
          </p>

          <p>
            <b>Address :</b> {searchResult.address}
          </p>

        </div>
      )}

      <div className="table-card">

        <table className="table customer-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer) => (
              <tr key={customer.customerId}>

                <td>{customer.customerId}</td>

                <td>{customer.name}</td>

                <td>{customer.phone}</td>

                <td>{customer.address}</td>

                <td>

                  <button
  className="edit-btn"
  onClick={() => editCustomer(customer)}
>
  ✏ Edit
</button>

                  <button
  className="delete-btn"
  onClick={() => deleteCustomer(customer.customerId)}
>
  🗑 Delete
</button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>

          <Modal.Title>

            {editMode
              ? "Update Customer"
              : "Add Customer"}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <input
            className="form-control mb-3"
            placeholder="Customer ID"
            value={customer.customerId}
            disabled={editMode}
            onChange={(e) =>
              setCustomer({
                ...customer,
                customerId: e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({
                ...customer,
                phone: e.target.value
              })
            }
          />

          <input
            className="form-control"
            placeholder="Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({
                ...customer,
                address: e.target.value
              })
            }
          />

        </Modal.Body>

        <Modal.Footer>

          {editMode ? (
            <button
              className="add-btn"
              onClick={updateCustomer}
            >
              Update Customer
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={saveCustomer}
            >
              Save Customer
            </button>
          )}

        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default CustomerPage;