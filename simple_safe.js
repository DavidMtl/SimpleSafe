var token;
// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("auth_button").addEventListener("click", function(){
        let app = {
           name: 'SimpleSafe2',
           id: 'davidmtl.simplesafe2',
           version: '0.0.1',
           vendor: 'davidmtl',
           permissions: [],
          }

        window.safeAuth.authorise(app).then(function(response) {
            console.log(response);
            token = response.token;
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("nfs_post_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;
        var content = document.getElementById("content").value;
      	window.safeNFS.createFile(token, filename, content).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("nfs_get_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;

        window.safeNFS.getFile( token, filename ).then( response =>
        {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("nfs_delete_button").addEventListener("click", function(){
        var filename = document.getElementById("filename").value;
        window.safeNFS.deleteFile(token, filename).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("create_dir_button").addEventListener("click", function(){
        var directory = document.getElementById("directory").value;
      	window.safeNFS.createDir(token, directory).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("get_dir_button").addEventListener("click", function(){
        var directory = document.getElementById("directory").value;
      	window.safeNFS.getDir(token, directory).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});

    document.getElementById("delete_dir_button").addEventListener("click", function(){
        var directory = document.getElementById("directory").value;
      	window.safeNFS.deleteDir(token, directory).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log("ERROR:" + error);
        });
	});
}, false);
