import React, { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AddLinkIcon from '@mui/icons-material/AddLink';
import IconButton from '@mui/material/IconButton';

export default function QueryParameterURL(props) {
  const [linkURL, setLinkURL] = useState('');
  const [toolTipOpen, setToolTipOpen] = React.useState(false);
  
  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };

  useEffect(() => {
    // 現在のURLを取得
    const currentURL = window.location.href.split('?')[0];
    let newURL = currentURL;
    if( props.searchWord !== '' ) {
      newURL = newURL + '?q=' + props.searchWord;
    }
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
          title={'copied! ' + linkURL}
        >

          <IconButton type="button" onClick={handleURLCopy}>
            <AddLinkIcon />
          </IconButton>

        </Tooltip>
      </div>

      
    </ClickAwayListener>
  );
}