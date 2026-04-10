

async function registerSubmit(e) {
    e.preventDefault();

    let user = {
        name: usernameInput.value,
        password:passwordInput.value
}
    
const res = await axios.post("https://n105.softwareengineer.uz/api/v1/auth/login",{
    header:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
    
    
})
if(res.status === 201) {
    window.localStorage.setItem("accessToken",res.data.accessToken)
    window.location = "home.html"
}
}
loginForm.onsubmit = registerSubmit




