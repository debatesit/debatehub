import styles from './css/Admin.module.css'
import { useNavigate } from 'react-router-dom';
import testfunction from './js/Functions.js'

function Admin() {
  const navigate = useNavigate();
  return (
    <main className={styles.adminPage}>
        <div className={styles.adminContainer}>
            <h1 className={styles.adminTitle}>Admin Dashboard</h1>
      
            <div className={styles.adminActions}>
                <button className={styles.adminBtn} onClick={() => testfunction()}> Create User Account </button>
                <button className={styles.adminBtn} onClick={() => testfunction()}> Update User Account </button>
                <button className={styles.adminBtn} onClick={() => testfunction()}> Suspsend User Account </button>
                <button className={styles.adminBtn} onClick={() => testfunction()}> Delete User Account </button>
                <button className={styles.adminBtn} onClick={() => testfunction()}> View User Account </button> 
    
            </div>
        </div>
    </main>
  );
}

export default Admin;