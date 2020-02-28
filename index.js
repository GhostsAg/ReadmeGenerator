const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

inquirer.prompt([
    {
        message: "What is the name of the application?",
        name: "title"
    },
    {
        message: "Describe your application.",
        name: "description"
    },
    {
        name: "tableOfContents",
        message: "Write a table of contents"
    },
    {
        name: "installation",
        message: "Describe your applications installation process."
    },
    {
        message: "Brief application instructions.",
        name: "instructions"
    },
    {
        name: "license",
        message: "Your projects license."
    },
    {
        name: "contributors",
        message: "Add any contributors."
    },
    {
        name: "tests",
        message: "Tests of the application."
    },
    {
        type: "checkbox",
        message: "Programming languages used.",
        name: "languages",
        choices: [
            "HTML",
            "Javascript",
            "C/C++",
            "PHP",
            "Python",
            "CSS",
            "Go",
            "Swift",
            "Ruby",
            "Perl"
        ]
    },
    {
        message: "Questions (FAQ)",
        name: "questions"
    },
    {
        message: "Name of the author or group.",
        name: "author"
    },
    {
        message: "Enter your Github username",
        name: "username"
    }
]).then(function(response) {
    
    const queryUrl = `https://api.github.com/users/${response.username}`;
    let gitPic = new String;
    let userEmail = new String;
    axios.get(queryUrl).then(function({data}) {
        console.log(data);
        gitPic = data.avatar_url;
        userEmail = data.email;
        console.log(gitPic);
    });
    console.log(gitPic);

    let langArr = response.languages;
    let stringArr = new Array;
    for (language of langArr){
        stringArr += `* ${language}.\n\t`;
    }
    let template = `
    # ${response.title}

    ${response.description}.

    ## Table of Contents
    * ${response.tableOfContents}.      @@@table of contents.

    ## Installation
    * ${response.installation}.

    ## Instructions
    * ${response.instructions}.

    ## License
    * ${response.license}.

    ## Contributors
    * ${response.contributors}.

    ## Tests
    * ${response.tests}.

    ## Written In

    ${stringArr}

    ## Questions

    ${response.questions}   @@@some questions

    ## Written By
    * ${response.author}.
    * ${gitPic}.
    * email: ${userEmail}.
    `;
    fs.writeFile("README.md", template, (err) => {
        if (err) {
            throw err;
        }
        console.log("Succeded making README.md")
    })
});


