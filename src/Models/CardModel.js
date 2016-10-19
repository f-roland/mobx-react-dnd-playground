import { observable, action } from 'mobx';
import uuid from 'uuid';

export default class Card {
  id;
  store;
  @observable label = '';
  @observable position;
  @observable dropped = false;

  constructor({ label, position, store }) {
    this.label = label;
    this.store = store;
    this.position = position;
    this.id = uuid.v4();
  }

  setCardLabel(label) {
    this.label = label;
  }

  @action
  setCardPosition(position) {
    const cardToMove = this.store.cards.find(c => c.id === this.id);
    this.store.cards.splice(cardToMove.position, 1);
    this.store.cards.splice(position, 0, cardToMove);
    this.store.cards.forEach((v,k) => v.position = k);
  }

  dropCard() {
    this.dropped = true;
  }

  toJS() {
    return {
      id: this.id,
      label: this.label,
      position: this.position,
      dropped: this.dropped,
    };
  }

  static fromJS(label, position) {
    return new Card(label, position);
  }

}
