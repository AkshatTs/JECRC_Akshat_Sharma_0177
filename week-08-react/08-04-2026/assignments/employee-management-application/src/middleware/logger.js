/**
 * Logger Middleware for Redux
 * Logs all actions and state changes for debugging purposes
 */
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  console.info('Dispatching:', action);
  console.log('Previous State:', store.getState());

  // Call the next middleware or reducer
  const result = next(action);

  console.log('New State:', store.getState());
  console.groupEnd();

  return result;
};

export default loggerMiddleware;
