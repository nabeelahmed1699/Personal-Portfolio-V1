const element = (con) => document.querySelector(con);


const hamburger = element('.hamburger'),
    hamburger2 = element('.hamburger2'),
    navbar = element('.navbar'),
    preLoader = element('.pre-loader'),
    upBtn = element('.up-btn'),
    projects = document.querySelectorAll('.card'),
    showMoreBtn = element('.show--more-btn'),
    navItems = document.querySelectorAll('.nav-item'),
    lowerSidebar = element('.lower-sidebar');


// Event Listeners
hamburger.addEventListener('click', hamburgerClick);
hamburger2.addEventListener('click', hamburgerClick);
upBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
})
showMoreBtn.addEventListener('click', showHideProjects);

// For adding after-header  to lower sidebar when header scrolled
window.addEventListener('scroll', () => {
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    if (scrollHeight >= headerHeight) {
        lowerSidebar.classList.add('after-header');
    } else {
        lowerSidebar.classList.remove('after-header');
    }

})

// Functions
function hamburgerClick() {
    hamburger.classList.toggle('hamburger-open');
    hamburger2.classList.toggle('hamburger-open');
    navbar.classList.toggle('navbar-open')
}


function loaded() {
    preLoader.style.display = 'none';

}

// ================= Text Effect =====================
let duration = 0.8;
let delay = 0.3;
let revealText = document.querySelector(".reveal");
let letters = revealText.textContent.split("");
revealText.textContent = "";

let middle = letters.filter(e => e !== " ").length / 2;

letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
        revealText.append(span);
    })
    // Text Effect end

// Scroll to up
window.addEventListener('scroll', () => {
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    if (scrollHeight >= headerHeight) {
        upBtn.style.opacity = '1';
    } else {
        upBtn.style.opacity = '0';
    }
});

// Projects hide or show
function showHideProjects() {

    if (showMoreBtn.innerHTML === 'Show more') {
        showMoreBtn.innerHTML = 'Show less'
        projects[3].style.display = 'flex';
        projects[4].style.display = 'flex';
        return;
    }
    showMoreBtn.innerHTML = 'Show more'
    projects[3].style.display = 'none';
    projects[4].style.display = 'none';
}

// For navigation to sections
navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const clickedElement = e.target.innerHTML;
        // Getting height of the sections
        let headerHeight = document.querySelector('header').getBoundingClientRect().height;
        let aboutHeight = document.querySelector('.about').getBoundingClientRect().height;
        let projectsHeight = document.querySelector('.projects').getBoundingClientRect().height;
        // let contactHeight = document.querySelector('#contact').getBoundingClientRect().height;
        if (clickedElement === 'About') {
            window.scrollTo(0, headerHeight);
        } else if (clickedElement === 'Projects') {
            window.scrollTo(0, headerHeight + aboutHeight + 200);

        } else if (clickedElement === 'Contact') {
            window.scrollTo(0, headerHeight + aboutHeight + 200 + projectsHeight + 200 + 200);
        }
    })
})

// Getting stats from github for this repo
function getGithubStats() {
    const url = 'https://api.github.com/repos/nabeelahmed1699/Weather-App';
    fetch(url)
        .then(resp => resp.json())
        .then(repo => {
            const { stargazers_count, forks_count } = repo;

            const starCount = document.querySelector('footer .star-count')
            const forkCount = document.querySelector('footer .fork-count')
            console.log('data-fetched');
            starCount.innerText = stargazers_count;
            forkCount.innerText = forks_count;
        });
}
getGithubStats();