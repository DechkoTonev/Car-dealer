import React from 'react';
import './CarsView.css';
import $ from 'jquery';
import '../App.css'

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
            carsImages = this.props.cars.map(car =>
                <div className="col-md-4" key={car._id}>
                    <div className="grid mask">
                        <figure>
                            <div className="test-under-picture"><p className="title-showroom">Brand:</p> <p className="data-showroom">{car.brand}</p></div>
                            <div className="crop">
                                <img src={car.imageUrl} role="presentation" />
                            </div>
                            <div className="test-under-picture"><p className="title-showroom">Model:</p> <p className="data-showroom">{car.model}</p></div>
                            <div className="test-under-picture"><p className="title-showroom">Price:</p> <p className="data-showroom">{car.price}$</p></div>
                        </figure>
                    </div>
                    <div className="btnBuyCar">
                        <input type="button"
                               className="btnBuyCar btn btn-info form-btn-home"
                               value={'Buy this car.'}
                               id="buyCar"
                        onClick={this.props.buyCarClicked.bind(this, car._id, sessionStorage.getItem("userId"),
                            car.brand, car.model, car.imageUrl, car.price,
                            sessionStorage.getItem("email"), sessionStorage.getItem("username"))} />
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
                    <h1 className="centered">WE SELL GOOD CARS</h1>
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
