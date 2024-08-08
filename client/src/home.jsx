
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 

function Home() {
    
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get('http://localhost:3001/getUsers' , {headers: {Authorization: `Bearer ${token}`  }})
      .then((response) => {
        
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {

    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:3001/deleteUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => {
    console.log(response);
    setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from state
  })
  .catch(err => console.log(err));
};

return (
  <div>
    <h1 className="w-100 vh-1 d-flex justify-content-center">Home component</h1>
    <Link to="/register" className='btn btn-success'>Sign-up</Link>

    <div className="w-100 vh-100 d-flex justify-content-center align-items-start">
      <div className="w-50">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                  <button 
                    className='btn btn-danger' 
                    onClick={() => handleDelete(user._id)}> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Home;