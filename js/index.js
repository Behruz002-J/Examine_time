// const Base_URL = "https://www.googleapis.com/youtube/v3";

const ulList = document.querySelector(".navbar-list");

async function getImage() {
    ulList.innerHTML = "";  // tozalash

    try {
        const res = await fetch("https://n105.softwareengineer.uz/api/v1/files/all?title=image");
        const data = await res.json();
        const users = data.data;

        if (!users || users.length === 0) return;

        const fragment = document.createDocumentFragment();

        for (const image of users) {
            const li = document.createElement("li");
            li.className = "iframe";

            li.innerHTML = `
                <video src="https://n105.softwareengineer.uz/api/v1/files/${image.file}" controls></video>
                <div class="iframe-footer">
                    <img src="https://n105.softwareengineer.uz/api/v1/files/${image.photo || 'default.png'}" alt="channel-icon">
                    <div class="iframe-footer-text">
                        <h2 class="channel-name">${image.user?.name || 'Unknown'}</h2>
                        <h3 class="iframe-title">${image.title}</h3>
                        <a class="download" href="#">
                            <span>${image.size || 'N/A'}</span>
                        </a>
                    </div>
                </div>
            `;

            fragment.appendChild(li);
        }

        ulList.appendChild(fragment);

    } catch (error) {
        console.error("Rasm olishda xato:", error);
    }
}

getImage();

const iframeVideo = document.querySelector(".iframes-wrapper");

async function defaultStatus() {
    iframeVideo.innerHTML = null;

    const response = await axios.get("https://n105.softwareengineer.uz/api/v1/files/all");
    const videos = response.data.data;

    for (const video of videos) {
        iframeVideo.innerHTML += `
            <li class="iframe">
                <video src="https://n105.softwareengineer.uz/api/v1/files/${video.file}" controls></video>
                <div class="iframe-footer">
                    <img src="https://n105.softwareengineer.uz/api/v1/files/${video.user.avatar || 'default.png'}" alt="channel-icon">
                    <div class="iframe-footer-text">
                        <h2 class="channel-name">${video.user.name}</h2>
                        <h3 class="iframe-title">${video.title}</h3>
                        <a class="download" href="https://n105.softwareengineer.uz/api/v1/files/${video.file}" download>
                            <span>${video.size}</span>
                            <img src="./img/download.png" alt="download-icon">
                        </a>
                    </div>
                </div>
            </li>
        `;
    }
}

defaultStatus();

//Microphone


const searchForm = document.querySelector(".search-box");
const searchFormInput = document.getElementById("inputSearch");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    console.log("Sizning browseringiz speech recognitionni qo‘llab-quvvatlaydi");

    const micBtn = document.querySelector("#micBtn"); 
    const micIcon = micBtn.querySelector(".microphone");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    micBtn.addEventListener("click", micBtnClick);

    function micBtnClick() {
        recognition.start();
    }

    recognition.addEventListener("start", startSpeechRecognition);

    function startSpeechRecognition() {
        console.log(" Speech recognition active");

        recognition.addEventListener("result", resultOfSpeechRecognition);

        function resultOfSpeechRecognition(event) {
            const transcript = event.results[0][0].transcript;
            console.log(transcript);

            searchFormInput.value = transcript;

            if (transcript.toLowerCase().trim() === "stop") {
                recognition.stop();
            } else if (transcript.toLowerCase().trim() === "go") {
                searchForm.dispatchEvent(new Event("submit"));
            } else if (transcript.toLowerCase().trim() === "reset") {
                searchFormInput.value = "";
            }
        }
    }

    recognition.addEventListener("end", () => {
        console.log("Speech recognition stopped");
    });

} else {
    console.log("Browser speech recognitionni qo'llamaydi");
}