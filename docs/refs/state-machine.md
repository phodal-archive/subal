# 状态机

## 库

[xstate](https://github.com/davidkpiano/xstate)

## 文章

https://hackernoon.com/upgrade-your-react-ui-with-state-machines-30d1298e90be

用户界面与状态机，对应的 React 代码示例：

```
// https://github.com/francisrstokes/React-Machinerys
const states = [
  {
    name: 'wait-for-input',
    validTransitions: ['pending'],
    beforeRender: ({resetTimer}) => resetTimer(),
    render: ({message, transitionTo}) =>
      <button onClick={() => transitionTo('pending')}>{message}</button>
  },
  {
    name: 'pending',
    validTransitions: ['aborted'],
    autoTransitions: [
      {
        test: ({timer}) => timer <= 0,
        newState: 'done'
      }
    ],
    component: Pending
  },
  {
    name: 'aborted',
    validTransitions: ['wait-for-input'],
    render: ({transitionTo}) =>
      <button onClick={() => transitionTo('wait-for-input')}>Aborted. Return?</button>
  },
  {
    name: 'done',
    component: DoAction
  }
];

// Pending.jsx
export class Pending extends React.Component {
  componentDidMount() {
    this.interval = setInterval(this.props.decreaseTimeLeft, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  abort = () => {
    this.props.transitionTo('aborted');
  }
  
  render() {
    return <button onClick={this.abort}>
      Action will automatically take place in {this.props.timer} seconds. Click to abort!
    </button>
  }
}

// DoAction.jsx
export class DoAction extends React.Component {
  componentDidMount() {
    this.props.action();
  }

  render() {
    return <button disabled>Done.</button>
  }
}
```

[The Rise Of The State Machines](https://www.smashingmagazine.com/2018/01/rise-state-machines/)

另外一个关于状态机的讨论。
