import React from 'react';
import { inject, observer } from "mobx-react";

const ResetButton = inject('store')(observer(({ store }) => {
  return (
    <div>
      <button onClick={ () => store.emptyBucket() }>reset</button>
    </div>
  );
}));

export default ResetButton;
