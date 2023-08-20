let submit = document.querySelector("#submit");
let ul = document.querySelector("#items");
let form = document.querySelector("#form");


form.addEventListener("submit", addExpense);

ul.addEventListener("click", deleteExpense);

ul.addEventListener("click", editExpense);

window.addEventListener("load",displayOnLoad);


function displayOnLoad(){
    let keys = Object.keys(localStorage);
    for(let key of keys){
        let val = localStorage.getItem(key);
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(val));

        let deleteList = document.createElement("button");
        deleteList.className = "btn btn-primary ms-5 delete";
        deleteList.appendChild(document.createTextNode("Delete Expense"));
        li.appendChild(deleteList);

        let editList = document.createElement("button");
        editList.className = "btn btn-primary ms-5 edit";
        editList.appendChild(document.createTextNode("Edit Expense"));
        li.appendChild(editList);

        ul.appendChild(li);
    }
}


function addExpense(event) {
    event.preventDefault();
    let amount = document.querySelector("#amount").value;
    let desc = document.querySelector("#description").value;
    let category = document.querySelector("#category").value;

    if (amount === "" || desc === "" || category === "Select the category") {
        let errorMsg = document.createElement("div");
        errorMsg.className = "error";
        errorMsg.appendChild(document.createTextNode("Please enter all fields"));
        let label = document.querySelector("label[for='amount']");
        form.insertBefore(errorMsg, label);
        setTimeout(() => errorMsg.remove(), 2000);
    } else {
        //Creating li
        let value = amount + "-" + desc + "-" + category;
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(value));


        //Storing value in localStorage
        localStorage.setItem(desc, value);


        //Adding delete button to li
        let deleteList = document.createElement("button");
        deleteList.className = "btn btn-primary ms-5 delete";
        deleteList.appendChild(document.createTextNode("Delete Expense"));
        li.appendChild(deleteList);

        //Adding edit button to li
        let editList = document.createElement("button");
        editList.className = "btn btn-primary ms-5 edit";
        editList.appendChild(document.createTextNode("Edit Expense"));
        li.appendChild(editList);

        ul.appendChild(li);

        //Clearing all fields
        amount = "";
        desc = "";
        category = "";
    }

}

function deleteExpense(event) {
    if (event.target.classList.contains('delete')) {
        if (confirm("Are you sure?")) {
            //Deleting from localStorage
            let key = event.target.parentElement.textContent.split("-");
            localStorage.removeItem(key[1]);

            //Deleting li
            let li = event.target.parentElement;
            ul.removeChild(li);

        }
    }
}

function editExpense(event) {
    if (event.target.classList.contains("edit")) {
        let amount = document.querySelector("#amount");
        let desc = document.querySelector("#description");
        let li = event.target.parentElement.textContent.split("-");
        amount.value = li[0];
        desc.value = li[1];
        localStorage.removeItem(li[1]);

        ul.removeChild(event.target.parentElement);
    }
}