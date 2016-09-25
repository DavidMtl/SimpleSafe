var token = localStorage["token"];
// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("auth_button").addEventListener("click", function(){
		authorize();
	});

    document.getElementById("nfs_post_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;
        var content = document.getElementById("content").value;
        post(filename, content);
	});

    document.getElementById("nfs_get_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;
        get(filename);
	});

    document.getElementById("nfs_delete_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;
        remove(filename);
	});
}, false);


function authorize() {
    console.log("authorizing...");

    // Prepare the request
    var request = new XMLHttpRequest();
    request.open("post", "http://api.safenet/auth", true);
    request.setRequestHeader("Content-type", "application/json");

    // Create callback functions to handle the response.
    request.onerror = function () {
        console.log(this.responseText);
    };
    request.onload = function() {
        if (this.status == 200) {
            console.log("SUCCESS:" + this.responseText);
            var response = JSON.parse(this.responseText);
            token = response.token;
            localStorage["token"] = token;
        } else {
            console.log("ERROR:" + this.responseText);
        }
    };

    // Create the payload that will be sent with the request
    var payload = {
        app: {
            name: "Simple SAFE API example",
            version: "1.0.0",
            vendor:  "your_name",
            id: "your_app_id"
        }
    };

    // Send the request
    var payload_string = JSON.stringify(payload);
    request.send(payload_string);
}

function post(filename, content) {
    console.log("post file:" + filename);

    // Prepare the request
    var request = new XMLHttpRequest();
    request.open("post", "http://api.safenet/nfs/file/app/" + filename, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    // Create callback functions to handle the response.
    request.onerror = function () {
        console.log(this.responseText);
    };
    request.onload = function() {
        if (this.status == 200) {
            console.log("SUCCESS:" + this.responseText);
        } else {
            console.log("ERROR:" + this.responseText);
        }
    };

    // Create the payload that will be sent with the request
    var payload = {
        content:content
    };

    // Send the request
    var payload_string = JSON.stringify(payload);
    request.send(payload_string);
}

function get(filename) {
    console.log("get file:" + filename);

    // Prepare the request
    var request = new XMLHttpRequest();
    request.open("get", "http://api.safenet/nfs/file/app/" + filename, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    // Create callback functions to handle the response.
    request.onerror = function () {
        console.log(this.responseText);
    };
    request.onload = function() {
        if (this.status == 200) {
            console.log("SUCCESS:" + this.responseText);
        } else {
            console.log("ERROR:" + this.responseText);
        }
    };

    // There's no payload for the get request

    // Send the request
    request.send();
}

function remove(filename) {
    console.log("delete file:" + filename);

    // Prepare the request
    var request = new XMLHttpRequest();
    request.open("delete", "http://api.safenet/nfs/file/app/" + filename, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    // Create callback functions to handle the response.
    request.onerror = function () {
        console.log(this.responseText);
    };
    request.onload = function() {
        if (this.status == 200) {
            console.log("SUCCESS:" + this.responseText);
        } else {
            console.log("ERROR:" + this.responseText);
        }
    };

    // There's no payload for the delete request

    // Send the request
    request.send();
}
