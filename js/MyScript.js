$(document).ready(function(){
// Design & visibility

    $("#signup-link").click(function(){
        $("#signup-content").css('visibility','visible').hide().fadeIn().removeClass('hidden');
        $("#signup").css('visibility','visible').hide().fadeIn().removeClass('hidden');
        $("#signup-link").hide();
        $("#signin").hide();
        $("#login").hide();
    });

// Sign up
    $("#signup").click(function(){
        email = $("#email").val();
        password = $("#password").val();
        username = $("#username").val();
        phone = $("#phone").val();
        fname = $("#fname").val();
        lname = $("#lname").val();

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

                var errorMessage = error.message;
                $("#ErorrMsg").show().text(errorMessage);

        });

        function writeUserData(fname, lname, username, email, phone){
            firebase.database().ref('users/' + username).set({
                firstname: fname,
                lastname: lname,
                username: username,
                email: email,
                phone : phone
            });
        }

        writeUserData(fname, lname, username, email, phone);

    });

//Sign In

    $("#signin").click(function(){

        email = $("#logEmail").val();
        password = $("#logPass").val();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

            var errorMessage = error.message;
            $("#ErorrMsg").show().text(errorMessage);

        });

    });

//Authenticate User if Signed in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.username;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            console.log(displayName, email);

        } else {
            // User is signed out.
            // ...
        }
    });

})

