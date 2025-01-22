import { useState, useEffect } from 'react';

const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);


    const loadMore = async () => {
        const res = await fetch(`http://localhost:8080/items?page=${page}`);
        const data = await res.json();
        setItems((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        loadMore();
    }, []);


    return (
        <div onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMore();
          }
        }}>
          {items.map((item, index) => (
            <div key={index} className="item">{item.name}</div>
          ))}
        </div>
      );
    };

    export default InfiniteScroll;