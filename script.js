const ajoutBtn = document.querySelector(".ajoutBtn");
let overlay = document.querySelector(".overlay")
const formContainerAjout = document.querySelector("#formContainerAjout");
const annulBtnForm = document.querySelector("#annulBtnForm");
const addExperienceBtn = document.querySelector("#addExperienceBtn");
const experienceTemplate = document.querySelector("#experienceTemplate");
let experiencesList = document.querySelector("#experiencesList");
const employesContainer = document.querySelector(".employesContainer");
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

    
    
    const nom = document.querySelector('input[name="nom"]').value;
    const role = document.querySelector("select").value;
    const url = document.querySelector('input[name="url"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const telephone = document.querySelector('input[name="telephone"]').value;

    
    
    
    let experiencedata = experiencesList.querySelectorAll(".experiencedata")
    console.log(experiencedata)
    let experiences =[];
    experiencedata.forEach((exp)=>{
        
        let poste = exp.querySelector('input[name="poste"]').value.trim();
        let entreprise = exp.querySelector('input[name="entreprise"]').value.trim();
        let debut = exp.querySelector("#debut").value;
        let fin = exp.querySelector("#fin").value;
        let description = exp.querySelector("textarea").value.trim();
        
        experiences.push({poste,entreprise,debut,fin,description})
    })
    
    
    let employe = {nom,role,url,email,telephone,experiences,status: "unassigned",currentroom :null }
    employes.push(employe)

    
    // console.log(employes)
    cvform.reset();                      
    img.src = 'images/user.png'
    anassigment()
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
function anassigment(){
    employesContainer.innerHTML = ''
    
    employes.forEach(employe=>{
        
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
    
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
    
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




// add employe
let buttons = document.querySelectorAll(".imgContainer > div > button")
// console.log(boxes)


const roleMap = [
    "Réceptionnistes",
    "Techniciens IT",
    "Agents de sécurité",
    "Manager",
    "Nettoyage",
    "AutresRoles"
];


buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        overlay.classList.remove("hidden")
        overlay.addEventListener('click',()=>{
            overlay.classList.add("hidden")
            employesChoose.classList.add("hidden")

        })
        const role = roleMap[i];
        const filtered = employes.filter(emp => emp.role === role);
        displayemployes(filtered);
    });
});


function displayemployes(listrole){
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
            <div class="flex-1">
                <h1 class="font-semibold text-gray-900 text-base">${emp.nom}</h1>
                <p class="text-sm text-gray-500">${emp.role}</p>
            </div>
        </div>
        `

        employesChoose.append(div)
    })
}








