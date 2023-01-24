
let response = {
    name: '',
    lastname: '',
    signature:'',
    average:''
};
let personas = [];

const form = document.querySelector('form');
const formList = document.querySelectorAll('#formPersonalInf input');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.values(response);
    // console.log(values)
    const errors = values.filter((element) => !element)
    if(errors.length > 0) {
        Swal.fire({
            title: 'Error!',
            text: 'All data are necessary',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    } else {
        personas.push(response)
        postItem(response)
        response = {
            name: '',
            lastname: '',
            signature:'',
            average:''
        };
        form.reset();

        Swal.fire({
            title: 'Success!',
            text: 'Mentor added!',
            icon: 'check',
            confirmButtonText: 'Cool'
          })
    }
});
formList.forEach((input) => {
    input.addEventListener('change', ( event ) => {
        response[event.target.name] = event.target.value;
        console.log(response)
    });
});

// AGREGAR MENTOR
const postItem = async(mentor) => {
    const response = await fetch('https://kodemia-614e9-default-rtdb.firebaseio.com/.json', {
        method: 'POST',
        headers: {"Content-type": "application/json;"},
        body: JSON.stringify({
            name:mentor.name,
            lastname:mentor.lastname,
            signature:mentor.signature,
            average:mentor.average
        })
    });
    
    const data = await response.json();
    return data;
};




//BUTTON BACK extras
const backButton=()=>{
    const btnBack=document.querySelector('#btnBack')
    btnBack.addEventListener('click',(event)=>{
        window.location.href='../src/index.html'
    })
}
backButton()