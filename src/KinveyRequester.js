import $ from 'jquery';

const KinveyRequester = (function() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_BkLbUbCfe";
    const appSecret = "72cff42965064d30962957c3e0fdd567";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function registerUser(username, password, email) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password, email }
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function getKinveyUserAuthHeadersWithContentTypeJSon() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
            "Content-Type": "application/json"
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    }

    function findAllBooks() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findBookById(postId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createBook(title, description, imageUrl, article) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/posts",
            headers: getKinveyUserAuthHeaders(),
            data: { title, description, imageUrl, article }
        });
    }

    function createCar(brand, model, imageUrl, price){
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/cars",
            headers: getKinveyUserAuthHeaders(),
            data: { brand, model, imageUrl, price}
        });
    }

    function editBook(postId, title, description, article, imageUrl) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, description, article, imageUrl }
        });
    }

    function deleteBook(postId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/posts/" + postId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function loadCars() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/cars",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function markCarAsBought(carId, userId, carBrand, carModel, carImage, carPrice, email, username) {
        let obj = {
            "carId": carId,
            "userId": userId,
            "carBrand":  carBrand,
            "carModel": carModel,
            "carImage":  carImage,
            "carPrice": carPrice,
            "email": email,
            "username": username,
            "_acl" : {
                "w": ["5841ac6200a5907e7dd6fe90"]
            }
        };

        obj = JSON.stringify(obj);

        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/boughtCars",
            headers: getKinveyUserAuthHeadersWithContentTypeJSon(),
            data: obj
        });
    }

    function findUserCars(userId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + '/boughtCars/?query={"userId":"' + userId + '"}',
            headers: getKinveyUserAuthHeaders(),
        });
    }

    function deleteCar(id) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/boughtCars/" + id,
            headers: getKinveyUserAuthHeaders()
        })
    }

    function getThreePostsForHomeView(){
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + '/posts?limit=3&sort={"_kmd.lmt": -1}',
            headers: getKinveyUserAuthHeaders()
        });
    }

    function sendRegisterMail(email) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + '/custom/registrationMail',
            headers: getKinveyUserAuthHeaders(),
            data: {
                "email": email
            }
        });
    }

    function sendPurchasedCarMail(email) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + '/custom/purchaseCarMail',
            headers: getKinveyUserAuthHeaders(),
            data: {
                "email": email
            }
        });
    }

    function sendDisapprovedPurchaseMail(email) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + '/custom/deleteCarPurchase',
            headers: getKinveyUserAuthHeaders(),
            data: {
                "email": email
            }
        });
    }

    function sendApprovedPurchaseMail(email) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + '/custom/confirmCarPurchase',
            headers: getKinveyUserAuthHeaders(),
            data: {
                "email": email
            }
        });
    }

    function getAllPurchases() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/boughtCars",
            headers: getKinveyUserAuthHeaders(),
        });
    }

    return {
        loginUser, registerUser, logoutUser,
        findAllBooks, createBook, findBookById, editBook, deleteBook,
        loadCars, markCarAsBought, findUserCars, deleteCar, getThreePostsForHomeView,
        sendPurchasedCarMail, sendRegisterMail, createCar, getAllPurchases,
        sendDisapprovedPurchaseMail, sendApprovedPurchaseMail
    }
})();

export default KinveyRequester;
