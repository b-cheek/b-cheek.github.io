function randRangeInt(min, max) { //Inclusive, can return min or max
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randRangeDec(min, max, precision) { //Can return min up to but not including max
    return Math.floor((10**precision)*(Math.random()*(max-min)+min))/(10**precision);
}

let skillsArr = [
    '<img class="skill-img" alt="C++ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png">',
    '<img class="skill-img" alt="Python logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png">',
    '<img class="skill-img" alt="vsCode logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png">',
    '<img class="skill-img" alt="Javascript logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png">',
    '<img class="skill-img" alt="HTML logo" src="https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png">',
    '<img class="skill-img" alt="CSS logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png">',
    '<img class="skill-img" alt="Visual Studio logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/1200px-Visual_Studio_Icon_2019.svg.png">',
    '<img class="skill-img" alt="Git logo" src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png">',
    '<img class="skill-img" alt="Java logo" src="http://assets.stickpng.com/images/58480979cef1014c0b5e4901.png">',
    '<img class="skill-img" alt="Powershell logo" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png"></img>',
    '<img class="skill-img" alt="Burp Suite logo" src="../Resources/burp-suite-professional.svg">',
    '<img class="skill-img" alt="Eclipse logo" src="https://cdn.freebiesupply.com/logos/large/2x/eclipse-11-logo-png-transparent.png">',
    '<img class="skill-img" alt="MATLAB logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/667px-Matlab_Logo.png">',
    '<img class="skill-img" alt="Bootstrap logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png">',
    '<img class="skill-img" alt="C# logo" src="https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png">',
    '<img class="skill-img" alt="Microsoft SQL Server logo" src="https://www.sqlservertutorial.net/wp-content/uploads/sql-server-tutorial.svg">',
    '<img class="skill-img" alt="Sass logo" src="https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png">',
    '<img class="skill-img" alt="jQuery logo" src="https://seeklogo.com/images/J/jquery-logo-CFE6ECE363-seeklogo.com.png">',
    '<img class="skill-img" alt="React logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png">',
    '<img class="skill-img" alt="Postman logo" src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8">',
    '<img class="skill-img" alt="Swagger logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png">',
    '<img class="skill-img" alt="Angular logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png">',
    '<img class="skill-img" alt="MS Azure logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png"></img>',
]

for (var i=0; i<skillsArr.length; i++) {
    console.log("TEST" + skillsArr[i]);
    document.getElementById("skills-container").innerHTML += skillsArr[i];
}