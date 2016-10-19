import React from 'react';

import InputNewCard from './InputNewCard';
import ResetButton from './ResetButton';

const Header = () => (

  <div className="flex flex-auto flex-column p1">
    <h1>
      example App
    </h1>
    <InputNewCard />
    <ResetButton />
  </div>

);

export default Header;
