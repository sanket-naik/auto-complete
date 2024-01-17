1. What is the difference between Component and PureComponent? Give an example where it might break my app.

### Answer

The major of a PureComponent & a Normal component is, PureComponents performs a shallow equality check on current and next props, and only re-renders if there are differences in both the versions of props.
But a normal component will re-render whenever its parent re-renders, regardless of whether the props or state have changed.

Where pure components will break?
Pure components will break your app when you try to use nested objects as a prop, The shallow comparison may not detect changes deep within nested objects, leading to unexpected behavior.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

### Answer

- Context Changes Might Not Trigger Re-render
- Context as an External Dependency
- Context Updates Are Asynchronous

Depending on context in shouldComponentUpdate may lead to unreliable results, as the context update might not be captured accurately. This can result in components failing to update when they should or updating when they shouldn't.

3. Describe 3 ways to pass information from a component to its PARENT.

### Answer

- Using callback functions
  The parent component can pass a callback function to the child component as a prop, and the child component can then invoke this callback with the necessary information when an event occurs or when certain conditions are met.
- Using a 3rd party state management tool
  Using state management tools like Redux, MobX etc, will help you to pass data from child to parent, as state management tools are globally declared & has shared state across different components
- Using native Context api
  Context api is reacts native api which will allow you to store share data which can later be used from child components to parent

4. Give 2 ways to prevent components from re-rendering.

### Answer

- React.memo:
  This is a Higher order component used to memoize functional components, preventing them from re-rendering unless their props have changed. But be careful while using a callback function, which can result in recreation of the component. Using a useCallback is preferred to control this
- React.useMemo:
  The useMemo hook in functional components can be used to memoize the result of a computation and prevent unnecessary re-renders when the dependencies haven't changed. This is useful when you have expensive calculations within your component.
  We can use PureComponent in class based components to prevent re-rendring

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

### Answer

fragment is a way to group multiple elements without adding an extra node to the DOM
it can be represented as <React.Fragments></React.Fragments> or <></>
Example:

import React from 'react';
const ComponentWithFragment = () => {
return (
<> // this will be removed in runtime

<h1>Title</h1>
<p>Paragraph 1</p>
<p>Paragraph 2</p>
</>
);
};

6. Give 3 examples of the HOC pattern.

### Answer

Some of the generic HOC that can be used in daily projects are

- withSpinner
  This can be used to show some loaders while the data is still being loaded
  Example:

  withSpinner(MyComponent, getData)

  getData is the callback function which can perform a async operations

- withAuthentication
  This can be useful for checking whether the user is authenticated before rendering the wrapped component.
- withProps
  This can be useful to manipulate or add props to the wrapped component based on certain conditions.

  import React from 'react';

  const withProps = (WrappedComponent) => {
  return (props) => {
  // Add a new props to the wrapped component
  const modifiedProps = { extraProp: ‘test’, ...props };

      return <WrappedComponent {...modifiedProps} />;

  };
  };
  withProps(Component);

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

### Answer

- Promises
  Promises use the then and catch methods to handle success and error cases. The catch block is used to handle any errors that occur during the promise execution.
  Promises have multiple states

  - Pending
  - Fulfilled
  - Rejected

  Example:

- asyncFuncWithPromise()
  .then(result => {
  // Handle success
  })
  .catch(error => {
  // Handle error
  });
  `
- Callbacks:
  Callbacks way of passing a function as an argument to another function, and it can be executed when a async func gets succeeded
  Example:
  A timeout method which will execute after a sec

  setTimeout(()=>{
  console.log(“execute”)
  },1000)
  Async await
  Errors are typically handled using try…catch blocks, making the code look similar to traditional synchronous code.
  Example:

  async function fetchData() {
  try {
  const result = await someAsyncFunc();
  // Handle success
  } catch (error) {
  // Handle error
  }
  }

8. How many arguments does setState take and why is it async.

### Answer

In class component setState takes two arguments

- The first argument can be object or a callback that’s used to update the state
- The second argument is a callback function that run after`setState`
- Why async
  setState is designed to be async. When you call setState, React doesn't immediately update the component state. Instead, it schedules an update and proceeds with the rest of the code. Which results in better performance
  Advantages to this is:
  Avoids Unnecessary Re-renders
  Performance Optimization

9. List the steps needed to migrate a Class to Function Component.

### Answer

- Create a New Functional Component
- Move the states to hooks
- Review and Move Lifecycle Methods
- Convert Class Methods to Functions
- Update this reference’s
- Replace prop handling
- Note: Also review the unit test cases to avoid break

Example of simple class component
class ClassComponent extends React.Component {
render() {
return (

<div>{this.props.value}</div>
);
}
}
Example of simple functional component
const FunctionalComponent = ({ value }) => {
return (
<div>{value}</div>
);
};

10. List a few ways styles can be used with components.

### Answer

- Inline styles
   <div style={{color:'red'}}>Hello World</div>
   CSS Modules import 
   .container{
   color:red
   }
- Styled Components
  const StyledDiv = styled.div`color: green;`;
- Global Styles
  body {
  padding: 10px;
  }
  We can also use 3rd party libs like `tailwind-css` or `bootstrap`

11. How to render an HTML string coming from the server.

### Answer

To render an HTML string received from the server in a React component, we use the dangerouslySetInnerHTML props. Make sure that the HTML content you're rendering is safe and doesn't contain untreated content inside it.

Const htmlString=”<div>test</div>”

   <div dangerouslySetInnerHTML={{ __html: htmlString }} />
