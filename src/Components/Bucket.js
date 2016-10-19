import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { observer, inject } from 'mobx-react';
import Card from './Card';

const Types = {
  CARD: 'card'
};

@inject('store')
@observer
class Bucket extends Component {
  render () {

    const { isOver, connectDropTarget, canDrop, item, store } = this.props;
    const cards = store.cards;
    const style = {};

    style.backgroundColor = isOver && canDrop ? "rgba(0,0,0,0.4)" : "#fff";

    return connectDropTarget(
      <div className="p1 m1 col-6 flex flex-column" style={ style }>
        <h2>Bucket</h2>
        { isOver && item && <p className="muted">an Item is on me right now !</p> }
        <div className="flex flex-column border p1 flex-auto">
          { cards.length ? cards.filter(c => c.dropped).map(item => (
            <Card key={ item.id } card={ item } />
          )) : null }
        </div>
      </div>
    )
  }
}

const targetSpecs = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    const { card } = monitor.getItem();
    card.dropCard();
    console.log('item %o is dropped', card, monitor, component);
    return { moved: true };
  },
  hover(props, monitor, component) {
    // console.log('hovering', props, monitor, component);
  },
  canDrop(props, monitor) {
    const item = monitor.getItem();
    // console.log('item dropped', item, props, monitor);
    return true;
  },
};

const collect = (connect, monitor)  => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getDropResult(),
});

export default DropTarget('card', targetSpecs, collect)(Bucket);
