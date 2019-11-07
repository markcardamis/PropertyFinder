import React from 'react';
// import './Filter';
import './Filter.css';
import SignIn from './SignIn'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            showSignIn: true,
            displaySignIn: 'none'
        }
        this.handleSignIn=this.handleSignIn.bind(this);
    }



    handleSignIn () {
        this.setState((prevstate)=>({
            showSignIn: !prevstate.showSignIn,
            displaySignIn: this.state.showSignIn ? 'block' : 'none'
          }));    }


    render () {
        console.log(this.state.displaySignIn)
        console.log(this.state.showSignIn)

        return (
            <div>
            <div className='filterWidget col-lg-2' style={{display: this.props.displayFilter}}>
                <p>Filter price
                    <input type='range' min='1' max='999'/>
                </p>
                <p>Filter square<br/>
                    <input type='text' style={{width: '60px'}} placeholder='min'/> - 
                    <input type='text' style={{width: '60px'}} placeholder='max'/>
                </p> 
                <p>Filter area              
                    <input type='text'/>
                </p>
                <p>Filter price per m<sup>2</sup>
                    <input type='text'/>
                </p>
                <button>Search</button>
                <button onClick={this.handleSignIn}>Save this filter</button>
            </div>
            <SignIn displaySignIn={this.state.displaySignIn}/>
            </div>
        )
    }
}

export default Filter;
