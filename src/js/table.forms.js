$(document).ready(function() {
    $('#data-rows').DataTable();
} );


/* auto expand textarea */
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

/* Show customer form to create a new account on the blockchain */
function showAddAccountFrm() {
    var htmlFormDiv = document.getElementById("form-div");

    htmlFormDiv.innerHTML = 
        '<div class="form-style-8" id="create-account-form"> \
            <h2>Create New Account</h2> \
            <form> \
                <input type="text" id="account_name" name="accountName" placeholder="Account Name" /> \
                <textarea placeholder="Account Description" id="account_desc" onkeyup="adjust_textarea(this)"></textarea> \
                <input type="text" id="account_addr" name="accountAddress" placeholder="Account Address" /> \
                <input type="text" id="account_state" name="accountState" placeholder="State" /> \
                <input type="button" onclick="App.createAccount()" value="Create Account" /> \
            </form> \
        </div>';
}

/* Show customer form to create a new assembly on the blockchain */
function showAddAssemFrm() {
    // var htmlFormDiv = document.getElementById("form-div");
    var htmlFormDiv = document.getElementById("form-div");

    var endTag = '<input type="button" onclick="App.createAssembly()" value="Create Assembly" /></form></div>';
    var frmContent = 
        '<div class="form-style-8" id="create-assembly-form"> \
            <h2>Create New Assembly</h2> \
            <form id="assem-form-data"> \
                <input type="text" id="assem_name" name="assemName" placeholder="Assembly Name" /> \
                <textarea placeholder="Assembly Description" id="assem_desc" onkeyup="adjust_textarea(this)"></textarea> \
                <input type="text" id="assem_manuf" name="assemMan" placeholder="Assembly Manufacturer" />';
                // <input type="checkbox" name="test1" value="test1"> [1] Pname <br>
                // <input type="checkbox" name="test2" value="test2"> [2] Pname <br>
 
    App.contracts.AssetManagement.deployed().then(function(i) {
        instance = i;
        return instance.partsCount();
    }).then(function(cnt) {
        frmContent += '<h3>Select Parts for Assembly:</h3>';
        for(var i = 1; i <= cnt; i++) {
            frmContent += '<input type="checkbox" name="part" value="' + i + '">Part [' + i + '] <br>';
        }
        frmContent += '<br>' + endTag;
        htmlFormDiv.innerHTML = frmContent;
    });
}

/* Show customer form to create a new part on the blockchain */
function showAddPartFrm() {
    var htmlFormDiv = document.getElementById("form-div");

    htmlFormDiv.innerHTML = 
        '<div class="form-style-8" id="create-part-form"> \
            <h2>Create New Part</h2> \
            <form> \
                <input type="text" id="part_name" name="partName" placeholder="Part Name" /> \
                <textarea placeholder="Part Description" id="part_desc" onkeyup="adjust_textarea(this)"></textarea> \
                <input type="text" id="part_manuf" name="partMan" placeholder="Part Manufacturer" /> \
                <input type="button" onclick="return App.createPart()" value="Create Part" /> \
            </form> \
        </div>';
}

/* Show customer form to update ownership of a part on the blockchain */
function showUpdateOwnershipFrm() {
    var htmlFormDiv = document.getElementById("form-div");

    htmlFormDiv.innerHTML = 
        '<div class="form-style-8" id="update-ownership-form"> \
            <h2>Update Part Ownership</h2> \
            <form> \
                <input type="text" id="part_num" name="partNumber" placeholder="Part ID Number" /> \
                <input type="text" id="new_owner" name="newOwner" placeholder="New Owner" /> \
                <input type="button" onclick="return App.updatePartOwnership()" value="Update Ownership" /> \
            </form> \
        </div>';
}