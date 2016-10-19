import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from 'react-dnd';

const Types = {
  CARD: 'card',
};

const cardSource = {
  beginDrag(props) {
    const { card } = props;
    console.log('dragging ', card);
    return { card };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const { card } = monitor.getItem();
    console.log('end drag',card);
    const dropResult = monitor.getDropResult();
    // if (dropResult.moved) {
    //   card.addCardToBucket(card.id);
    // }
    // console.log('I\'ve been dropped !', item, dropResult);
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const { card } = monitor.getItem();
    const dragIndex = card.position;
    const hoverIndex = props.position;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    card.setCardPosition(hoverIndex);
    monitor.getItem().position = hoverIndex;

  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    dropResult: monitor.getDropResult(),
  };
}

@DropTarget(Types.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(Types.CARD, cardSource, collect)
class Card extends Component {

  render() {
    const { card, isDragging, dropResult, connectDragSource, connectDropTarget } = this.props;

    const moved = dropResult ? dropResult.moved : false;
    const style = isDragging ? { opacity: 0 } : {};

    return connectDragSource(connectDropTarget(
      !moved ?
        <div className="border center p1 my1" style={ style }>
          { card.label }
          { isDragging && 'and I\'m being dragged' }
        </div> : <div></div>
    ));
  }
}

export default Card;

