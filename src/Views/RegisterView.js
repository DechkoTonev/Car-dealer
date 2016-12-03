import React, { Component } from 'react';

export default class RegisterView extends Component {
    render() {
        return (
            //<form className="register-form" onSubmit={this.submitForm.bind(this)}>
            //    <h1>Register</h1>
            //    <label>
            //        <div>Username:</div>
            //        <input type="text" name="username" required
            //               ref={e => this.usernameField = e} />
            //    </label>
            //    <label>
            //        <div>Password:</div>
            //        <input type="password" name="password" required
            //               ref={e => this.passwordField = e} />
            //    </label>
            //    <div>
            //        <input type="submit" value="Register" />
            //    </div>
            //</form>

            <section className="section-divider textdivider divider6">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="login">
                                <p>Register.</p>
                                <p>Register a new user.</p>
                                <form className="col-xs-12 form-horizontal" role="form" onSubmit={this.submitForm.bind(this)}>
                                    <div className="form-group">
                                        <label className="control-label"></label>
                                        <div className="">
                                            <input type="text" className="form-control"
                                                   id="inputName" placeholder="Enter your username"
                                                   ref={e => this.usernameField = e} required/>
                                        </div>
                                    </div>
                                    <div className=" form-group">
                                        <label className="control-label"></label>
                                        <div className="">
                                            <input className="form-control" placeholder="Enter your Password"
                                                   type="password" name="password" required
                                                   ref={e => this.passwordField = e}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="">
                                            <button type="submit" className="btn btn-success">Register</button>
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
