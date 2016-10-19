import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Card from './Card';


@inject('store')
@observer
class CardList extends Component {

  constructor(props) {
    super(props);
    console.log(this);
  }

  render() {
    const { store, sorted } = this.props;
    const cards = sorted ? store.sortedCardList : store.cards;
    return (
      <div className="p1 m1 flex flex-column col-6">
        <h2>Cards</h2>
        <div className='flex flex-column border p1 flex-auto'>
          { cards.filter(c => !c.dropped ).map(card =>
            <Card key={ card.id } position={ card.position } { ...{ card } } moveCard={ card.setCardPosition } />
          ) }
        </div>
      </div>
    );
  }
}

export default CardList;
