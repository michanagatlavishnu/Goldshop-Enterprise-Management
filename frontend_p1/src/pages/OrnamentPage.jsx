import React, { useState, useEffect } from "react";
import axios from "../api";
import { Modal } from "react-bootstrap";
import "./OrnamentPage.css";

function OrnamentPage() {
  const [ornaments, setOrnaments] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [ornament, setOrnament] = useState({
    ornamentName: "",
    category: "",
    description: "",
    purity: "22K",
    weight: "",
    makingCharge: "",
    stockAvailable: "",
    imageUrl: ""
  });

  useEffect(() => {
    loadOrnaments();
  }, []);

  const loadOrnaments = () => {
    axios.get(`/ornaments`).then((response) => {
      setOrnaments(response.data);
      setSearchCategory("");
    }).catch(console.error);
  };

  const saveOrnament = () => {
    axios.post(`/ornaments`, ornament).then(() => {
      alert("Ornament Saved Successfully");
      setShowModal(false);
      loadOrnaments();
    }).catch(console.error);
  };

  const updateOrnament = () => {
    axios.put(`/ornaments/${editId}`, ornament).then(() => {
      alert("Ornament Updated Successfully");
      setShowModal(false);
      loadOrnaments();
    }).catch(console.error);
  };

  const deleteOrnament = (id) => {
    if (window.confirm("Are you sure you want to delete this ornament?")) {
      axios.delete(`/ornaments/${id}`).then(() => {
        alert("Ornament Deleted Successfully");
        loadOrnaments();
      }).catch(console.error);
    }
  };

  const editOrnament = (item) => {
    setOrnament({
      ornamentName: item.ornamentName || "",
      category: item.category || "",
      description: item.description || "",
      purity: item.purity || "22K",
      weight: item.weight || "",
      makingCharge: item.makingCharge || "",
      stockAvailable: item.stockAvailable || "",
      imageUrl: item.imageUrl || ""
    });
    setEditMode(true);
    setEditId(item.ornamentId);
    setShowModal(true);
  };

  const searchByCategory = () => {
    if (!searchCategory) return;
    axios.get(`/ornaments/category/${searchCategory}`).then((response) => {
      if (response.data.length > 0) setOrnaments(response.data);
      else alert("No Ornaments Found");
    }).catch(console.error);
  };

  const resetForm = () => {
    setOrnament({
      ornamentName: "",
      category: "",
      description: "",
      purity: "22K",
      weight: "",
      makingCharge: "",
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
      setOrnament({ ...ornament, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#D4AF37' }}>Ornaments Management</h1>
        <button onClick={() => { resetForm(); setShowModal(true); }} style={{ background: '#D4AF37', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          + Add Ornament
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
        <input className="form-control" placeholder="Search by Category..." value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{ width: '250px' }} />
        <button onClick={searchByCategory} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Search</button>
        <button onClick={loadOrnaments} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Show All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {ornaments.map((item) => (
          <div key={item.ornamentId} style={{ background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
            <img src={item.imageUrl || "/LOGO.png"} alt={item.ornamentName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>{item.ornamentName}</h4>
              <p style={{ margin: '5px 0', color: '#ccc', fontSize: '0.9rem' }}><b>Category:</b> {item.category} | <b>Purity:</b> {item.purity}</p>
              <p style={{ margin: '5px 0', color: '#ccc', fontSize: '0.9rem' }}><b>Weight:</b> {item.weight}g | <b>Making:</b> ₹{item.makingCharge}</p>
              <p style={{ margin: '10px 0', color: '#D4AF37', fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.price?.toLocaleString() || 'N/A'}</p>
              <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', background: item.stockAvailable > 3 ? '#2E8B57' : '#B8860B', color: '#fff', fontSize: '0.8rem', marginBottom: '15px' }}>Stock: {item.stockAvailable}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => editOrnament(item)} style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteOrnament(item.ornamentId)} style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#000' }}>{editMode ? "Update Ornament" : "Add Ornament"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: '#000' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input className="form-control" placeholder="Ornament Name" value={ornament.ornamentName} onChange={(e) => setOrnament({ ...ornament, ornamentName: e.target.value })} />
            <select className="form-control" value={ornament.category} onChange={(e) => setOrnament({ ...ornament, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="Ring">Ring</option>
              <option value="Necklace">Necklace</option>
              <option value="Bangles">Bangles</option>
              <option value="Chain">Chain</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Earrings">Earrings</option>
            </select>
            <input className="form-control" placeholder="Description" value={ornament.description} onChange={(e) => setOrnament({ ...ornament, description: e.target.value })} />
            <select className="form-control" value={ornament.purity} onChange={(e) => setOrnament({ ...ornament, purity: e.target.value })}>
              <option value="24K">24K Gold</option>
              <option value="22K">22K Gold</option>
              <option value="18K">18K Gold</option>
            </select>
            <input type="number" className="form-control" placeholder="Weight (g)" value={ornament.weight} onChange={(e) => setOrnament({ ...ornament, weight: e.target.value })} />
            <input type="number" className="form-control" placeholder="Making Charge (₹)" value={ornament.makingCharge} onChange={(e) => setOrnament({ ...ornament, makingCharge: e.target.value })} />
            <input type="number" className="form-control" placeholder="Stock Available" value={ornament.stockAvailable} onChange={(e) => setOrnament({ ...ornament, stockAvailable: e.target.value })} />
            <input type="file" accept="image/*" className="form-control" onChange={handleImageUpload} />
          </div>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <img src={ornament.imageUrl || "/LOGO.png"} alt="Preview" style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "2px solid #D4AF37" }} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {editMode ? (
            <button className="btn btn-warning" onClick={updateOrnament} style={{ background: '#D4AF37', border: 'none', color: '#000', fontWeight: 'bold' }}>Update Ornament</button>
          ) : (
            <button className="btn btn-warning" onClick={saveOrnament} style={{ background: '#D4AF37', border: 'none', color: '#000', fontWeight: 'bold' }}>Save Ornament</button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrnamentPage;
