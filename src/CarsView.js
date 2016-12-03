import React from 'react';
import './CarsView.css';
import $ from 'jquery';

export default class CarsView extends  React.Component {
    componentDidMount() {
        let buttons = $("#buyCar");
        buttons.attr('disabled', false);
        buttons.on('click', function () {
            $("#buyCar").attr('disabled', true);
        })
    }

    render() {
        let carsImages = [];
        let div;
        if(this.props.cars) {
            carsImages = this.props.cars.map(carImage =>
                <div className="col-md-4" key={carImage._id}>
                    <div className="grid mask">
                        <figure>
                            <img src={carImage._downloadURL}
                                 role="presentation"/>
                        </figure>
                    </div>
                    <div className="btnBuyCar">
                        <input type="button"
                               className="btnBuyCar btn btn-info"
                               value={'Buy this car.'}
                               id="buyCar"
                        onClick={this.props.buyCarClicked.bind(this, carImage._id, sessionStorage.getItem("userId"))} />
                    </div>
                </div>
            );
        } else {
            carsImages = <div className="row">
                <h1 className="centered">Currently we have no cars to sell.</h1>
            </div>
        }

        div = (<section className="section-divider">
            <div className="container" id="portfolio" name="portfolio">
                <div className="row">
                    <h1 className="centered">WE SELL GOOD CARS.</h1>
                </div>

                <div>
                    {carsImages}
                </div>
            </div>
        </section>);
        return (
            <div>
                {div}
            </div>
        );
    }
}
