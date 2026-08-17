import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./OrnamentPage.css";

function OrnamentPage() {
  const [ornaments, setOrnaments] = useState([]);

  const [searchCategory, setSearchCategory] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  const [ornament, setOrnament] = useState({
    ornamentId: "",
    ornamentName: "",
    category: "",
    weight: "",
    stockAvailable: "",
    imageUrl: ""
  });

  useEffect(() => {
    loadOrnaments();
  }, []);

  const loadOrnaments = () => {
    axios
      .get("http://localhost:9866/ornaments")
      .then((response) => {
        setOrnaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveOrnament = () => {
    axios
      .post(
        "http://localhost:9866/ornaments",
        ornament
      )
      .then(() => {
        alert("Ornament Saved Successfully");

        setShowModal(false);

        loadOrnaments();

        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOrnament = () => {
    axios
      .put(
        `http://localhost:9866/ornaments/${editId}`,
        ornament
      )
      .then(() => {
        alert("Ornament Updated Successfully");

        setShowModal(false);

        loadOrnaments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOrnament = (id) => {
    if (
      !window.confirm(
        "Delete this ornament?"
      )
    )
      return;

    axios
      .delete(
        `http://localhost:9866/ornaments/${id}`
      )
      .then(() => {
        alert(
          "Ornament Deleted Successfully"
        );

        loadOrnaments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editOrnament = (data) => {
    setOrnament(data);

    setEditId(data.ornamentId);

    setEditMode(true);

    setShowModal(true);
  };

  const searchByCategory = () => {
    if (!searchCategory.trim()) {
      loadOrnaments();
      return;
    }

    axios
      .get(
        `http://localhost:9866/ornaments/category/${searchCategory}`
      )
      .then((response) => {
        setOrnaments(response.data);
      })
      .catch(() => {
        alert("No Ornaments Found");
      });
  };

  const resetForm = () => {
    setOrnament({
      ornamentId: "",
      ornamentName: "",
      category: "",
      weight: "",
      stockAvailable: "",
      imageUrl: ""
    });

    setEditMode(false);

    setEditId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setOrnament({
        ...ornament,
        imageUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };
    return (
    <div className="ornament-page">

      <div className="ornament-header">

        <h1 className="ornament-title">
          Ornaments
        </h1>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Ornament
        </button>

      </div>

      <div className="search-card">

        <h4 className="mb-3">
          Search Ornament By Category
        </h4>

        <div className="search-row">

          <input
            className="form-control"
            placeholder="Enter Category"
            value={searchCategory}
            onChange={(e) =>
              setSearchCategory(
                e.target.value
              )
            }
          />

          <button
            className="search-btn"
            onClick={searchByCategory}
          >
            Search
          </button>

          <button
            className="show-all-btn"
            onClick={loadOrnaments}
          >
            Show All
          </button>

        </div>

      </div>

      <div className="ornament-grid">

        {ornaments.map((item) => (

          <div
            className="ornament-card"
            key={item.ornamentId}
          >

            <img
              src={
                item.imageUrl
                  ? item.imageUrl
                  : "/LOGO.png"
              }
              alt={item.ornamentName}
              className="ornament-image"
            />

            <div className="ornament-body">

              <h5 className="ornament-name">
                {item.ornamentName}
              </h5>

              <p>
                <b>ID :</b>
                {" "}
                {item.ornamentId}
              </p>

              <p>
                <b>Category :</b>
                {" "}
                {item.category}
              </p>

              <p>
                <b>Weight :</b>
                {" "}
                {item.weight} g
              </p>

              <div className="stock-badge">
                Stock :
                {" "}
                {item.stockAvailable}
              </div>

              <div className="action-buttons">

                <button
                  className="edit-btn"
                  onClick={() =>
                    editOrnament(item)
                  }
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteOrnament(
                      item.ornamentId
                    )
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
            <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >

        <Modal.Header closeButton>

          <Modal.Title>

            {editMode
              ? "Update Ornament"
              : "Add Ornament"}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <input
            className="form-control mb-3"
            placeholder="Ornament ID"
            value={ornament.ornamentId}
            disabled={editMode}
            onChange={(e) =>
              setOrnament({
                ...ornament,
                ornamentId: e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Ornament Name"
            value={ornament.ornamentName}
            onChange={(e) =>
              setOrnament({
                ...ornament,
                ornamentName: e.target.value
              })
            }
          />

          <select
            className="form-control mb-3"
            value={ornament.category}
            onChange={(e) =>
              setOrnament({
                ...ornament,
                category: e.target.value
              })
            }
          >
            <option value="">
              Select Category
            </option>

            <option value="Ring">
              Ring
            </option>

            <option value="Necklace">
              Necklace
            </option>

            <option value="Bangles">
              Bangles
            </option>

            <option value="Chain">
              Chain
            </option>

            <option value="Bracelet">
              Bracelet
            </option>

            <option value="Anklet">
              Anklet
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Weight"
            value={ornament.weight}
            onChange={(e) =>
              setOrnament({
                ...ornament,
                weight: e.target.value
              })
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Stock Available"
            value={ornament.stockAvailable}
            onChange={(e) =>
              setOrnament({
                ...ornament,
                stockAvailable:
                  e.target.value
              })
            }
          />

          <label className="mb-2 fw-bold">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={handleImageUpload}
          />

          <input
            className="form-control mb-3"
            placeholder="Image URL (Optional)"
            value={
              ornament.imageUrl?.startsWith(
                "data:"
              )
                ? ""
                : ornament.imageUrl
            }
            onChange={(e) =>
              setOrnament({
                ...ornament,
                imageUrl: e.target.value
              })
            }
          />

          <div className="text-center">

            <img
              src={
                ornament.imageUrl
                  ? ornament.imageUrl
                  : "/LOGO.png"
              }
              alt="Preview"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "15px",
                border:
                  "3px solid #AD8330"
              }}
            />

          </div>

        </Modal.Body>

        <Modal.Footer>

          {editMode ? (

            <button
              className="add-btn"
              onClick={updateOrnament}
            >
              Update Ornament
            </button>

          ) : (

            <button
              className="add-btn"
              onClick={saveOrnament}
            >
              Save Ornament
            </button>

          )}

        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default OrnamentPage;