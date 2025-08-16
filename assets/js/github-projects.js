document.addEventListener("DOMContentLoaded", async () => {
  const username = "daffadevhosting";
  const container = document.getElementById("project-list");

  const workerBase = "https://my-github.daffaadityadwiputra.workers.dev/api";

  const langColors = {
    JavaScript: "bg-yellow-400 text-black",
    TypeScript: "bg-blue-500 text-white",
    Python: "bg-green-500 text-white",
    Ruby: "bg-red-500 text-white",
    PHP: "bg-indigo-500 text-white",
    HTML: "bg-orange-500 text-white",
    CSS: "bg-blue-400 text-white",
    Vue: "bg-green-400 text-white",
    Java: "bg-red-600 text-white",
    'C++': "bg-blue-600 text-white",
    Go: "bg-cyan-400 text-black",
    Shell: "bg-gray-800 text-white",
    Swift: "bg-orange-400 text-white",
    Kotlin: "bg-purple-500 text-white",
    Default: "bg-gray-300 text-gray-800",
  };

  try {
    // ambil semua repo via Worker
    const repoRes = await fetch(`${workerBase}/users/${username}/repos?per_page=10`);
    const repos = await repoRes.json();

    repos.sort((a, b) => a.name.localeCompare(b.name));

    for (let repo of repos) {
      const langRes = await fetch(`${workerBase}/repos/${username}/${repo.name}/languages`);
      const langData = await langRes.json();
      const langs = Object.keys(langData);

      const langBadges = langs.length
        ? langs.map(lang =>
            `<span class="px-2 py-1 rounded-full text-xs font-medium mr-2 ${
              langColors[lang] || langColors.Default
            }">${lang}</span>`
          ).join("")
        : `<span class="px-2 py-1 rounded-full text-xs font-medium ${langColors.Default}">Unknown</span>`;

    const card = document.createElement("div");
    card.className = "card bg-white rounded-2xl shadow p-4 hover:shadow-lg transition h-full flex flex-col";
      card.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${repo.name}</h2>
        <p class="text-gray-600 mb-4 line-clamp-3">${repo.description || "No description available"}</p>
        <div class="mb-3">${langBadges}</div>
        <div class="mt-auto">
          <a href="${repo.html_url}" target="_blank" class="text-blue-500 font-medium">View on GitHub →</a>
        </div>
      `;
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p class="text-red-500">Gagal ambil data dari server.</p>`;
  }
});
