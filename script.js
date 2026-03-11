const username = "JinDatuin";

const projectsContainer = document.getElementById("projects");
const name = document.getElementById("name");
const bio = document.getElementById("bio");


// Fetch profile
fetch(`https://api.github.com/users/${username}`)
.then(res => res.json())
.then(data => {

    name.textContent = data.name || data.login;
    bio.textContent = data.bio || "";
    document.getElementById("avatar").src = data.avatar_url;

});


// Fetch repositories
fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
.then(res => res.json())
.then(repos => {

    repos
    .filter(repo => !repo.fork)
    .forEach(repo => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>

            <p>
            ${repo.language || "Unknown"} |
            ⭐ ${repo.stargazers_count}
            </p>

            <a href="${repo.html_url}" target="_blank">
            View Repository
            </a>
        `;

        projectsContainer.appendChild(card);

    });

});
