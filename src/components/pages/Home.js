import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    var r = window.confirm("Are you sure?");
    if (r === true) {
      await axios.delete(`http://localhost:3003/users/${id}`);
      loadUsers();
    }
  };
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <div className="search">
          <input
            className="search_input"
            placeholder="Search by Name"
            type="text"
            value={search}
            maxLength="30"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search_button" onClick={() => setSearch2(search)}>
            Search
          </button>
        </div>

        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((item) => item.name.includes(search2) || !search2)
              .map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                      View
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
