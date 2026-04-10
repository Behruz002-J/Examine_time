{/* <div class="wrapper">
                <h1 class="title">Upload a video</h1>
                <form id="videoForm" action="#" class="site-form">
                    <label>
                        <input type="text" id="videoInput" placeholder="video title" required>
                    </label> */}
                    {/* <label class="custom-upload">
                        <span class="zmdi zmdi-upload"></span>
                        <span class="file-name">click upload a video</span>
                        <input type="file" id="uploadInput" accept="video/*">
                    </label>
                    <input type="submit" value="Upload" id="submitButton">
                </form>
                <img src="img/signin-image.jpg" class="signup-image">
            </div> */}

            const wrapperAdmin = document.getElementById(".wrapper");
            wrapperAdmin.addEventListener("submit", async(e) => {
                e.preventDefault()
                const videoInput = document.querySelector("#videoInput")
                const file = videoInput.file[0];

                const formData = new FormData();
                formData.append("video",file);

                const res = await fetch("https://n105.softwareengineer.uz/api/v1/files", {
                    method:"POST",
                    body:formData()
                 
                })
                const data = await res.json();
                console.log(data);
                
            })
