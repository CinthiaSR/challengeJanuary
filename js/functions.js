const saveButton=()=>{
  const btnAdd=document.querySelector('#btnAdd')
  btnAdd.addEventListener('click',(event)=>{
      window.location.href='../src/details.html'
  })
}
const createList = (list) => {
  const newMain = document.createElement('tbody');
  newMain.classList.add('text-black');
  document.body.appendChild(newMain);

  list.forEach((character) => {
      printer(character)
  });
};

const printer=(persona)=>{
    const {id,name, lastname, signature, average}=persona
    const listbyMentor=document.querySelector('#list-main')
    const trGral=document.createElement('tr')
    trGral.classList.add('Datas')
    listbyMentor.appendChild(trGral)

    const tdName= document.createElement('td')
    tdName.classList.add('nameMentor')
    tdName.textContent=name
    trGral.appendChild(tdName)

    const tdLastName= document.createElement('td')
    tdLastName.classList.add('lastNameMentor')
    tdLastName.textContent=lastname
    trGral.appendChild(tdLastName)

    const tdSignature= document.createElement('td')
    tdSignature.classList.add('SignatureMentor')
    tdSignature.textContent=signature
    trGral.appendChild(tdSignature)

    const tdAverage= document.createElement('td')
    tdAverage.classList.add('AverageMentor', 'w-25')
    tdAverage.textContent=average
    trGral.appendChild(tdAverage)

    const tdEditButton= document.createElement('td')
    tdEditButton.classList.add('buttonEdit')
    trGral.appendChild(tdEditButton)

    const tdDeleteButton= document.createElement('td')
    tdDeleteButton.classList.add('buttonDelete')
    trGral.appendChild(tdDeleteButton)

// buttons
    const editButon= document.createElement('button')
    editButon.classList.add('btn', 'btn-primary')
    tdEditButton.appendChild(editButon)

    editButon.addEventListener('click', (event) => {
      window.location.href=`../src/update.html?id=${id}`
      });

    const editClassButon= document.createElement('i')
    editClassButon.classList.add('fa-solid', 'fa-pen-to-square')
    editButon.appendChild(editClassButon)
    

    const deteleButton= document.createElement('button')
    deteleButton.classList.add('btn', 'btn-danger')
    tdDeleteButton.appendChild(deteleButton)

    deteleButton.addEventListener('click', (event) => {
      alertConfirm(id)
      // alertConfirm(id)
      });

    const deleteClassButon= document.createElement('i')
    deleteClassButon.classList.add('fa-solid', 'fa-trash-can')
    deteleButton.appendChild(deleteClassButon)


}
// create new printer


const deleteElement = async(id) => {
  console.log(id)
  const response = await fetch(`https://kodemia-614e9-default-rtdb.firebaseio.com/${id}.json`, {
        method: 'DELETE',
        headers: {"Content-type": "application/json;"},
    });
    const data = await response.json();
    window.location.reload()
    return data;
};



// get data
const parseInfo = (info) => {
    const list = Object.entries(info);
    const newList = list.map((element) => {
      const infoParsed = {
        id: element[0],
        ...element[1]
      };
      printer(infoParsed)     
      return infoParsed;
    });
    return newList;
  };

const get = async() => {
    const response = await fetch('https://kodemia-614e9-default-rtdb.firebaseio.com/.json');
    const result = await response.json();
    const data = parseInfo(result); 
    saveButton()
  };  
get()








// alerts-----
const alertConfirm=(id)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to delete this item?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((isConfirmed => {
    const idMnetor=id
    if (isConfirmed) {
      
      deleteElement(idMnetor)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
    }
  }))
}