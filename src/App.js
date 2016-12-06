import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.css';
import './css/main.css';
import './css/animate-custom.css';
import './css/icomoon.css';
import './css/notification.css';

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
import PostsView from './Views/PostsView'
import CreateCarView from './Views/CreateCarView'
import AdminPanel from './Views/AdminPanelView'
import toastr from 'toastr';

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
                            userId={this.state.userId}
                            homeClicked={this.showHomeView.bind(this)}
                            loginClicked={this.showLoginView.bind(this)}
                            registerClicked={this.showRegisterView.bind(this)}
                            booksClicked={this.showBooksView.bind(this)}
                            createBookClicked={this.showCreateBookView.bind(this)}
                            createCarClicked={this.showCreateCarView.bind(this)}
                            logoutClicked={this.logout.bind(this)}
                            showCarsClicked={this.showCarsView.bind(this)}
                            myCarsClicked={this.showMyCarsView.bind(this)}
                            adminPanelClicked={this.showAdminPanelView.bind(this)}/>
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

    showCreateCarView(){
        this.showView(<CreateCarView onsubmit={this.createCar.bind(this)} />);
    }

    createCar(brand, model, imageUrl, price) {
        KinveyRequester.createCar(brand, model, imageUrl, price)
            .then(createCarSuccess.bind(this));

        function createCarSuccess() {
            this.showCarsView();
            this.showInfo("Car created.");
        }
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
        toastr["success"](message, "Success");

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "show",
            "hideMethod": "fadeOut"
        };
    }

    showError(errorMsg) {
        toastr["error"](errorMsg, "Error.");

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "200000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "show",
            "hideMethod": "fadeOut"
        };
    }

    showView(reactViewComponent) {
        ReactDOM.render(reactViewComponent,
            document.getElementById('main'));
        $('#errorBox').hide();
    }

    showHomeView() {
        let username = sessionStorage.getItem('username');

        if(username == null){
            this.showView(
                <HomeView />
            )
        }else {
            KinveyRequester.getThreePostsForHomeView()
                .then(loadThreePostsForHomeViewSuccess.bind(this));
        }

        function loadThreePostsForHomeViewSuccess(posts){
            this.showView(
                <HomeView
                    username={sessionStorage.getItem("username")}
                    userId={sessionStorage.getItem("userId")}
                    posts={posts}
                    readArticleClicked={this.showArticleView.bind(this)}
                />
            );
        }


    }

    showArticleView(postId){
        KinveyRequester.findBookById(postId)
            .then(loadArticleSuccess.bind(this));

        function loadArticleSuccess(postInfo){
            this.showView(
                <PostsView
                    postId={postInfo._id}
                    postTitle={postInfo.title}
                    postDescription={postInfo.description}
                    postArticle={postInfo.article}
                    postImageUrl={postInfo.imageUrl}
                />
            )
        }

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
            this.showHomeView();
            this.showInfo("Login successful.");
        }
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)} />);
    }

    register(username, password, email) {
        function isValid(pass, name, email) {
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

			//test Username
            if(name.length < 4) {
                this.showError("Username must best at least 4 symbols");
                return false;
            }
			
			//test Email
            if(!/^[A-Za-z\d]+@[a-z]+\.[a-z]+$/g.test(email)){
                this.showError("Enter a valid email address.");
                return false;
            }

            return true;
        }

        if(isValid.call(this, password, username, email)) {
            KinveyRequester.registerUser(username, password, email)
                .then(registerSuccess.bind(this));

            function registerSuccess(userInfo) {
                this.saveAuthInSession(userInfo);
				KinveyRequester.sendRegisterMail(email);
                this.showHomeView();
                this.showInfo("User registration successful.");
            }
        }
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
		sessionStorage.setItem('email', userInfo.email);

        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: userInfo.username,
            userId: userInfo._id,
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

    markCarAsBought(carId, userId, carBrand, carModel, carImage, carPrice, email, username) {
        KinveyRequester.markCarAsBought(carId, userId, carBrand, carModel, carImage, carPrice, email, username)
            .then(redirectUserToHisPage.bind(this))

        function redirectUserToHisPage() {
			let email = sessionStorage.email;
            KinveyRequester.sendPurchasedCarMail(email);
            this.showInfo("Car Bought Successfully. Waiting for confirmation.");
            this.showMyCarsView();
        }
    }

    showMyCarsView() {
        let userId = sessionStorage.getItem("userId");
        KinveyRequester.findUserCars(userId)
            .then(FindCarsSuccess.bind(this));

            function FindCarsSuccess(cars) {
                this.showInfo("Your cars are loaded.");
                this.showView(
                    <UserView
                        userCars={cars}
                        deleteCarClicked={this.deleteCar.bind(this)}
                    />
                );
            }
        }

    showAdminPanelView() {
        KinveyRequester.getAllPurchases()
            .then(loadingSuccess.bind(this));

        function loadingSuccess(data) {
            this.showView(<AdminPanel
                purchases={data}
                carDisapproveClicked={this.disapprovedPurchase.bind(this)}
                carApproveClicked={this.approvedPurchase.bind(this)}/>)
        }
    }

    disapprovedPurchase(purchaseId, userEmail) {
        KinveyRequester.sendDisapprovedPurchaseMail(userEmail);
        KinveyRequester.deleteCar(purchaseId)
            .then(successDelete.bind(this));

        function successDelete() {
            this.showInfo("Purchase was successfully disapproved.");
            this.showAdminPanelView();
        }
    }

    approvedPurchase(purchaseId, userEmail) {
        KinveyRequester.sendApprovedPurchaseMail(userEmail);
        KinveyRequester.deleteCar(purchaseId)
            .then(successDelete.bind(this));

        function successDelete() {
            this.showInfo("Purchase was successfully approved.");
            this.showAdminPanelView();
        }
    }

    deleteCar(carId ) {

        KinveyRequester.deleteCar(carId)
            .then(carSuccessfullyDeleted.bind(this));

        function carSuccessfullyDeleted() {
            this.showInfo("Car successfully removed from bucket.");
            this.showMyCarsView();
        }
    }
}
