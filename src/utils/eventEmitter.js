import EventEmitter from 'EventEmitter';
const eventEmitter = new EventEmitter(1);

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  clear: () => eventEmitter.clear(),
  listenersNumber: (event) => eventEmitter.listenersNumber(event),
};

Object.freeze(Emitter);

export default Emitter;
