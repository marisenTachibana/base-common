export default function mitt(all = new Map()) {
  return {
    all,
    on(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index !== -1) {
          handlers.splice(index, 1);
        }
      }
    },
    emit(type, evt) {
      const typeHandlers = all.get(type) || [];
      const wildcardHandlers = all.get('*') || [];

      for (const handler of [...typeHandlers, ...wildcardHandlers]) {
        handler(evt);
      }
    },
    clear() {
      all.clear();
    },
  };
}
