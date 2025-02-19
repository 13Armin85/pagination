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

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

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

        {currentPage > 2 && <span>...</span>}

        {currentPage > 1 && (
          <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </a>
        )}

        <a href="#" className="active">
          {currentPage}
        </a>

        {currentPage < totalPages && (
          <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </a>
        )}

        {currentPage < totalPages - 1 && <span>...</span>}

        {currentPage < totalPages && (
          <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
            &raquo;
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
