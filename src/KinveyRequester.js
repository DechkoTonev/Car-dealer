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
            url: baseUrl + "appdata/" + appKey + "/books",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findBookById(bookId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createBook(title, author, description) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/books",
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description }
        });
    }

    function editBook(bookId, title, author, description) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, description }
        });
    }

    function deleteBook(bookId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }
    
    function loadCars() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "blob/" + appKey,
            headers: getKinveyUserAuthHeaders()
        })
    }

    function markCarAsBought(carId, userId) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/boughtCars",
            headers: getKinveyUserAuthHeaders(),
            data: {carId, userId}
        });
    }

    function findUserCars(userId) {
        let userInfo = {
            "userId": userId
        };
        userInfo = JSON.stringify(userInfo);

        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/boughtCars?query=" + userInfo,
            headers: getKinveyUserAuthHeaders(),
        });
    }

    function getCarsImage(query) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "blob/" + appKey + "?query=" + query,
            headers: getKinveyUserAuthHeaders()
        })
    }

    function deleteCar(query) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/boughtCars?query=" + query + "&limit=1",
            headers: getKinveyUserAuthHeaders()
        })
    }

    function getThreePostsForHomeView(){
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + '/posts?limit=3&sort={"_kmd.lmt": -1}',
            headers: {
                'Authorization': "Basic " + btoa(appKey + ":6cecac00119b453fb8ce467fe44511a5"), // TODO: Nqkak da se izbegne.
            }
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

    return {
        loginUser, registerUser, logoutUser,
        findAllBooks, createBook, findBookById,
        editBook, deleteBook, loadCars,
        markCarAsBought, findUserCars, getCarsImage,
        deleteCar, getThreePostsForHomeView, sendRegisterMail,
        sendPurchasedCarMail
    }
})();

export default KinveyRequester;
