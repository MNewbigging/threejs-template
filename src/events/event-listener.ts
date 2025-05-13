export interface EventMap {
  "game-loaded": null;
  "game-started": null;
}

type EventCallback = (event: any) => void;

class EventListener {
  private callbacks = new Map<keyof EventMap, Set<EventCallback>>();

  on<E extends keyof EventMap>(
    event: E,
    callback: (event: EventMap[E]) => void
  ) {
    const callbacks = this.callbacks.get(event) ?? new Set<EventCallback>();
    callbacks.add(callback);
    this.callbacks.set(event, callbacks);
  }

  off<E extends keyof EventMap>(
    event: E,
    listener: (event: EventMap[E]) => void
  ) {
    const callbacks = this.callbacks.get(event);
    if (!callbacks) return;

    callbacks.delete(listener);

    if (!callbacks.size) {
      this.callbacks.delete(event);
    } else {
      this.callbacks.set(event, callbacks);
    }
  }

  fire<E extends keyof EventMap>(type: E, event: EventMap[E]) {
    const callbacks = this.callbacks.get(type) ?? [];
    callbacks.forEach((cb) => cb(event));
  }
}

export const eventListener = new EventListener();
