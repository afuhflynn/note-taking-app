// Simple PubSub implementation for realtime updates
import { EventEmitter } from "events";

// Singleton EventEmitter instance
const emitter = new EventEmitter();

export const publish = (event: string, data: any) => {
  emitter.emit(event, data);
};

export const subscribe = (event: string, listener: (data: any) => void) => {
  emitter.on(event, listener);
  // Return unsubscribe function
  return () => emitter.off(event, listener);
};

export default emitter;
