# React-Redux-Saga-Project

## Redux Saga

A Redux middleware, action catches action before it gets to reducer, once it catches, first execute async action like saving data to server, once finishes the task then it would dispatch another action that will reach the reducer, not the same action all the way through.

Similar to Redux Thunk, but the async handling is on a saga and uses generator to manage the dispatching of actions and maintaining that transaction flow. Contrary to Redux Thunk, you don't end up in callback hell, you can test your async flows easily and your actions stay pure.

### Generator Functions

Redux Saga makes use of the generator function. A generator is a function that can stop midway and then continue from where it stopped. In short, a generator appears to be a function but it behaves like an iterator.

A generator is a function which returns an object on which you can call `next()`. Every invocation of `next()` will return an object of;

```javascript
{
  value: any,
  done: true | false
}
```
