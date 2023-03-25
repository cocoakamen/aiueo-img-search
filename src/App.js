import './App.css';
import React, { useState} from "react";
import Container from '@mui/material/Container';

import ImgItemData from './ImgItemData.json';
import ImageListView from './ImageListView';
import SearchBox from './SearchBox';
import Fuse from 'fuse.js'

function App() {
  const itemNumPerPage = 5;
  const [maxPageNo, setMaxPageNo] = useState(Math.ceil(ImgItemData.length / itemNumPerPage));
  let [pageNo, setPageNo] = useState(1);

  const getPageData = (arrayData, page) => {
    return arrayData.slice(itemNumPerPage * (page -1) , itemNumPerPage * page)
  }

  const [itemListData, setItemListData] = useState(getPageData(ImgItemData, 1));
  const [searchReult, setSearchResult] = useState(ImgItemData);

  const [backButtonStyle, setBackButtonStyle] = useState({
    disabled: true,
    color: 'disable',
  });

  const [nextButtonStyle, setNextButtonStyle] = useState({
    disabled: maxPageNo===1,
    color: maxPageNo===1 ? 'disable' : 'primary',
  });

  const updateBackButtonStyle = (page) => {
    if(page === 1) {
      setBackButtonStyle(
        {
          color: 'disable',
          disabled : true,
        }
      )
    } else {
      setBackButtonStyle(
        {
          color: 'primary',
          disabled : false,
        }
      )
    }
  }

  // MaxPageが代わる場合は、useStateではタイミングがうまくいかないので引数で渡す
  // 引数がない場合はmaxPage使う。
  const updateNextButtonStyle = (page, newMaxPage) => {
    if(page === (newMaxPage || maxPageNo)) {
      setNextButtonStyle(
        {
          color: 'disable',
          disabled : true,
        }
      )
    } else {
      setNextButtonStyle(
        {
          color: 'primary',
          disabled : false,
        }
      )
    }
  }

  // 戻るやじるし
  const handleBack = () => {
    let tmpPageNo = pageNo;
    if ( tmpPageNo !== 1 ) {
      setPageNo(pageNo - 1);
      tmpPageNo = tmpPageNo - 1; 
    }

    updateBackButtonStyle(tmpPageNo);
    updateNextButtonStyle(tmpPageNo);
    setItemListData(getPageData(searchReult, tmpPageNo));
  }

  // 進むやじるし
  const handleNext = () => {
    let tmpPageNo = pageNo;
    if ( tmpPageNo !== maxPageNo ) {
      setPageNo(pageNo + 1);
      tmpPageNo = tmpPageNo + 1;
    }
    updateBackButtonStyle(tmpPageNo);
    updateNextButtonStyle(tmpPageNo);
    setItemListData(getPageData(searchReult, tmpPageNo));
  }

  // 検索窓
  const handleSearchBox  = (inputStr) => {
    // titleとtagsの中から探す
    const fuseOptions = {
      keys: ['title', 'tags']
    }
    const fuse = new Fuse(ImgItemData, fuseOptions)
    // Fuseの検索結果からitemだけ取り出す
    const result = fuse.search(inputStr).map((resultItem) => (resultItem.item));
    setSearchResult(result);
    // console.log(JSON.stringify(result));

    // 検索文字列長がゼロだったら全部表示、それ以外は、Fuseの検索結果を表示
    const viewListLength = (inputStr.length === 0) ? ImgItemData.length : result.length;
    setItemListData((inputStr.length === 0) ? getPageData(ImgItemData, 1) : getPageData(result, 1));
    setPageNo(1);
    setMaxPageNo(Math.ceil(viewListLength / itemNumPerPage));
    updateBackButtonStyle(1);
    updateNextButtonStyle(1, Math.ceil(viewListLength / itemNumPerPage));
  };

  return (
    <div className="App">
      <Container  maxWidth="md">
        <SearchBox handleSearchBox={handleSearchBox}></SearchBox>
        <ImageListView 
          itemListData={itemListData || ImgItemData} handleBack={handleBack} handleNext={handleNext}
          backButtonStyle={backButtonStyle} nextButtonStyle={nextButtonStyle}
        ></ImageListView>
      </Container>
    </div>
  );
}

export default App;
