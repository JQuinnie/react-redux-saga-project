# React-Redux-Saga-Project

## Redux Saga

A Redux middleware, action catches action before it gets to reducer, once it catches, first execute async action like saving data to server, once finishes the task then it would dispatch another action that will reach the reducer, not the same action all the way through.

Similar to Redux Thunk, but the async handling is on a saga and uses generator to manage the dispatching of actions and maintaining that transaction flow. Contrary to Redux Thunk (logic is all contained inside of the function), you don't end up in callback hell, you can test your async flows easily and your actions stay pure.

### Saga and Effects

The flow goes from watcher saga that listens to an action then it will invoke the corresponding worker saga. Redux Saga provides helpers called Effects, which are plain objects. By themselves they do nothing and just give us an object but when passed through the Saga middleware, Saga will act upon them accordingly. Sagas are extremely useful managing promises, whenever it comes across a promise it will pause itself until the promise is completed.

### Types of Sagas

The watcher/worker refers to a way of organizing the control flow using two separate sagas. The watcher saga listens for an action type, much like a reducer. It will watch for dispatched actions and fork a worker on every action. The worker saga will handle the action and terminate.

### Types of Effects

There are two types of effects, blocking and non-blocking. A blocking call means that the saga yielded an effect and will wait for the outcome of its execution before resuming to the next instruction inside the yielding Generator. A non-blocking call means that the saga will resume immediately after yielding the effect.

#### take

Creates an effect description taht instructs the middleware to wait for a specified action on the Store. The Generator is suspended until an action that matches pattern is dispatched. It does not take a second paramter, and it will only run once matching the worker in `call()`. (blocking)

#### takeEvery

Most familiar and provides a behavior similar to `redux-thunk`. It allows multiple instances of these sagas to run at the same time. Spawns a saga on each action dispatched to the Store that matches a given pattern. (non-blocking)

#### put

It dispatches an action, you can treat it like an action creator. Creates an effect description taht instructs the middleware to schedule the dispatching of an action to the store. This dispatch may not be immediate since other tasks might lie ahead in teh saga task queue or still be in progress.

### Generator Functions

Redux Saga makes use of the generator function. A generator is a function that can stop midway and then continue from where it stopped. In short, a generator appears to be a function but it behaves like an iterator.

A generator is a function which returns an object on which you can call `next()`. Every invocation of `next()` will return an object of;

```javascript
{
  value: any,
  done: true | false
}
```
