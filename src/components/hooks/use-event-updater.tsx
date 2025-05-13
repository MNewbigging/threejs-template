import { useEffect, useReducer } from "react";
import { eventListener, EventMap } from "../../events/event-listener";

export function useEventUpdater<E extends keyof EventMap>(...events: E[]) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // On first mount, subscribe to the event
    events.forEach((event) => eventListener.on(event, forceUpdate));

    // On unmount
    return () => {
      // Unsubscribe from the event
      events.forEach((event) => eventListener.off(event, forceUpdate));
    };
  }, [...events]);
}
