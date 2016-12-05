
import React from 'react';
import './CarsView.css';
import '../css/animate-custom.css';
import '../css/icomoon.css';

export default class CarsView extends  React.Component {

    render() {
        let purchases = [];
        let div;
        if(this.props.purchases) {
            purchases = this.props.purchases.map(purchase =>
                <div className="col-lg-3 centered" key={purchase._id}>
                    <img className="img img-circle" src={purchase.imageUrl} height="240px" width="240px" role="presentation"/>

                    <h3><b>{purchase.username}</b></h3>
                    <h5><b>{purchase.userEmail}</b></h5>
                    <div className="btnBuyCar">
                        <input type="button"
                               className="btnBuyCar btn btn-success"
                               value={'Approve this purchase.'}
                               onClick={this.props.carApproveClicked.bind(this, purchase._id, purchase.userEmail )} />
                        <input type="button"
                               className="btnBuyCar btn btn-danger"
                               value={'Disapprove this purchase.'}
                               onClick={this.props.carDisapproveClicked.bind(this, purchase._id, purchase.userEmail )}/>
                    </div>
                </div>
            );
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


