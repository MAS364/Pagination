import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const fetcheddata = await res.json();
    setData(fetcheddata.products);
    console.log(fetcheddata);
    console.log(fetcheddata.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= data.length / 10)
      setPage(selectedPage);
  };

  return (
    <div className="App">
      <div className="products">
        {data.slice(page * 10 - 10, page * 10).map((item) => (
          <span className="products-single">
            <img src={item.thumbnail} alt={item.title} />
            <span>{item.title}</span>
          </span>
        ))}
      </div>

      <div className="pagination">
        <span onClick={() => setPageHandler(page - 1)}>◀︎</span>
        {[...Array(data.length / 10)].map((_, i) => (
          <span
            className={page === i + 1 ? "page-selected" : ""}
            onClick={() => setPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        ))}
        <span onClick={() => setPageHandler(page + 1)}>►</span>
      </div>
    </div>
  );
}
