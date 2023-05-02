import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const AdminDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8081/getContactus');
      setData(result.data.Result);
    };
    fetchData();
  }, []);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
        {data.length > 0 ? data.map((item) => (
            <tr key={item.ID}>
              <td>{item.NAME}</td>
              <td>{item.EMAIL}</td>
              <td>{item.PHONE}</td>
              <td>{item.MESSAGE}</td>
            </tr>
          )) : <tr><td colSpan="4">Loading...</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDetails;
