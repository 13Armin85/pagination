import React, { useState, useEffect } from "react";

function App() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();
    setRepos(data);
  };
  console.log(repos);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(repos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="wrapper">
      <div className="api">
        {currentItems.map((repo) => (
          <div key={repo.id}>{repo.title}</div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
            &laquo;
          </a>
        )}
        {pageNumbers.map((number) => (
          <a
            key={number}
            href="#"
            className={number === currentPage ? "active" : ""}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </a>
        ))}
        {currentPage < pageNumbers.length && (
          <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
            &raquo;
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
