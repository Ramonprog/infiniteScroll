import axios from "axios";
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

interface IPOst {
  id: number;
  title: string;
  body: string;

}

const postStyle = {
  border: '2px solid #ccc',
  borderRadius: '8px',
  padding: '8px',
  maxWidth: '700px',
  margin: '10px auto'
};


function App() {

  const [items, setItems] = useState<IPOst[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const newItems = response.data;
      setItems(prevItems => [...prevItems, ...newItems]);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Itens da API</h1>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Carregando...</h4>}
      >
        {items.map(item => (
          <div key={item.id} style={postStyle}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}



export default App
