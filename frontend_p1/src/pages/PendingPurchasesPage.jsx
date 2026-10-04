import { useEffect, useState } from "react";
import axios from '../api';
import "./PendingPurchasesPage.css";

function PendingPurchasesPage() {

  const [purchases, setPurchases] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [ornaments, setOrnaments] = useState([]);

  const [searchName, setSearchName] =
    useState("");

  useEffect(() => {

    loadPendingPurchases();

    axios
      .get(`/customers`)
      .then((response) =>
        setCustomers(response.data)
      );

    axios
      .get(`/ornaments`)
      .then((response) =>
        setOrnaments(response.data)
      );

  }, []);

  const loadPendingPurchases = () => {

    axios
      .get(
        `/purchases/pending`
      )
      .then((response) => {

        setPurchases(
          response.data
        );

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const searchByCustomerName = () => {

    axios
      .get(
        `/purchases/customer/${searchName}`
      )
      .then((response) => {

        setPurchases(
          response.data
        );

      })
      .catch(() => {

        alert(
          "No Purchases Found"
        );

      });

  };

  const getCustomerName = (id) => {

    const customer =
      customers.find(
        (c) =>
          c.customerId === id
      );

    return customer
      ? customer.name
      : id;

  };

  const getOrnamentName = (id) => {

    const ornament =
      ornaments.find(
        (o) =>
          o.ornamentId === id
      );

    return ornament
      ? ornament.ornamentName
      : id;

  };

  const getStatus = (balance) => {

    if (balance >= 30000)
      return "🔴 High Pending";

    if (balance >= 10000)
      return "🟡 Medium Pending";

    return "🟢 Low Pending";

  };

  return (

    <div className="pending-page">

      <div className="pending-header">

        <h1 className="pending-title">
          💰 Pending Payments
        </h1>

      </div>

      <div className="search-card">

        <h4>
          Search By Customer Name
        </h4>

        <div className="search-row">

          <input
            className="form-control"
            placeholder="Customer Name"
            value={searchName}
            onChange={(e) =>
              setSearchName(
                e.target.value
              )
            }
          />

          <button
            className="search-btn"
            onClick={
              searchByCustomerName
            }
          >
            Search
          </button>

          <button
            className="show-all-btn"
            onClick={
              loadPendingPurchases
            }
          >
            Show All
          </button>

        </div>

      </div>

      <div className="pending-grid">

        {purchases.map(
          (purchase) => (

            <div
              className="pending-card"
              key={
                purchase.purchaseId
              }
            >

              <h3>
                Purchase #
                {
                  purchase.purchaseId
                }
              </h3>

              <p>

                <strong>
                  Customer :
                </strong>

                {" "}

                {getCustomerName(
                  purchase.customerId
                )}

              </p>

              <p>

                <strong>
                  Ornament :
                </strong>

                {" "}

                {getOrnamentName(
                  purchase.ornamentId
                )}

              </p>

              <p>

                <strong>
                  Balance :
                </strong>

                ₹
                {
                  purchase.balanceAmount
                }

              </p>

              <p>

                <strong>
                  Date :
                </strong>

                {" "}

                {
                  purchase.purchaseDate
                }

              </p>

              <div className="status-badge">

                {getStatus(
                  purchase.balanceAmount
                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default PendingPurchasesPage;
