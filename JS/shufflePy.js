const miscGithub= [
    {
        "name": "5Crowns.py",
        "description": "Simulates a game of 5 Crowns (a card game similar to Rummy) with various strategies.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/5Crowns.py"
    },
    {
        "name": "AxesFlipper.py",
        "description": "Given CSV data, flips the axes and outputs the new data in a readable format to be graphed.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/AxesFlipper.py"
    },
    {
        "name": "allScales.py",
        "description": "Generate all possible musical scales that follow certain simple rules regarding the intervals.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/allScales.py"
    },
    {
        "name": "deptCourses.py",
        "description": "Uses UF course catalog and RateMyProfessor APIs to rank classes and professors by ratings from students.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/deptCourses.py"
    },
    {
        "name": "esFrequencyFilter.py",
        "description": "Takes a list of Spanish words, filters out words that are already in my flashcard decks and ranks them by frequency.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/esFrequencyFilter.py"
    },
    {
        "name": "evanWords.py",
        "description": "Calculates the cosine distance (essentially similarity) between words in 2 lists to find the most similar words.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/evanWords.py"
    },
    {
        "name": "intervalPractice.py",
        "description": "Quizzes a user on musical intervals using random note names, tracks score over time.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/intervalPractice.py"
    },
    {
        "name": "keyWordScraper.py",
        "description": "Scrapes key words from a collection of hiring posts to see what skills are in high demand.",
        "link": "https://github.com/b-cheek/Miscellaneous/blob/master/keyWordScraper.py"
    },
]

document.getElementById("die-btn").addEventListener("click", function(event) {
    let dieElement = event.currentTarget.firstChild;
    if (dieElement.classList.contains("animate")) return;
    dieElement.classList.add("animate");
    let randIndex = Math.floor(Math.random() * miscGithub.length);
    while (document.getElementById("miscPy-content").innerHTML == `<a class="gh-link" href="${miscGithub[randIndex].link}" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style="width: 1.2em; height: auto; border-radius: 5px; margin: 0.1em;"></a><span class="emphasize">&nbsp;${miscGithub[randIndex].name}</span>: ${miscGithub[randIndex].description}`) {
        randIndex = Math.floor(Math.random() * miscGithub.length);
    }
    document.getElementById("miscPy-content").innerHTML = `<a class="gh-link" href="${miscGithub[randIndex].link}" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style="width: 1.2em; height: auto; border-radius: 5px; margin: 0.1em;"></a><span class="emphasize">&nbsp;${miscGithub[randIndex].name}</span>: ${miscGithub[randIndex].description}`;
    setTimeout(function() {
        dieElement.classList.remove("animate");
    }
    , 500);
});

let randIndex = Math.floor(Math.random() * miscGithub.length);
document.getElementById("miscPy-content").innerHTML = `<a class="gh-link" href="${miscGithub[randIndex].link}" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style="width: 1.2em; height: auto; border-radius: 5px; margin: 0.1em;"></a><span class="emphasize">&nbsp;${miscGithub[randIndex].name}</span>: ${miscGithub[randIndex].description}`;