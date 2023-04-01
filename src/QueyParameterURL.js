import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function QueryParameterURL(props) {
  const [linkURL, setLinkURL] = useState('');
  const [toolTipOpen, setToolTipOpen] = React.useState(false);
  
  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };

  useEffect(() => {
    // 現在のURLを取得
    const currentURL = window.location.href.split('?')[0];
    // URLのパラメーターを追加
    const newURL = currentURL + '?q=' + props.searchWord;
    setLinkURL(newURL);

  }, [props.searchWord]);

  const handleURLCopy = () => {
    // URLをクリップボードにコピー
    navigator.clipboard.writeText(linkURL).then(() => {
      // Tooltipを表示
      setToolTipOpen(true);
    }, () => {
      /* clipboard write failed */
    });;
    
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={toolTipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={linkURL}
        >
          <Button 
            variant="contained" color="success" size="small"
            onClick={handleURLCopy}
          >Copy Link</Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}