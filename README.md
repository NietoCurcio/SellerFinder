# SellerFinder - WhatWouldYouLike

> My Final project to conclude Front-End Web Development with React on Coursera, Coursera Honors Content.

An App to join buyers to sellers.

## React App

The client-side is a React App and the Server side was configured with [json-server](https://github.com/typicode/json-server) package. It also uses react-router-dom and react-bootstrap, to handle front-end routes and user interfaces, respectively.

<!-- <p align="center">
 <img src="https://github.com/NietoCurcio/SellerFinder/blob/main/.github/screenshot1.png?raw=true" width="750" alt="Seller Finder">
</p>  -->

<table>
  <tr style="display: flex; flex-wrap: wrap;">
    <td><p align="center">
  <img src="https://github.com/NietoCurcio/SellerFinder/blob/main/.github/screenshot1.png?raw=true" width="750" alt="Seller Finder">
</p></td>
    <td><p align="center">
  <img src="https://github.com/NietoCurcio/SellerFinder/blob/main/.github/screenshot2.png?raw=true" width="750" alt="Seller Finder">
</p></td>
  </tr>
</table>

## Deployment

This project is deployed, so you can access the app on [Seller Finder App](https://sellerfinder.netlify.app/) and the server [Seller Finder Server-side](https://seller-finder.herokuapp.com/) and see what the app looks like and how the server is configured. The server communicates with the database, stored in the db.json file, there are four resources that you can access in the server REST API, '/most', '/products', '/sellers' and '/comments'. Comments has a relationship between sellers (author) and products (commented product).

## React Context API

This App uses React Context API (React.useContext() Hook) to handle state:

Is pretty like Redux, since both were inpisred in the flux architeture, using the unidirectional data flow. I like to think this thought process as "CARS" flow, **C**omponent, **A**ctions, **R**educer and **S**tore, because the store cannot be changed without following this pipeline.

<p align="center">
  <img src="https://github.com/NietoCurcio/SellerFinder/blob/main/.github/screenshot3.png?raw=true" width="750" alt="Seller Finder">
</p>

## Learning Process

### Closure and stale closure issue
```
const appContext = useContext(AppContext)

useEffect(() => {
    console.log(appContext.product)
    getProduct(params.id)
    console.log(appContext.product)
  }, [])
```

I think the code above is a good example of closure. I've tried to debug code like that sometimes and studying this project I could notice why the console.log shows the same content in both, before and after getProduct(), even if I use an 'await' together with an async function declared in the Effect, or setTimeout. The appContext.product does not belong to the environment of the effect callback function, so it will look in the outer function (the Component) and store its information as it is, in the time the callback function was created. It's like the Backpack of variables that the function can see (Closure), it's how codes that return a function that uses a variable of an outer function works, then appContext.product is a empty object in its closure (time that the function was created), the empty object is put in the function backpack of variables.

Because of that if you use store.getState() (talking about Redux now) provided by useStore hook in react-redux package, you can see the difference, because when you call before, the getState() function you have the previous or initial environment (in its function body) and the second (notice that an await keyword in a async function is necessary, so that call getState once the state was updated) will have the new state, the new environment, it's the same idea of updating state based on the state, avoiding closure issues, setState(count => count + 1) is correct and setState(count + 1) is wrong. Note that I think the appropriate here would be create another useEffect where you put the state that you're concerned about in the dependencies array, to track it.

Look at the code below, I think it was another good example to my learning process:

```
const dishesRef = useRef(props.dishes.dishes)
dishesRef.current = props.dishes.dishes

useEffect(() => {
    async function fetchData() {
      console.log(store.getState().dishes.dishes) // empty array
      console.log(props.dishes.dishes) // empty array
      console.log(dishesRef.current) // empty array
      await fetchDishes()
      console.log(props.dishes.dishes) // empty array
      console.log(dishesRef.current) // array with four dishes
      console.log(store.getState().dishes.dishes) // array with four dishes
    }
    fetchData()
    ...
```

store.getState() will bring to us the updated state is a react-redux hook, it has its body, lexical scope and/or closure and reference treated by react-redux. dishesRef keeps track of the props.dishes.dishes reference, it holds a mutable variable (persistent). But notice that even if the dishes state was actually updated, props.dishes.dishes continues empty, that's because of closure, when the function was created, in its closure, the function get props.dishes.dishes as an empty array, since it was like this when the function got created, the function it's not concerned about any state, just the closure, the environment ("backpack of variables") when it was created. Functions sees the props and state from the render it was created in.

A good quote in the [Eloquent Javascript book](https://eloquentjavascript.net/03_functions.html#h_hOd+yVxaku) is: "When called, the function body sees the environment in which it was created, not the environment in which it is called.".

I recommend you read more about closure in the following contents to get more information, since closure sometimes may not be intuitive:
- https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures,
- https://dmitripavlutin.com/react-hooks-stale-closures/
- https://www.youtube.com/watch?v=eTDnfS2_WE4&ab_channel=BenAwad
- https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

### useCallback and Life Cycle of a Component

In the course project, Ristorante Confusion, I've experienced the use of useCallback hook when you have a code like this one:
```
useEffect(() => {
  validate(state.firstName, state.lastName, state.telNum, state.email)
// }, [validate, state.firstName, state.lastName, state.telNum, state.email])
```

validate function is a dependency of the effect and the component is re-rendered, the reference of validate (declared above the useEffect) will be different at every render.
Then we need to wrap the validate function in useCallback hook, is a dependency of the effect, but only creates a new reference if the dependencies of the validate function have changed, otherwise, same input, same output, nothings has changed. If don't we get the following error by our good ESLint.

`"The 'validate' function makes the dependencies of useEffect Hook (at line 96) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'validate' in its own useCallback() Hook  react-hooks/exhaustive-deps"`

Since this code belongs to the course's project, I'll leave more details about it in this [repo](https://github.com/NietoCurcio/Ristorante-Confusion), where I share my thoughts about it, component life cycle and resources about useCallback.

## About the Course

[Coursera](https://www.coursera.org/) is platform that with online courses offered by with universities around the world.
The author of this Course is Jogesh K. Muppala an associate professor in the Department of Computer Science and Engineering, The Hong Kong University of Science and Technology.

## Linkedln

Here you can find me on [Linkedln](https://www.linkedin.com/in/felipe-antonio-nieto-curcio-9b865116a/).
