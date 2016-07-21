

```
store$.filter(key => key == `counters|${ counter_id }`)

@watch([
  "counters|{ counter_id }|name"
])
class CounterName extends React.Component {
  render () {
    var { counter_id } = this.props
    return <strong>
      { get(`counters|${ counter_id }|name`) }
    </strong>
  }
}



@dom("COUNTER")
@watch(({ counter_id }) => [
  `counters|${ counter_id }|name`,
  `counters|${ counter_id }|count`,
])
export default class Counter extends React.Component {
  render () {
    var { counter_id } = this.props

    var name  = get(`counters|${ counter_id }|name`)
    var count = get(`counters|${ counter_id }|count`)
    var inc   = () => dispatch("counter_inc", counter_id)
    var dec   = () => dispatch("counter_dec", counter_id)

    return <div>
      <strong>{ name }</strong>
      <button onClick={ dec }>-</button>
      </span>{ count }</span>
      <button onClick={ inc }>+</button>
    </div>
  }
}

store.register("counter_dec", ($$$, counter_id) => $$$.update(`counters|${ counter_id }|count`, val => val - 1))
store.register("counter_inc", ($$$, counter_id) => $$$.update(`counters|${ counter_id }|count`, val => val + 1))
```
