import * as THREE from "three";

export interface EventMap {
  'event-name': null; 
}

type EventCallback = (event: any) => void;

export class EventListener {
  private events = new Map<keyof EventMap, EventCallback[]>();

  on<E extends keyof EventMap>(
    type: E,
    listener: (event: EventMap[E]) => void
  ) {
    const callbacks = this.events.get(type) ?? [];
    callbacks.push(listener);
    this.events.set(type, callbacks);
  }

  off<E extends keyof EventMap>(
    type: E,
    listener: (event: EventMap[E]) => void
  ) {
    const callbacks = this.events.get(type)?.filter((cb) => cb !== listener);
    this.events.set(type, callbacks ?? []);
  }

  fire<E extends keyof EventMap>(type: E, event: EventMap[E]) {
    const callbacks = this.events.get(type) ?? [];
    callbacks.forEach((cb) => cb(event));
  }
}
