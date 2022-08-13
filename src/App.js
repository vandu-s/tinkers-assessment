import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Card from './components/Card/Card';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=10`)
        .then((res) => {
          setItems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  const fetchData = async () => {
    let newData = [];
    await axios
      .get(`https://api.pokemontcg.io/v2/cards?${page}=2&pageSize=10`)
      .then((res) => {
        newData = [...res.data.data];
        console.log('newData', newData);
        setItems([...items, ...newData]);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(items);

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Container fixed>
          <Grid container spacing={4}>
            {items.map((pokeMon) => {
              return <Card key={pokeMon.id} {...pokeMon} />;
            })}
          </Grid>
        </Container>
      </InfiniteScroll>
    </div>
  );
}

export default App;
