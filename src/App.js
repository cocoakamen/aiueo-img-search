import './App.css';
import React, { useState} from "react";
import Container from '@mui/material/Container';

import ImgItemData from './ImgItemData.json';
import ImageListView from './ImageListView';
import SearchBox from './SearchBox';
import Fuse from 'fuse.js'

function App() {

  const [itemListData, setItemListData] = useState(ImgItemData);

  // 検索窓
  const handleSearchBox  = (inputStr) => {
    // titleとtagsの中から探す
    const fuseOptions = {
      keys: ['title', 'tags']
    }
    const fuse = new Fuse(ImgItemData, fuseOptions)
    // Fuseの検索結果からitemだけ取り出す
    const result = fuse.search(inputStr).map((resultItem) => (resultItem.item));
    console.log(JSON.stringify(result));
    // 検索文字列長がゼロだったら全部表示、それ以外は、Fuseの検索結果を表示
    setItemListData((inputStr.length === 0) ? ImgItemData: result);
  };

  return (
    <div className="App">
      <Container  maxWidth="md">
        <SearchBox handleSearchBox={handleSearchBox}></SearchBox>
        <ImageListView itemListData={itemListData}></ImageListView>
      </Container>
    </div>
  );
}

export default App;
