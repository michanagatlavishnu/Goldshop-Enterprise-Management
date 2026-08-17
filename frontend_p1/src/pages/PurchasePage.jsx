import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./PurchasePage.css";

function PurchasePage() {

  const [purchases, setPurchases] = useState([]);

  const [customersMap, setCustomersMap] = useState({});

  const [ornamentsMap, setOrnamentsMap] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  const [searchPurchaseId, setSearchPurchaseId] =
    useState("");

  const [purchase, setPurchase] = useState({
    purchaseId: "",
    customerId: "",
    ornamentId: "",
    totalCost: "",
    paidAmount: "",
    balanceAmount: "",
    purchaseDate: ""
  });

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = () => {

    axios
      .get("http://localhost:9866/purchases")
      .then(async (response) => {

        const purchaseData = response.data;

        setPurchases(purchaseData);

        const customerTemp = {};

        const ornamentTemp = {};

        for (const item of purchaseData) {

          try {

            const customerRes =
              await axios.get(
                `http://localhost:9866/customers/${item.customerId}`
              );

            customerTemp[item.customerId] =
              customerRes.data.name;

          } catch {

            customerTemp[item.customerId] =
              `Customer ${item.customerId}`;
          }

          try {

            const ornamentRes =
              await axios.get(
                `http://localhost:9866/ornaments/${item.ornamentId}`
              );

            ornamentTemp[item.ornamentId] =
              ornamentRes.data.ornamentName;

          } catch {

            ornamentTemp[item.ornamentId] =
              `Ornament ${item.ornamentId}`;
          }

        }

        setCustomersMap(customerTemp);

        setOrnamentsMap(ornamentTemp);

      })
      .catch((error) => {
        console.log(error);
      });

  };

  const resetForm = () => {

    setPurchase({
      purchaseId: "",
      customerId: "",
      ornamentId: "",
      totalCost: "",
      paidAmount: "",
      balanceAmount: "",
      purchaseDate: ""
    });

    setEditMode(false);

    setEditId(null);

  };

  const calculateBalance = (
    total,
    paid
  ) => {

    const totalValue =
      parseFloat(total) || 0;

    const paidValue =
      parseFloat(paid) || 0;

    return totalValue - paidValue;

  };

  const savePurchase = () => {

    axios
      .post(
        "http://localhost:9866/purchases",
        purchase
      )
      .then(() => {

        alert(
          "Purchase Saved Successfully"
        );

        setShowModal(false);

        loadPurchases();

        resetForm();

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const updatePurchase = () => {

    axios
      .put(
        `http://localhost:9866/purchases/${editId}`,
        purchase
      )
      .then(() => {

        alert(
          "Purchase Updated Successfully"
        );

        setShowModal(false);

        loadPurchases();

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const deletePurchase = (id) => {

    if (
      !window.confirm(
        "Delete this purchase?"
      )
    )
      return;

    axios
      .delete(
        `http://localhost:9866/purchases/${id}`
      )
      .then(() => {

        alert(
          "Purchase Deleted Successfully"
        );

        loadPurchases();

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const editPurchase = (data) => {

    setPurchase(data);

    setEditId(data.purchaseId);

    setEditMode(true);

    setShowModal(true);

  };

  const searchPurchase = () => {

    if (
      !searchPurchaseId.trim()
    ) {
      loadPurchases();
      return;
    }

    axios
      .get(
        `http://localhost:9866/purchases/${searchPurchaseId}`
      )
      .then((response) => {

        setPurchases([
          response.data
        ]);

      })
      .catch(() => {

        alert(
          "Purchase Not Found"
        );

      });

  };
    return (
    <div className="purchase-page">

      <div className="purchase-header">

        <h1 className="purchase-title">
          Purchases
        </h1>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Purchase
        </button>

      </div>

      <div className="search-card">

        <h4 className="mb-3">
          Search Purchase
        </h4>

        <div className="search-row">

          <input
            className="form-control"
            placeholder="Purchase ID"
            value={searchPurchaseId}
            onChange={(e) =>
              setSearchPurchaseId(
                e.target.value
              )
            }
          />

          <button
            className="search-btn"
            onClick={searchPurchase}
          >
            Search
          </button>

          <button
            className="show-all-btn"
            onClick={loadPurchases}
          >
            Show All
          </button>

        </div>

      </div>

      <div className="table-card">

        <table className="table purchase-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Customer</th>

              <th>Ornament</th>

              <th>Total</th>

              <th>Paid</th>

              <th>Balance</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {purchases.map((item) => (

              <tr
                key={item.purchaseId}
              >

                <td>
                  {item.purchaseId}
                </td>

                <td>
                  {customersMap[
                    item.customerId
                  ] || item.customerId}
                </td>

                <td>
                  {ornamentsMap[
                    item.ornamentId
                  ] || item.ornamentId}
                </td>

                <td>
                  ₹ {item.totalCost}
                </td>

                <td>
                  ₹ {item.paidAmount}
                </td>

                <td>
                  ₹ {item.balanceAmount}
                </td>

                <td>
                  {item.purchaseDate}
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editPurchase(item)
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deletePurchase(
                        item.purchaseId
                      )
                    }
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
        onHide={() =>
          setShowModal(false)
        }
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>

            {editMode
              ? "Update Purchase"
              : "Add Purchase"}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <input
            className="form-control mb-3"
            placeholder="Purchase ID"
            value={purchase.purchaseId}
            disabled={editMode}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                purchaseId:
                  e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Customer ID"
            value={purchase.customerId}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                customerId:
                  e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Ornament ID"
            value={purchase.ornamentId}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                ornamentId:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Total Cost"
            value={purchase.totalCost}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                totalCost:
                  e.target.value,
                balanceAmount:
                  calculateBalance(
                    e.target.value,
                    purchase.paidAmount
                  )
              })
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Paid Amount"
            value={purchase.paidAmount}
            onChange={(e) =>
              setPurchase({
                ...purchase,
                paidAmount:
                  e.target.value,
                balanceAmount:
                  calculateBalance(
                    purchase.totalCost,
                    e.target.value
                  )
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Balance Amount"
            value={
              purchase.balanceAmount
            }
            readOnly
          />

          <input
            type="date"
            className="form-control"
            value={
              purchase.purchaseDate
            }
            onChange={(e) =>
              setPurchase({
                ...purchase,
                purchaseDate:
                  e.target.value
              })
            }
          />

        </Modal.Body>

        <Modal.Footer>

          {editMode ? (

            <button
              className="add-btn"
              onClick={
                updatePurchase
              }
            >
              Update Purchase
            </button>

          ) : (

            <button
              className="add-btn"
              onClick={
                savePurchase
              }
            >
              Save Purchase
            </button>

          )}

        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default PurchasePage;