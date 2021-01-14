const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
search.focus();
async function getUser(username) {
    try {
        const {
            data
        } = await axios(APIURL + username);
        const repos = await axios(APIURL + username + "/repos?sort=created");
        createUserCard(data, repos.data);
    } catch (err) {
        createErrorCard(`No Profile with Username- ${username}`);
    }
}

function createUserCard(user, repos) {
    console.log(user);
    console.log(repos);

    const cardHTML = `<div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.login} Profile Image"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name} <small>${user.location}</small></h2>
          <p>${user.bio}</p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>
          <div id="repos">
          ${repos
            .map(
              (repo) =>
                `<a href="${repo.html_url}" class="repo" target="_blank">${repo.name}</a>`
            )
            .join("")}</div>
        </div>
      </div>`;

    main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
        search.value = "";
        search.focus();
    }
});

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
        <h1>${msg}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
}
