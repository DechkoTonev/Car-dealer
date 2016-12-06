
import React from 'react';
import './CarsView.css';
import '../css/animate-custom.css';
import '../css/icomoon.css';

export default class CarsView extends  React.Component {

    render() {
        let purchases = [];
        let div;
        if(this.props.purchases.length > 0) {
            purchases = this.props.purchases.map(purchase =>
                <div className="col-md-4 centered" key={purchase._id}>
                    <div className="grid mask">
                        <figure>
                            <div className="test-under-picture"><p className="title-showroom">Brand:</p> <p className="data-showroom">{purchase.carBrand}</p></div>
                            <div className="crop">
                                <img src={purchase.carImage} role="presentation"/>
                            </div>
                            <div className="test-under-picture"><p className="title-showroom">Model:</p> <p className="data-showroom">{purchase.carModel}</p></div>
                            <div className="test-under-picture"><p className="title-showroom">Price:</p> <p className="data-showroom">{purchase.carPrice}$</p></div>
                            <div className="test-under-picture"><p className="title-showroom">Username:</p> <p className="data-showroom">{purchase.username}</p></div>
                            <div className="test-under-picture"><p className="title-showroom">User email:</p> <p className="data-showroom">{purchase.email}</p></div>
                        </figure>
                    </div>
                    <div className="btnBuyCar">
                        <input type="button"
                               className="btnBuyCar btn btn-success"
                               value={'Approve this purchase.'}
                               onClick={this.props.carApproveClicked.bind(this, purchase._id, purchase.email )} />
                        <input type="button"
                               className="btnBuyCar btn btn-danger"
                               value={'Disapprove this purchase.'}
                               onClick={this.props.carDisapproveClicked.bind(this, purchase._id, purchase.email )}/>
                    </div>
                </div>
            );
        }
        else {
            purchases =
                <h1 className="centered">Currently we do not have any purchaes.</h1>
        }


        return (
            <div className="container" id="team" name="team">

                <div className="row white centered">
                    <h1 className="centered">OUR PURCHASES WAITING CONFIRMATION</h1>
                    {purchases}
                </div>
            </div>
        );
    }
}


