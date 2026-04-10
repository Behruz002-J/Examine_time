
async function formSubmit(e) {
    e.preventDefault();
  console.log(usernameInput.value,passwordInput.value,uploadInput.files[0]);
  const formdata = new FormData()
  formdata.append("name",usernameInput.value)
  formdata.append("password",passwordInput.value)
  formdata.append("file",uploadInput.files[0]);

let res = await axios.post("https://n105.softwareengineer.uz/api/v1/auth/register",formdata,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
  })
  console.log(res);
  if(res.status === 201) {
    window.localStorage.setItem("accessToken",res.data.accessToken)
    window.location = "index.html"
  }
}
registerForm.onsubmit = formSubmit;

