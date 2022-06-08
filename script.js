//chrome://extensions/

let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("del-btn");
const saveTabBtn = document.getElementById("tab-btn");


//this is to parse the leads into an array and then store it in the local storage of the browser
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

//array of object
// const tabs = [
//     {
//         url: "https://linkedin.com/in/onoriode-dafetta/",
//         url: "https://twitter.com/the_didhee"
//     }

// ]

function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href = '${leads[i]}' target = '_blank'>${leads[i]}</a>
            </li>
    `       
    }
    
    ulEl.innerHTML = listItems;
}


saveBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

   // this is to store items, parsed as strings using JSON in the localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
    // console.log("this is a button!")
})


saveTabBtn.addEventListener("click", function() {
// console.log("button clicked!")
    //to use chrome api to get the current tab
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },

        function(tabs) {
            //to save urls on the html DOM

            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
         
            render(myLeads);
        }
    )
})


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads)
})


/*to create a list item on the ul tag, here are two ways;
- innerHTML =>  ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
- create element => * const li = document.createElement("li")
    set textContent * li.textContent = myLeads[i]
    append to ul    * ulEl.append(li)  */

//arguments are parsed outside of a function, they are mostly called
//parameters are parsed inside of a function

