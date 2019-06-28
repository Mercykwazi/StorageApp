import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions/register'
import history from '../../history'
import { protectRoutes } from '../protectedRoutes'
import { checkUserStatus } from '../../index'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            firstName: "",
            lastName: "",
            telephone: "",
            email: "",
            redirect: false,
            isPasswordVisible: false,

        }
        this.businessName = this.businessName.bind(this)
        this.contactName = this.contactName.bind(this)
        this.telephone = this.telephone.bind(this)
        this.email = this.email.bind(this)
        this.password = this.password.bind(this)
        this.lastName = this.lastName.bind(this)
        this.saveData = this.saveData.bind(this)
        this.logIn = this.logIn.bind(this)
    }

    componentDidMount() {
        checkUserStatus()
    }
    email(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    businessName(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    contactName(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    lastName(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    telephone(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    password(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    async saveData(e) {
        e.preventDefault()
        var customerDetails = {
            name: this.state.firstName,
            surname: this.state.lastName,
            phoneNumber: this.state.telephone,
            email: this.state.email,
            password: this.state.password,
        }
        var results = await axios.post("http://localhost:3003/customer", customerDetails)
        if (results.status != 200) {
        } else {
            var checking = sessionStorage.setItem('jwtToken', results.data)
            this.props.authorizeCustomer()
            protectRoutes()
            history.push('/view-location')

        }
    }
    async logIn() {
        history.push("/log-in")
    }

    render() {
        return (<div>
            <h1 > Please Fill in your personal details</h1>
            <div className="signing">
            </div>
            <form>
                <div className="business">
                    <div >
                        <label htmlFor="email">Email:</label><br />
                        <input name="email" type="email" onChange={this.email} value={this.state.email} required />
                    </div>
                    <div className="password">
                        Password:<br />
                        {this.state.isPasswordVisible ?
                            <input name="password" type="text" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} required /> :
                            <input type='password' onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />}<br />
                        <p className='show' onClick={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}>{this.state.isPasswordVisible ? 'Hide' : 'Show'} Password</p>
                    </div>

                    <button className="button" onClick={this.saveData}>sign up</button>
                </div>
            </form>
            <footer className="footer">
                <p>Already have an account?</p>
                <button className="button" onClick={this.logIn}>Log in</button>
            </footer>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        state: state

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authorizeCustomer: () => {
            dispatch(actions.authorizeCustomer())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
