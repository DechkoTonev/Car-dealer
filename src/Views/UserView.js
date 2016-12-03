import React from 'react';
import './CarsView.css';

export default class UserView extends  React.Component {
    render() {

        let cars = this.props.userCars.map(book =>
            <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                {this.getActions(book, this.props.userId)}
            </tr>
        );

        return (
            <div>
                <div id="greywrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 centered">
                                <img className="img-responsive"
                                     src="https://www.dpreview.com/files/p/articles/5225148710/5S_photo_6.jpg"
                                     role="presentation"/>
                            </div>
                            <div className="col-lg-4">
                                <h2>We Are Hiring!</h2>
                                <p>Do you want to be one of use? Sure you want, because we are an awesome team!. Here we work hard every day to craft pixel perfect sites.</p>
                                <p><a className="btn btn-danger">Contact Us</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}