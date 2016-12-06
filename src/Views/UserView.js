import React from 'react';
import './UserView.css';

export default class UserView extends React.Component {
    render() {
        let row;
        let cars = this.props.userCars
        if(cars === undefined) {
            row = <div className="image-div">
                <div className="row" >
                    <div className="col-lg-12">
                        <h2>You don't have any purchases yet!</h2>
                        <p>You can go to showroom and purchase any car you want.</p>
                    </div>
                </div>
            </div>
        } else {
            row = cars.map(buildRow.bind(this));
        }


        function buildRow(car) {
            console.log(car)
            return <div className="image-div" key={car._downloadURL}>
                <div className="row" >
                    <div className="col-xs-6 centered">
                        <img className="img-responsive"
                             src={car._downloadURL}
                             role="presentation"/>
                    </div>
                    <div className="col-lg-4">
                        <h2>Your purchase is waiting to be confirmed!</h2>
                        <p>Our team is working hard. </p>
                        Your purchase will be approved as soon as possible.
                        Wait a call from us<p>
                        <a className="btn btn-danger"
                              onClick={this.props.deleteCarClicked.bind(this, car._id, sessionStorage.getItem("userId"))}>Remove from bucket.</a></p>
                    </div>
                </div>
            </div>
        }

        return (
            <div>
                <div id="greywrap">
                    <div className="container">
                        {row}
                    </div>
                </div>
            </div>
        );
    }
}