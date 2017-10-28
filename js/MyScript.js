

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
            if(username == ""){
                exit(1);
            }

            //Create custom directory address for db storage path
            /*
            part1 = email.split("@")[0]; // part before @
            part2 = email.split("@")[1];
            part21 = part2.split(".")[0]; // part after @ and before .
            part22 = part2.split(".")[1]; // part after .

            firebase.database().ref('users/' + part1 + '~' + part21 + '~' + part22).set({
                firstname: fname,
                lastname: lname,
                username: username,
                email: email,
                phone : phone
            });*/
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: "Jane Q. User",
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function() {
                console.log(user.displayName);
                // Update successful.
            }).catch(function(error) {
                // An error happened.
            });
        }

        writeUserData(fname, lname, username, email, phone);

    });

//Sign In

    $("#signin").click(function(){

        email = $("#logEmail").val();
        password = $("#logPass").val();

        ref = firebase.database().ref();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                $(function () {
                    $('#loginModal').modal('toggle');
                });


            })
            .catch(function(error) {
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

            var part1 = user.email.split('@')[0];
            var part2 = user.email.split('@')[1];
            var part21 = part2.split('.')[0];
            var part22 = part2.split('.')[1];

            // DB unique userID generated as under
            var db_ref = part1 +'~'+ part21 +'~'+ part22;

            // Now querying data using this generated unique ID
            var user = firebase.database().ref('users/' + db_ref);
            user.on('value', function(snapshot) {
                //console.log(snapshot.val());
                //Current user lies in snapshot.val()
                //Note that in manage users, Firebase provides same functionality to get current user and..
                // we can set the attributes from there as well as soon as someone signs up and directly access the user
                // from the provided code in manage users. However, here I will use the custom created db for users.

                $("#uname").text("Welcome " + snapshot.val().firstname);
                $("#uname").show();
                $("#barr").show();
                $("#barr").css("background-color", "#245269");
                $("#loginclick").hide();
                $("#logoutBtn").show();
                $("#uname").css('visibility', 'visible', 100);
            });




        } else {
            // User is signed out.
            // ...

            $("#loginclick").show();
            $("#barr").hide();
            $("#logoutBtn").hide();
        }
    });


    // Logout
    $("#logoutBtn").click(function(){

        firebase.auth().signOut().then(function() {
            $("#loginclick").css("display", "block", 100);
            $("#barr").css('visibility', 'hidden', 101);

            $("#logoutBtn").hide();
            
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    });

})

