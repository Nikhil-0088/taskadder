const submit_btn = document.getElementById('submit_btn');
const raised_by = document.getElementById('raised_by');
const raised_to = document.getElementById('raised_to');
const desc = document.getElementById('Description');
const option = document.getElementById('option');
const raised = document.getElementById('raised');
const delete_btns = []
const saved_tasks = []
function displaytasks(r_b, r_t, d, opt) {
    const card = document.createElement('div');
    card.classList.add('card');
    const card_body = document.createElement('div');
    card_body.classList.add('card-body');
    const rb = document.createElement('p');
    rb.innerHTML = `<b> Raised By:</b> ${r_b}`;
    card_body.appendChild(rb);
    const rt = document.createElement('p');
    rt.innerHTML = `<b> Raised To:</b> ${r_t}`;
    card_body.appendChild(rt);
    const des = document.createElement('p');
    des.innerHTML = `<b> Description:</b> ${d}`;
    card_body.appendChild(des);
    const sev = document.createElement('p');
    if (opt == 1) {
        sev.innerHTML = "<b>Severity:</b> minor";
    }
    else if (opt == 2) {
        sev.innerHTML = "<b>Severity:</b> medium";
    }
    else {
        sev.innerHTML = "<b>Severity:</b> major";
    }
    card_body.appendChild(sev);
    const del_btn = document.createElement('button');
    del_btn.classList.add('btn');
    del_btn.classList.add('btn-danger');
    del_btn.innerHTML = "Delete Task";
    delete_btns.push(del_btn);
    card_body.appendChild(del_btn);
    card.appendChild(card_body);
    raised.appendChild(card);
    raised_by.value = "";
    raised_to.value = "";
    desc.value = "";
    option.value = 1;
}
submit_btn.addEventListener('click', () => {
    let r_b = raised_by.value;
    let r_t = raised_to.value;
    let d = desc.value;
    let opt = option.value;
    if (r_b == "" || r_t == "" || d == "") {
        alert("data in form is invalid")
    }
    else {
        console.log(r_b);
        console.log(r_t);
        console.log(d);
        console.log(opt);
        displaytasks(r_b, r_t, d, opt);
        const task_obj = {
            raised_by: r_b,
            raised_to: r_t,
            description: d,
            sev: opt
        }
        saved_tasks.push(task_obj);
        window.localStorage.setItem(saved_tasks.length - 1, JSON.stringify(task_obj));
    }
})
const myFunction =
    function () {
        delete_btns.forEach((item, index) => {
            item.addEventListener('click', () => {
                const cardb = item.parentElement;
                const car = cardb.parentElement;
                cardb.classList.add('hide');
                delete delete_btns[index];
                const obj = saved_tasks[index];
                //delete obj from local storage 
                window.localStorage.removeItem(index);
                //removing fromn the saved tasks also 
                delete saved_tasks[index];
            })
        })
    }
setInterval(myFunction, 50);
function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    console.log(values);
    values.forEach((item) => {
        displaytasks(item.raised_by, item.raised_to, item.description, item.sev);
    })
}
allStorage();
