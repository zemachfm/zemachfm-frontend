/**
 * this function makes action types and return objects for each action types
 *
 * @param payload payload object
 * @param actionType action types string
 */
const makeAction = (payload: any, actionType: string) => ({
  type: actionType,
  payload,
});

export { makeAction };
