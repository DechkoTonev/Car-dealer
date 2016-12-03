import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.css';
import './css/main.css';
import './css/animate-custom.css';
import './css/icomoon.css';

import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import CreateBookView from './Views/CreateBookView';
import EditBookView from './Views/EditBookView';
import DeleteBookView from './Views/DeleteBookView';
import BooksView from './Views/BooksView';
import CarsView from './Views/CarsView'
import UserView from './Views/UserView'

import KinveyRequester from './KinveyRequester';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            userId: sessionStorage.getItem("userId")
        };
    }

    render() {
        return (
            <div className="App">
                    <header>
                        <NavigationBar
                            username={this.state.username}
                            homeClicked={this.showHomeView.bind(this)}
                            loginClicked={this.showLoginView.bind(this)}
                            registerClicked={this.showRegisterView.bind(this)}
                            booksClicked={this.showBooksView.bind(this)}
                            createBookClicked={this.showCreateBookView.bind(this)}
                            logoutClicked={this.logout.bind(this)}
                            showCarsClicked={this.showCarsView.bind(this)}
                            myCarsClicked={this.showMyCarsView.bind(this)}/>
                    </header>
                    <div className="notification-bar">
                            <div id="infoBox"></div>
                            <div id="errorBox"></div>
                            <div id="loadingBox"></div>
                    </div>
                <main id="main"></main>
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
        });

        // Attach a global AJAX error handler
        $(document).ajaxError(this.handleAjaxError.bind(this));

        // Hide the info / error boxes when clicked
        $("#infoBox, #errorBox").click(function() {
            $(this).fadeOut();
        });

        // Initially load the "Home" view when the app starts
        this.showHomeView();
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 4000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }

    showView(reactViewComponent) {
        ReactDOM.render(reactViewComponent,
            document.getElementById('main'));
        $('#errorBox').hide();
    }

    showHomeView() {
        this.showView(<HomeView username={this.state.username} />);
    }

    showCarsView() {
        KinveyRequester.loadCars()
            .then(loadCarsSuccess.bind(this));

        function loadCarsSuccess(cars) {
            this.showInfo("Cars loaded.");
            this.showView(
                <CarsView
                    cars={cars}
                    userId={this.state.userId}
                    buyCarClicked={this.markCarAsBought.bind(this)}
                />
            );
        }

    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)} />);
    }

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showBooksView();
            this.showInfo("Login successful.");
        }
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)} />);
    }

    register(username, password) {
        function isValid(pass, name) {
            //Test Password
            if(pass.length < 6) {
                this.showError("Password must best at least 6 symbols");
                return false;
            }

            if(pass === "123456") {
                this.showError("Password is too weak, use another");
                return false;
            }

            let tooEasyPasswords = [
                '123456',
                'password',
                '12345678',
                'qwerty',
                '12345',
                '123456789',
                'football',
                '1234',
                '1234567',
                'baseball',
                'welcome',
                '1234567890',
                'abc123',
                '111111',
                '1qaz2wsx',
                'dragon',
                'master',
                'monkey',
                'letmein',
                'login',
                'princess',
                'qwertyuiop',
                'solo',
                'passw0rd',
                'starwars',
                'iloveyou',
                'master',
                'trustno1',
                'letmein',
                '654321',
                'football',
                'bai hui'
            ];

            if (tooEasyPasswords.includes(pass)) {
                this.showError("Password is too easy");
                return false;
            }

            if(name.length < 4) {
                this.showError("Username must best at least 4 symbols");
                return false;
            }

            return true;
        }

        if(isValid.call(this, password, username)) {
            KinveyRequester.registerUser(username, password)
                .then(registerSuccess.bind(this));

            function registerSuccess(userInfo) {
                this.saveAuthInSession(userInfo);
                this.showBooksView();
                this.showInfo("User registration successful.");
            }
        }
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        });
    }

    logout() {
        KinveyRequester.logoutUser();
        sessionStorage.clear();
        this.setState({
                username: null, userId: null
            });
        this.showInfo('Logout successful.');
        this.showHomeView();
    }

    showBooksView() {
        KinveyRequester.findAllBooks()
            .then(loadBooksSuccess.bind(this));

        function loadBooksSuccess(posts) {
            this.showInfo("Posts loaded.");
            this.showView(
                <BooksView
                    books={posts}
                    userId={this.state.userId}
                    editBookClicked={this.prepareBookForEdit.bind(this)}
                    deleteBookClicked={this.confirmBookDelete.bind(this)}
                />
            );
        }
    }

    prepareBookForEdit(bookId) {
        KinveyRequester.findBookById(bookId)
            .then(loadBookForEditSuccess.bind(this));

        function loadBookForEditSuccess(bookInfo) {
            this.showView(
                <EditBookView
                    onsubmit={this.editBook.bind(this)}
                    bookId={bookInfo._id}
                    title={bookInfo.title}
                    description={bookInfo.description}
                    article={bookInfo.article}
                    imageUrl={bookInfo.imageUrl}
                />
            );
        }
    }

    editBook(bookId, title, description, article, imageUrl) {
        KinveyRequester.editBook(bookId, title, description, article, imageUrl)
            .then(editBookSuccess.bind(this));

        function editBookSuccess() {
            this.showBooksView();
            this.showInfo("Post edited.");
        }
    }

    confirmBookDelete(bookId) {
        KinveyRequester.findBookById(bookId)
            .then(loadBookForDeleteSuccess.bind(this));

        function loadBookForDeleteSuccess(bookInfo) {
            this.showView(
                <DeleteBookView
                    onsubmit={this.deleteBook.bind(this)}
                    bookId={bookInfo._id}
                    title={bookInfo.title}
                    description={bookInfo.description}
                    article={bookInfo.article}
                    imageUrl={bookInfo.imageUrl}
                />
            );
        }
    }

    deleteBook(bookId) {
        KinveyRequester.deleteBook(bookId)
            .then(deleteBookSuccess.bind(this));

        function deleteBookSuccess() {
            this.showBooksView();
            this.showInfo("Post deleted.");
        }
    }

    showCreateBookView() {
        this.showView(<CreateBookView onsubmit={this.createPost.bind(this)} />);
    }

    createPost(title, description, imageUrl, article) {
        KinveyRequester.createBook(title, description, imageUrl, article)
            .then(createPostSuccess.bind(this));

        function createPostSuccess() {
            this.showBooksView();
            this.showInfo("Post created.");
        }
    }

    markCarAsBought(carId, userId) {
        KinveyRequester.markCarAsBought(carId, userId)
            .then(redirectUserToHisPage.bind(this))

        function redirectUserToHisPage() {
            this.showInfo("Car Bought Successfully. Waiting for confirmation.");
            this.showMyCarsView();
        }
    }

    showMyCarsView() {
        let userId = sessionStorage.getItem("userId");
        KinveyRequester.findUserCars(userId)
            .then(FindCarsSuccess.bind(this));

        function FindCarsSuccess(cars) {
            if(cars.length < 1) {
                loadCarsSuccessful.apply(this, cars);
                return;
            }

            let carsId = [];
            cars.forEach(car => {
                let obj = {
                    "_id": car.carId
                };
                carsId.push(obj)
            });

            let query = {
                "$or": carsId
            };

            query = JSON.stringify(query);
            KinveyRequester.getCarsImage(query)
                .then(loadCarsSuccessful.bind(this));

            function loadCarsSuccessful(cars) {
                this.showInfo("Your cars are loaded.");
                this.showView(
                    <UserView
                        userCars={cars}
                        deleteCarClicked={this.deleteCar.bind(this)}
                    />
                );
            }
        }
    }

    deleteCar(carId, userId) {
        let query = {
            "carId": carId,
            "userId": userId
        };

        query = JSON.stringify(query);
        KinveyRequester.deleteCar(query)
            .then(carSuccessfullyDeleted.bind(this));

        function carSuccessfullyDeleted() {
            this.showInfo("Car successfully removed from bucket.");
            this.showMyCarsView();
        }
    }
}
