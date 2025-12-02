import './css/Admin.css'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  return (
    <main className="admin-page">
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>
            
            <div className="admin-actions">
                <button className="admin-btn"> Create User Account </button>
                <button className="admin-btn"> Update User Account </button>
                <button className="admin-btn"> Suspsend User Account </button>
                <button className="admin-btn"> Delete User Account </button>
                <button className="admin-btn"> View User Account </button> 
    
            </div>
        </div>
    </main>
  );
}

export default Admin;