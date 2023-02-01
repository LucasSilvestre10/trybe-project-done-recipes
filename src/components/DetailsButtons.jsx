import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DetailsButtons() {
  const location = useLocation();
  const { pathname } = location;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  return (
    <>
      {copied && <p>Link copied!</p>}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
    </>
  );
}

export default DetailsButtons;
