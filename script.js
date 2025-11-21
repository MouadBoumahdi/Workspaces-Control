const ajoutBtn = document.querySelector(".ajoutBtn");
let overlay = document.querySelector(".overlay")
const formContainerAjout = document.querySelector("#formContainerAjout");
const annulBtnForm = document.querySelector("#annulBtnForm");
const addExperienceBtn = document.querySelector("#addExperienceBtn");
const experienceTemplate = document.querySelector("#experienceTemplate");
let experiencesList = document.querySelector("#experiencesList");
const employesContainer = document.querySelector(".employesContainer");
const employesContainer1 = document.querySelector(".employesContainer1");
const cvform = document.querySelector("#cvForm");
let employes = [];
let details = document.querySelector("#details")

let conferenceAjout = document.querySelector(".conferenceAjout");
let employesChoose = document.querySelector("#employesChoose");

ajoutBtn.addEventListener("click", () => {
  formContainerAjout.classList.remove("hidden");
  overlay.classList.remove("hidden")
  addExperience()
});



function hideForm() {
  formContainerAjout.classList.add("hidden");
  employesChoose.classList.add('hidden')
  overlay.classList.add("hidden");
}

overlay.addEventListener("click",()=>{
    hideForm()
})

annulBtnForm.addEventListener("click", (e) => {
    e.preventDefault()
    hideForm();
});

 




// image change live when i change the url 
let imagepreview = document.querySelector("#imagePreview")
let url = document.querySelector('input[type="url"]');
let img = imagepreview.querySelector("img")

url.oninput = ()=>{
    img.src = url.value
}



// form submit
cvform.addEventListener('submit',(e)=>{
    e.preventDefault()
if (!$(cvform).parsley().isValid()) {
    return; 
}

    
    
    const nom = document.querySelector('input[name="nom"]').value;
    const role = document.querySelector("select").value;
    const url = document.querySelector('input[name="url"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const telephone = document.querySelector('input[name="telephone"]').value;

    
    
    
    let experiencedata = experiencesList.querySelectorAll(".experiencedata")
    console.log(experiencedata)
    let experiences =[];
    for(let exp of experiencedata){
        
        let poste = exp.querySelector('input[name="poste"]').value.trim();
        let entreprise = exp.querySelector('input[name="entreprise"]').value.trim();
        let debut = exp.querySelector("#debut").value;
        let fin = exp.querySelector("#fin").value;
        let description = exp.querySelector("textarea").value.trim();
        if(new Date(debut) > new Date(fin)){
            
            alert("fix the dates")
            return;
        }else{
            experiences.push({poste,entreprise,debut,fin,description})
        }
        
    }
    
    
    let employe = {nom,role,url,email,telephone,experiences,status: "unassigned",currentroom :null }
    employes.push(employe)

    
    // console.log(employes)
    cvform.reset();                      
    img.src = 'images/user.png'
    anassigment(employes.filter(emp => emp.status === "unassigned"))
    // anassigment(employes)
    hideForm()
})

addExperienceBtn.addEventListener('click',()=>{
    addExperience()
})



// experience form
function addExperience(){
    let clone = experienceTemplate.content.cloneNode(true)
    experiencesList.append(clone)
        
    }

// remove experience
    experiencesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeExpBtn")) {
        e.target.closest(".experiencedata").remove();
    }
});






// display employe on anassigment part
function anassigment(list){
    employesContainer.innerHTML = ''
    
    list.forEach(employe=>{
        
        let div = document.createElement("div")
        div.className = "employe"
        div.innerHTML = `
       <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-500 cursor-pointer">
       
       <div class="relative">
        <img src="${employe.url}" class="w-14 h-14 rounded-3xl object-cover" alt="${employe.nom}">
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
    
    <div class="flex-1">
        <h1 class="font-semibold text-gray-900 text-lg">${employe.nom}</h1>
        <p class="text-sm text-gray-500 mt-0.5">${employe.role}</p>
    </div>
    
   
    
</div>
        `


        div.addEventListener("click",()=>{
            
            details.classList.remove('hidden')
            details.innerHTML = ''
            let div = document.createElement("div")
            div.className = "empdetail"
            div.innerHTML = `
               <div class="bg-white rounded-xl shadow-lg p-6 max-w-md">
    
                        <div class="flex items-center gap-4 pb-4 border-b border-gray-200">
                            <img src="${employe.url}" class="w-16 h-16 rounded-lg object-cover" alt="${employe.nom}">
                            <div>
                                <h1 class="font-semibold text-gray-900 text-xl">${employe.nom}</h1>
                                <p class="text-sm text-gray-500">${employe.role}</p>
                            </div>
                        </div>
                        
                        <div class="mt-4 space-y-2">
                            <p class="text-gray-700 text-sm">${employe.email}</p>
                            <p class="text-gray-700 text-sm">${employe.telephone}</p>
                            <p class="text-sm font-medium ${employe.status === 'assigned' ? 'text-green-600' : 'text-yellow-600'} capitalize">${employe.status}</p>
                        </div>
                        
                </div>
    

            `

            // hide the detail section
            overlay.classList.remove("hidden")
            overlay.addEventListener("click",()=>{
                overlay.classList.add("hidden")
                details.classList.add('hidden')
            
            })
            
            details.append(div)
        })
        

        
        
        employesContainer.append(div)


        
       
    })

    
}


// assign part







// partie assigned
// add employe
let buttons = document.querySelectorAll(".imgContainer > div > button")
// console.log(boxes)


const roleMap = {
    "conference": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "AutresRoles"],
    "personnel": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "AutresRoles"],
    "servers": ["Techniciens IT", "Manager", "Nettoyage"],
    "security": ["Agents de sécurité", "Manager", "Nettoyage"],
    "Réception": ["Réceptionnistes", "Manager", "Nettoyage", "AutresRoles"],
    "archive": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité"]
};


const zonelimit = {
    "conference" : 2,
    "personnel" : 4,
    "servers":3,
    "Réception": 8,
    "archive": 2,
}


function limit(parent,room_name){
    if(parent.children.length>=zonelimit[room_name]){
        alert("max is ",zonelimit[room_name])
        return true
    }else{
        return false
    }
}



buttons.forEach((btn) => {
   btn.addEventListener('click',()=>{
    let rome_name = btn.getAttribute("rome-name")
    let check = employes.filter(emp=>roleMap[rome_name].includes(emp.role) && emp.status === "unassigned")
    let parent = btn.parentElement
 
   

    if(!limit(parent,rome_name)){
        // parent.classList.remove("bg-red-700/30")
        overlay.classList.remove("hidden")
        displayemployes(check,parent)
        
    }

    console.log(parent)
    overlay.addEventListener('click',()=>{
        hideForm()
    })
    
   })
});

let boxes = document.querySelectorAll(".imgContainer > div")



function displayemployes(listrole,parent){
    employesChoose.classList.remove("hidden")
    employesChoose.innerHTML = `
    <div class="mb-4 pb-3 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Select Employee</h2>
    </div>
    `
    

    listrole.forEach(emp=>{
        let div = document.createElement("div")
        div.className = "listemploye"
        div.innerHTML = `
        <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-500 cursor-pointer mb-3">
            <img src="${emp.url}" class="w-12 h-12 rounded-lg object-cover" alt="${emp.nom}">
            <div class="flex-1 detail">
                <h1 class="font-semibold text-gray-900 text-base">${emp.nom}</h1>
                <p class="text-sm text-gray-500">${emp.role}</p>
            </div>
        </div>
        `




        div.addEventListener('click',()=>{
            div.remove();
            
            let newdiv = document.createElement("div")
            
            newdiv.className = "relative flex flex-col items-center justify-center bg-white rounded-lg p-2 shadow-sm h-20 w-20 cursor-pointer hover:shadow-md transition-shadow";
            newdiv.innerHTML = `
            <button class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold z-10 shadow">×</button>
            <img src="${emp.url}" class="w-12 h-12 rounded-full object-cover mb-1" alt="${emp.nom}">
            `;
            parent.append(newdiv)
            

            
            emp.status = "assigned"
            anassigment(employes.filter(emp=>emp.status == "unassigned"))
            console.log(newdiv.parentElement)
            
            
            let button = newdiv.querySelector("button")
            console.log(button)
            button.onclick = (e)=>{
                parent.removeChild(newdiv)
                if(parent.children.length <= 1){
                    if(!parent.classList.contains("box1") && !parent.classList.contains("box5")){

                        parent.classList.add("bg-red-700/30")
                    }
}

                emp.status = "unassigned"
            anassigment(employes.filter(emp=>emp.status == "unassigned"))
            
            }


           if(parent.children.length>1){
                parent.classList.remove("bg-red-700/30")
            }
            
            let imagediv = newdiv.querySelector("img")
            // pour afficher le detail d employe
            imagediv.addEventListener('click',()=>{
                    details.classList.remove('hidden')
                    details.innerHTML = ''
                    let div = document.createElement("div")
                    div.className = "empdetail"
                    div.innerHTML = `
                    <div class="bg-white rounded-xl shadow-lg p-6 max-w-md">
                    <div class="flex items-center gap-4 pb-4 border-b border-gray-200">
                                    <img src="${emp.url}" class="w-16 h-16 rounded-lg object-cover" alt="${emp.nom}">
                                    <div>
                                        <h1 class="font-semibold text-gray-900 text-xl">${emp.nom}</h1>
                                        <p class="text-sm text-gray-500">${emp.role}</p>
                                    </div>
                                </div>
                                
                                <div class="mt-4 space-y-2">
                                    <p class="text-gray-700 text-sm">${emp.email}</p>
                                    <p class="text-gray-700 text-sm">${emp.telephone}</p>
                                    <p class="text-sm font-medium ${emp.status === 'assigned' ? 'text-green-600' : 'text-yellow-600'} capitalize">${emp.status}</p>
                                </div>
                                
                        </div>
            

                    `

                    // hide the detail section
                    overlay.classList.remove("hidden")
                    overlay.addEventListener("click",()=>{
                        overlay.classList.add("hidden")
                        details.classList.add('hidden')
                    
                    })
                    
                    details.append(div)
                
            })
        })

        

        employesChoose.append(div)
    })
}








