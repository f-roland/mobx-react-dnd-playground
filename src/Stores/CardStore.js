import { observable, computed, action } from 'mobx';
import Card from '../Models/CardModel';

export default class CardStore {
  @observable cards = [];

  @computed get droppedCards() {
    return this.cards.filter(card => card.dropped);
  }

  @computed get sortedCardList() {
    return this.cards.sort((a,b) => ( a.position - b.position));
  }

  @action('add card to list')
  addCard(label, store = this) {
    this.cards.push(new Card({ label, position: this.cards.length, store }));
  }

  @action('empty bucket')
  emptyBucket() {
    this.cards.forEach(card => card.dropped = false);
  }

  toJS() {
    return this.cards.map(card => card.toJS());
  }

  static createStore(items) {
    const cardStore =  new CardStore();
    cardStore.cards = items.map(item => cardStore.addCard(item, cardStore));
    return cardStore;

  }

}