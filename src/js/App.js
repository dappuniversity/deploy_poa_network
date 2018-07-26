import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import SimpleStorage from '../../build/contracts/SimpleStorage.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      value: '',
      loading: true
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.setValue = this.setValue.bind(this)
  }

  componentDidMount() {
    const simpleStorage = TruffleContract(SimpleStorage)
    simpleStorage.setProvider(this.web3Provider)

    this.web3.eth.getAccounts((error, accounts) => {
      const account = accounts[0]
      this.setState({ account})

      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance
        return this.simpleStorageInstance.get.call()
      }).then((value) => {
        console.log('value:', value)
        return this.setState({ value, loading: false })
      })
    })
  }

  setValue(value) {
    this.simpleStorageInstance.set(value, { from: this.state.account, gas: 50000 }).then((r) => {
      this.setState({ value })
    })
  }

  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>Simple Storage</h1>
          <br/>
          { this.state.loading
            ? <p class='text-center'>Loading...</p>
            : <Content
                account={this.state.account}
                value={this.state.value}
                setValue={this.setValue} />
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
