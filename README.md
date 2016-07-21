# Dont mind me - Work In Progress

- [x] guid
- [x] cursor
- [x] has
- [x] get
- [x] update
- [ ] push
- [ ] unshift
- [ ] pop
- [ ] shift
- [x] on/off
- [x] emit with bubbling
- [x] @watch


```jsx
var React = require("react")
var $     = require("bc-flux")


// -- Decorators --
var watch = (paths) => Comp => {
  return class Watch extends React.Component {
    constructor () {
      super()
      this.state = { __tick__:$.guid() }
    }

    componentWillMount () {
      this.sub = $.on(paths.map(path => $.cursor(path, this.props).join("|")), () => {
        this.setState({ __tick__:$.guid() })
      })
    }

    componentWillUnmount () {
      this.sub()
    }

    render () {
      return <Comp {...this.props} {...this.state} />
    }
  }
}


// -- Intents --
const create_counter = (name, count = 0) => {
  var id = $.guid()

  var counter = { id, name, count }

  return api.Counters.create(counter)
    .then(() => {
      $.set(`counters|${ id }|id`,    id)
       .set(`counters|${ id }|name`,  name)
       .set(`counters|${ id }|count`, count)
       .push(`counters_known`, id)
      return id
    })
    .catch(err => console.error(err))
}

const inc_counter = counter_id =>
  api.Counters.inc(counter_id)
    .then(() => {
      $.update(`counters|${ counter_id }|count`, value => value + 1, 0)
    })
    .catch(err => console.error(err))

const dec_counter = counter_id =>
  api.Counters.dec(counter_id)
    .then(() => {
      $.update(`counters|${ counter_id }|count`, value => value - 1, 0)
    })
    .catch(err => console.error(err))


// -- Components --
@watch([
  "counters|{ counter_id }",
])
class Counter extends React.Component {
  render () {
    var { counter_id } = this.props

    var name  = $.get(`counters|${ counter_id }|name`)  || "unnamed"
    var count = $.get(`counters|${ counter_id }|count`) || 0

    return <div>
      <strong>{ name }</strong>
      <button onClick={() => dec_counter(counter_id) }>-</button>
      <span>{ count }</span>
      <button onClick={() => inc_counter(counter_id) }>+</button>
    </div>
  }
}

@watch([
  "counters_known",
])
class Counters extends React.Component {
  constructor () {
    super()
    this.state = { processing:false }
    this.submit = this.submit.bind(this)
  }

  render () {
    var counters = $.get("counters_known") || []

    return <div>
      <form onSubmit={ this.submit }>
        <input ref="name"/>
        <button onClick={ this.submit }>
          { this.state.processing ? "Processing" : "Add Counter" }
        </button>
      </form>
      <div>
        { counters.map(counter_id => <Counter key={ counter_id } counter_id={ counter_id }/>) }
      </div>
    </div>
  }

  submit (e) {
    if (e) e.preventDefault()
    if (this.refs.input.value === "") return
    this.setState({ processing:true })

    create_counter(this.refs.input.value)
      .then(() => {
        this.setState({ processing:false })
        this.refs.input.value = ""
      })
      .catch(() => {
        this.setState({ processing:false })
      })
  }
}
```
