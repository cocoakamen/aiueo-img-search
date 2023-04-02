import './App.css';
import React, { useEffect, useState} from "react";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ImgItemData from './ImgItemData.json';
import ImageListView from './ImageListView';
import SearchBox from './SearchBox';
import Fuse from 'fuse.js'
import PreSetSearchButton from './PreSetSearchButton';

function App() {
  const itemNumPerPage = 5;

  const theme = createTheme({
    palette: {
      secondary: {
        light: '#9e9e9e',
        main: '#757575',
        dark: '#616161',
        contrastText: '#fff',
      },
    },
  });

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

  const [searchWord, setSearchWord] = useState('');

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
    setSearchWord(inputStr);
    // titleとtagsの中から探す
    const fuseOptions = {
      keys: ['title', 'tags']
    }
    const fuse = new Fuse(ImgItemData, fuseOptions)
    // Fuseの検索結果からitemだけ取り出す
    let result = fuse.search(inputStr).map((resultItem) => (resultItem.item));
    // inputStrが空白だったら、全件表示
    if(inputStr === '') {
      result = ImgItemData;
    }
    setSearchResult(result);
    // console.log(JSON.stringify(result));

    // Fuseの検索結果を表示
    setItemListData(getPageData(result, 1));
    setPageNo(1);
    setMaxPageNo(Math.ceil(result.length / itemNumPerPage));
    updateBackButtonStyle(1);
    updateNextButtonStyle(1, Math.ceil(result.length / itemNumPerPage));
  };

  // 検索文字列指定
  const handlePresetSearch = (inputStr) => {
    setSearchWord(inputStr);
    handleSearchBox(inputStr);
    console.log(inputStr);
  }

  // 初期ロード時にURLパラメータを取得
  useEffect(() => {
    // URLのパラメーターを取得
    const params = new URLSearchParams(window.location.search);
    const queryWord = params.get('q');
    console.log(queryWord);
    if( queryWord !== null) {
      setSearchWord(queryWord);
      handleSearchBox(queryWord);
    }
  }, []);

  return (
      <div className="App">
      <ThemeProvider theme={theme}>
      <Container  maxWidth="md">
          <SearchBox 
            handleSearchBox={handleSearchBox} searchWord={searchWord}
          ></SearchBox>

        <PreSetSearchButton handlePresetSearch={handlePresetSearch}></PreSetSearchButton>

        <ImageListView 
          itemListData={itemListData || ImgItemData} handleBack={handleBack} handleNext={handleNext}
          backButtonStyle={backButtonStyle} nextButtonStyle={nextButtonStyle}
        ></ImageListView>
      </Container>
    </ThemeProvider>
    </div>
    
  );
}

export default App;
