
import React from 'react';
import './CarsView.css';
import $ from 'jquery';
import '../css/animate-custom.css';
import '../css/icomoon.css';

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
                <div classNameName="col-md-4" key={carImage._id}>
                    <div classNameName="grid mask">
                        <figure>
                            <img src={carImage._downloadURL}
                                 role="presentation"/>
                        </figure>
                    </div>
                    <div classNameName="btnBuyCar">
                        <input type="button"
                               classNameName="btnBuyCar btn btn-info"
                               value={'Buy this car.'}
                               id="buyCar"
                               onClick={this.props.buyCarClicked.bind(this, carImage._id, sessionStorage.getItem("userId"))} />
                    </div>
                </div>
            );
        } else {
            carsImages = <div classNameName="row">
                <h1 classNameName="centered">Currently we have no cars to sell.</h1>
            </div>
        }

        div = (<section classNameName="section-divider">
            <div classNameName="container" id="portfolio" name="portfolio">
                <div classNameName="row">
                    <h1 classNameName="centered">WE SELL GOOD CARS.</h1>
                </div>

                <div>
                    {carsImages}
                </div>
            </div>
        </section>);
        return (
            <div className="container" id="team" name="team">

                <div className="row white centered">
                    <h1 className="centered">OUR PURCHASES WAITING CONFIRMATION</h1>



                    <div className="col-lg-3 centered">
                        <img className="img img-circle" src="assets/img/team/team01.jpg" height="120px" width="120px" alt=""/>

                        <h4><b>Mike Arney</b></h4>
                        <a href="#" className="icon icon-twitter"></a>
                        <a href="#" className="icon icon-facebook"></a>
                        <a href="#" className="icon icon-flickr"></a>
                        <p>Mike combines an expert technical knowledge with a
                            real eye for design. Working with clients from a wide range of industries,
                            he fully understands client objectives when working on a project,
                            large or small.</p>
                    </div>

                    <div className="col-lg-3 centered">
                        <img className="img img-circle" src="assets/img/team/team02.jpg" height="120px" width="120px" alt=""/>

                        <h4><b>Tim Davies</b></h4>
                        <a href="#" className="icon icon-twitter"></a>
                        <a href="#" className="icon icon-facebook"></a>
                        <a href="#" className="icon icon-flickr"></a>
                        <p>Tim is an experienced marcoms practitioner and manages projects from
                            inception to delivery. He understands the synergy between great
                            design and commercial effectiveness which shines through on every project.</p>
                    </div>

                    <div className="col-lg-3 centered">
                        <img className="img img-circle" src="assets/img/team/team03.jpg" height="120px" width="120px" alt=""/>

                        <h4><b>Michele Lampa</b></h4>
                        <a href="#" className="icon icon-twitter"></a>
                        <a href="#" className="icon icon-facebook"></a>
                        <a href="#" className="icon icon-flickr"></a>
                        <p>Be a creative director is a hard task, but Michele loves what she does.
                            Her combination of knowledge and expertise is an important pillar in our agency.</p>
                    </div>

                    <div className="col-lg-3 centered">
                        <img className="img img-circle" src="assets/img/team/team04.jpg" height="120px" width="120px" alt=""/>

                        <h4><b>Jaye Smith</b></h4>
                        <a href="#" className="icon icon-twitter"></a>
                        <a href="#" className="icon icon-facebook"></a>
                        <a href="#" className="icon icon-flickr"></a>
                        <p>Jaye began making websites when animated logos and scrolling text were cool,
                            but has since found a love for simplicity, creating websites that are a pleasure to browse.
                            Monkey Island Fan.</p>
                    </div>

                </div>
            </div>
        );
    }
}


