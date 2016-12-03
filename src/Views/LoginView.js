import React, { Component } from 'react';

export default class LoginView extends Component {
    render() {
        return (
            <section className="section-divider textdivider divider6">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="login">
                                <p>Login.</p>
                                <p>Log in into your profile.</p>
                                <form className="col-xs-12 form-horizontal" role="form" onSubmit={this.submitForm.bind(this)}>
                                    <div className="form-group">
                                        <label className="control-label"></label>
                                        <div className="">
                                            <input type="text" className="form-control"
                                                   id="inputName" placeholder="Enter Username"
                                                   ref={e => this.usernameField = e} required/>
                                        </div>
                                    </div>
                                    <div className=" form-group">
                                        <label className="control-label"></label>
                                        <div className="">
                                            <input className="form-control" placeholder="Enter Password"
                                                   type="password" name="password" required
                                                          ref={e => this.passwordField = e}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="">
                                            <button type="submit" className="btn btn-success">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.usernameField.value, this.passwordField.value);
    }
}
