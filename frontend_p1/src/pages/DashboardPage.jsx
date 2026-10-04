import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./DashboardPage.css";

function DashboardPage() {

  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalOrnaments: 0,
    pendingPayments: 0
  });

  const [lowStockCount, setLowStockCount] =
    useState(0);

  const [showRateModal, setShowRateModal] =
    useState(false);

  const [goldRates, setGoldRates] =
    useState({
      id: 1,
      gold22: 0,
      gold24: 0,
      silver: 0,
      yesterdayGold22: 0
    });

  const images = [
    "/jwellery.jpg",
    "/necklace.jpg",
    "/Bangles.jpg"
  ];

  const [currentImage, setCurrentImage] =
    useState(0);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = () => {

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/dashboard/summary`
      )
      .then((response) => {

        setSummary(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/ornaments/low-stock`
      )
      .then((response) => {

        setLowStockCount(
          response.data.length
        );

      })
      .catch((error) => {

        console.log(error);

      });

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/goldrates`
      )
      .then((response) => {

        setGoldRates(
          response.data
        );

      })
      .catch((error) => {

        console.log(error);

      });

  };

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentImage((prev) =>
          prev === images.length - 1
            ? 0
            : prev + 1
        );

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  const saveRates = () => {

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/goldrates`,
        goldRates
      )
      .then(() => {

        alert(
          "Rates Updated Successfully"
        );

        setShowRateModal(false);

        loadDashboard();

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const trendValue =
    (goldRates.gold22 || 0) -
    (goldRates.yesterdayGold22 || 0);

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="premium-header">

        <div className="header-left">

          <img
            src="/LOGO.png"
            alt="ABC Jewellers"
            className="premium-logo"
          />

          <div>

            <h1 className="premium-title">
              ABC REDDY JEWELLERS
            </h1>

            <p className="premium-subtitle">
              Since 2004 • Trusted Jewellery Destination
            </p>

          </div>

        </div>

        <div className="header-contact">

          <span>
            📍 Main Road, Cumbum
          </span>

          <span>
            📞 +91 9866881191
          </span>

          <span>
            ✉ abcreddyjewellers@gmail.com
          </span>

        </div>

      </div>

      {/* GOLD RATE + TREND */}

      <div className="rate-trend-row">

        <div className="rate-card">

          <div className="rate-header">

            <h2>
              Today's Gold & Silver Rate
            </h2>

            <button
              className="edit-rate-btn"
              onClick={() =>
                setShowRateModal(true)
              }
            >
              ✏ Edit
            </button>

          </div>

          <div className="rate-item">
            22K Gold :
            ₹ {goldRates.gold22}
            / gram
          </div>

          <div className="rate-item">
            24K Gold :
            ₹ {goldRates.gold24}
            / gram
          </div>

          <div className="rate-item">
            Silver :
            ₹ {goldRates.silver}
            / gram
          </div>

        </div>

        <div className="trend-card">

          <h2>
            Gold Trend
          </h2>

          <div className="trend-up">

             +{trendValue}

            <span>
              Today
            </span>

          </div>

          <div className="trend-down">

            -
            {Math.floor(
              trendValue / 2
            )}

            <span>
              Yesterday
            </span>

          </div>

        </div>

      </div>
            {/* LARGE SLIDER */}

      <div className="premium-slider">

        <img
          src={images[currentImage]}
          alt="Jewellery"
          className="premium-slider-image"
        />

      </div>

      {/* REPORTS SUMMARY */}

      <div className="reports-card">

        <h2 className="reports-title">
          Reports Summary
        </h2>

        <div className="report-item">

          <span>
            👥 Total Customers
          </span>

          <strong>
            {summary.totalCustomers}
          </strong>

        </div>

        <div className="report-item">

          <span>
            💍 Total Ornaments
          </span>

          <strong>
            {summary.totalOrnaments}
          </strong>

        </div>

        <div className="report-item">

          <span>
            💰 Pending Payments
          </span>

          <strong>
            {summary.pendingPayments}
          </strong>

        </div>

        <div className="report-item">

          <span>
            ⚠ Low Stock Items
          </span>

          <strong>
            {lowStockCount}
          </strong>

        </div>

      </div>

      {/* EDIT RATE MODAL */}

      <Modal
        show={showRateModal}
        onHide={() =>
          setShowRateModal(false)
        }
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Update Gold Rates
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <input
            type="number"
            className="form-control mb-3"
            placeholder="22K Gold Rate"
            value={goldRates.gold22}
            onChange={(e) =>
              setGoldRates({
                ...goldRates,
                gold22: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="24K Gold Rate"
            value={goldRates.gold24}
            onChange={(e) =>
              setGoldRates({
                ...goldRates,
                gold24: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Silver Rate"
            value={goldRates.silver}
            onChange={(e) =>
              setGoldRates({
                ...goldRates,
                silver: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control"
            placeholder="Yesterday Gold Rate"
            value={
              goldRates.yesterdayGold22
            }
            onChange={(e) =>
              setGoldRates({
                ...goldRates,
                yesterdayGold22:
                  e.target.value
              })
            }
          />

        </Modal.Body>

        <Modal.Footer>

          <button
            className="save-rate-btn"
            onClick={saveRates}
          >
            Save Rates
          </button>

        </Modal.Footer>

      </Modal>

      {/* FOOTER */}

      <div className="premium-footer">

        <h4>
          ABC REDDY JEWELLERS
        </h4>

        <p>
          Crafting memories in gold,
          one masterpiece at a time.
        </p>

        <span>
          © All Rights Reserved
        </span>

      </div>

    </div>

  );

}

export default DashboardPage;