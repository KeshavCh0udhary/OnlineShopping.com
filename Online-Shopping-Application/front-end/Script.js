const RegisterUser = document.getElementById('form1');

RegisterUser.addEventListener("submit", function(e){

    e.preventDefault();

    const data = {
        firstName:this.firstName.value,
        lastName:this.lastName.value,
        mobileNumber:this.mobileNumber.value,
        password:this.password.value,
        email:this.email.value,
        address:null
    }

    fetch('http://localhost:8888/customers', {
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'},
        
    }).then(function(response){
        return response.json();
    }).then(function(text){

        if( text.httpStatus == "BAD_REQUEST" ){
            alert(text.message);
        }

        else{
            alert("Registered Successfully")
        }

        
    }).catch(function(error){
        alert(error)
    })
});

const LoginUser = document.getElementById('form2');

LoginUser.addEventListener("submit", function(e){

    e.preventDefault();

    const data = {
        
        userId:this.mobileNumber.value,
        password:this.password.value,
        role:"customer"
    }

    fetch('http://localhost:8888/users/login', {
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    }).then(function(response){
        return response.json();
    }).then(function(text){

        
        if( text.httpStatus == "BAD_REQUEST" ){
            alert(text.message)
        }
        else if(text.httpStatus == "INTERNAL_SERVER_ERROR"){
            alert("Please Enter Valiid Details")
        }
        else{
            alert("Logged in  Successfully")

            localStorage.setItem("key",text.uuid);

            console.log(text);
        }

        
    }).catch(function(error){
        alert(error)
    })
});

const UpdateUser = document.getElementById('form3');

UpdateUser.addEventListener("submit", function(e){

    e.preventDefault();

    const data = {
        customerId:this.userId.value,
        firstName:this.firstName.value,
        lastName:this.lastName.value,
        mobileNumber:this.mobileNumber.value,
        password:this.password.value,
        email:this.email.value,
        address:null
    }

    let mykey = localStorage.getItem("key");

    

    fetch(`http://localhost:8888/customers/${mykey}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
    }).then(function(response){
        return response.json();

    }).then(function(text){
        console.log(text)
        if( text.httpStatus == "INTERNAL_SERVER_ERROR"){
            alert(text.message)
            //alert("all fields should be valid");
            
        }
        else if( text.httpStatus == "BAD_REQUEST" ){
            alert(text.message)
        }
        else{
            console.log(text)
            alert("Updated Successfully")
        }

        
    }).catch(function(error){
        alert(error)
    })
});

document.getElementById('viewForm').addEventListener("submit",function(e){
e.preventDefault();
//let mykey = localStorage.getItem("key");

const cId = document.getElementById("customerid").value; 

fetch(`http://localhost:8888/customers/${cId}`)
    .then(function(response){
        return response.json();
    }).then( (text) => {
        if(text.httpStatus == "BAD_REQUEST"){
            alert(text.message)
        }
        else
            console.log(text);
    })
    .catch(function(error){
        alert(error)
    })
})


document.getElementById('logout').addEventListener("click",function(){

    let mykey = localStorage.getItem("key");

    fetch(`http://localhost:8888/users/logout?key=${mykey}`, {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }
    }).then(function(response){
        if( response.status >= 200 && response.status < 300 ){
            alert("Logged out successfully!")
        }
    })
    .catch(function(error){
        alert(error)
    })

})
