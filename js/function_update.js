const printCharacter = (mentor) => {
    const { id,name,lastname,signature, average } = mentor;
    const form = document.querySelector('#formPersonalInf')
    form.name.value = name
    form.lastname.value = lastname
    form.signature.value = signature
    form.average.value = average
    
  };
// PUT-------------------------------------------------------
const url = new URLSearchParams(window.location.search)
const idCharacter=url.get("id")
console.log(idCharacter)

const getCharacter = async(id) => {
    const response = await fetch(`https://kodemia-614e9-default-rtdb.firebaseio.com/${id}.json`);
    const result = await response.json();
    const Character=result
    console.log(Character)
    printCharacter(Character)
  };

getCharacter(idCharacter)

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let objFinal={}
    Array.from(form).forEach((element)=>{
      objFinal[element.name]=element.value
    })
    console.log(objFinal)
    if(objFinal!==''){
      put(objFinal,idCharacter)
       Swal.fire({
            title: 'Success!',
            text: 'Mentor Update!',
            icon: 'check',
            confirmButtonText: 'Cool'
          })
          // form.reset();
    }

});

const put = async(mentor, id) => {
  try {
    const response = await fetch(`https://kodemia-614e9-default-rtdb.firebaseio.com/${id}.json`,{
      method: 'PUT',
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        average:mentor.average,
        lastname:mentor.lastname,
        name:mentor.name,
        signature:mentor.signature,
      }),
    });
    const result = await response.json();
    console.log(result)
  } catch (error) {
    console.log(error)
  }
};


//BUTTON BACK extras
const backButton=()=>{
    const btnBack=document.querySelector('#btnBack')
    btnBack.addEventListener('click',(event)=>{
        window.location.href='../src/index.html'
    })
}
backButton()