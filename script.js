const ajoutBtn = document.querySelector(".ajoutBtn");
let overlay = document.querySelector(".overlay");
const formContainerAjout = document.querySelector("#formContainerAjout");
const annulBtnForm = document.querySelector("#annulBtnForm");
const addExperienceBtn = document.querySelector("#addExperienceBtn");
const experienceTemplate = document.querySelector("#experienceTemplate");
let experiencesList = document.querySelector("#experiencesList");
const employesContainer = document.querySelector(".employesContainer");
const cvform = document.querySelector("#cvForm");
let employes = JSON.parse(localStorage.getItem("employes")) || [];
let details = document.querySelector("#details");
let employesChoose = document.querySelector("#employesChoose");

anassigment(employes.filter(emp => emp.status === "unassigned"));

ajoutBtn.addEventListener("click", () => {
  formContainerAjout.classList.remove("hidden");
  overlay.classList.remove("hidden");
  addExperience();
});

function hideForm() {
  formContainerAjout.classList.add("hidden");
  employesChoose.classList.add("hidden");
  overlay.classList.add("hidden");
  details.classList.add("hidden");
}

overlay.addEventListener("click", () => {
  hideForm();
});

annulBtnForm.addEventListener("click", (e) => {
  e.preventDefault();
  hideForm();
});

// Image preview
let imagepreview = document.querySelector("#imagePreview");
let url = document.querySelector('input[type="url"]');
let img = imagepreview.querySelector("img");

url.oninput = () => {
  img.src = url.value;
};

// Form submit
cvform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!$(cvform).parsley().isValid()) {
    return;
  }

  const nom = document.querySelector('input[name="nom"]').value;
  const role = document.querySelector("select").value;
  const urlValue = document.querySelector('input[name="url"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const telephone = document.querySelector('input[name="telephone"]').value;

  let experiencedata = experiencesList.querySelectorAll(".experiencedata");
  let experiences = [];

  for (let exp of experiencedata) {
    let poste = exp.querySelector('input[name="poste"]').value.trim();
    let entreprise = exp.querySelector('input[name="entreprise"]').value.trim();
    let debut = exp.querySelector("#debut").value;
    let fin = exp.querySelector("#fin").value;
    let description = exp.querySelector("textarea").value.trim();

    if (new Date(debut) > new Date(fin)) {
      alert("Fix the dates");
      return;
    } else {
      experiences.push({ poste, entreprise, debut, fin, description });
    }
  }

  let employe = {nom,role,url: urlValue,email,telephone,experiences,status: "unassigned",currentroom: null,
  };

  employes.push(employe);
  localStorage.setItem("employes", JSON.stringify(employes));

  experiencesList.innerHTML = ""; 
  cvform.reset();
  img.src = "images/user.png";
  anassigment(employes.filter((emp) => emp.status === "unassigned"));
  hideForm();
});

addExperienceBtn.addEventListener("click", () => {
  addExperience();
});

function addExperience() {
  let clone = experienceTemplate.content.cloneNode(true);
  experiencesList.append(clone);
}

experiencesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeExpBtn")) {
    e.target.closest(".experiencedata").remove();
  }
});

// Display employees  
function anassigment(list) {
  employesContainer.innerHTML = "";

  list.forEach((employe) => {
    let div = document.createElement("div");
    div.className = "employe";
    div.innerHTML = `
      <div class="flex items-center m-auto w-[full] gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-500 cursor-pointer">
        <div class="relative">
          <img src="${employe.url}" class="w-14 h-14 border-2 rounded-3xl" alt="${employe.nom}">
        </div>
        <div class="flex-1">
          <h1 class="font-semibold text-gray-900 text-lg">${employe.nom}</h1>
          <p class="text-sm text-gray-500 mt-0.5">${employe.role}</p>
        </div>
      </div>
    `;

    div.addEventListener("click", () => {
      showEmployeeDetails(employe);
    });

    employesContainer.append(div);
  });
}

// showing details
function showEmployeeDetails(employe) {
  details.classList.remove("hidden");
  details.innerHTML = '';
 
  let experiencehtml = "";
  for(let exp of employe.experiences){
    experiencehtml += `
      <div class="bg-gray-50 rounded-lg p-3 border-l-4 border-black">
    <div class="flex justify-between items-start">
      <div>
        <p class="font-medium text-gray-900">${exp.poste}</p>
        <p class="text-sm text-gray-500">${exp.entreprise}</p>
      </div>
      <span class="text-xs text-gray-400 whitespace-nowrap">${exp.debut} - ${exp.fin}</span>
    </div>
  </div>
    `
  }
  let div = document.createElement("div");
  div.className = "empdetail";
  div.innerHTML = `
    <div class="flex flex-col gap-5 bg-white rounded-xl shadow-lg p-6 max-w-md">
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
        <p class="text-sm font-medium ${employe.status === "assigned" ? "text-green-600" : "text-yellow-600"} capitalize">${employe.status}</p>
      </div>
       
      ${experiencehtml}

    </div>
  `;
  
  details.append(div);
  overlay.classList.remove("hidden");
}

// Role and zone limits
const roleMap = {
  "conference": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "AutresRoles"],
  "personnel": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "AutresRoles"],
  "servers": ["Techniciens IT", "Manager", "Nettoyage"],
  "security": ["Agents de sécurité", "Manager", "Nettoyage"],
  "Réception": ["Réceptionnistes", "Manager", "Nettoyage", "AutresRoles"],
  "archive": ["Manager"],
};

const zonelimit = {
  "conference": 5,
  "personnel": 5,
  "servers": 4,
  "security": 4,
  "Réception": 8,
  "archive": 3,
};

function limit(parent, room_name) {
  let number = zonelimit[room_name] - 1
  if (parent.children.length >= zonelimit[room_name]) {
    showtoast(number)
    return true;
  }else{
    return false;
  }
}

 
let buttons = document.querySelectorAll(".imgContainer > div > button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let room_name = btn.getAttribute("rome-name");
    let check = employes.filter((emp) => roleMap[room_name].includes(emp.role) && emp.status === "unassigned");
    let parent = btn.parentElement;

    if (!limit(parent, room_name)) {
      overlay.classList.remove("hidden");
      displayemployes(check, parent);
    }
  });
});

// Display employees 
function displayemployes(listrole, parent) {
  employesChoose.classList.remove("hidden");
  employesChoose.innerHTML = `
    <div class="mb-4 pb-3 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Select Employee</h2>
    </div>
  `;

  listrole.forEach((emp) => {
    let div = document.createElement("div");
    div.className = "listemploye";
    div.innerHTML = `
      <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-500 cursor-pointer mb-3">
        <img src="${emp.url}" class="w-12 h-12 rounded-lg object-cover" alt="${emp.nom}">
        <div class="flex-1 detail">
          <h1 class="font-semibold text-gray-900 text-base">${emp.nom}</h1>
          <p class="text-sm text-gray-500">${emp.role}</p>
        </div>
      </div>
    `;

    div.addEventListener("click", () => {
    hideForm()
      div.remove();

      let newdiv = document.createElement("div");
      newdiv.className = "relative flex flex-col items-center justify-center bg-white rounded-lg p-2 shadow-sm h-20 w-20 cursor-pointer hover:shadow-md transition-shadow employee";
      newdiv.innerHTML = `
        <button class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold z-10 shadow">×</button>
        <img src="${emp.url}" class="w-12 h-12 rounded-full object-cover mb-1" alt="${emp.nom}">
      `;
      parent.append(newdiv);

      emp.status = "assigned";
      localStorage.setItem("employes", JSON.stringify(employes));  
      anassigment(employes.filter((e) => e.status === "unassigned"));

      if (parent.children.length > 1) {
        parent.classList.remove("bg-red-700/30");
      }

      let button = newdiv.querySelector("button");
      button.onclick = (e) => {
        // ,,
        e.stopPropagation();
        parent.removeChild(newdiv);

        if (parent.children.length <= 1) {
          if (!parent.classList.contains("box1") && !parent.classList.contains("box5")) {
            parent.classList.add("bg-red-700/30");
          }
        }

        emp.status = "unassigned";
        localStorage.setItem("employes", JSON.stringify(employes));
        anassigment(employes.filter((e) => e.status === "unassigned"));
      };

      let imagediv = newdiv.querySelector("img");
      imagediv.addEventListener("click", (e) => {
        e.stopPropagation();
        showEmployeeDetails(emp);
      });
    });

    employesChoose.append(div);
  });
}


function showtoast(howmany){
  let toast = document.createElement("div")
  toast.className = 'absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg transition duration-300 opacity-0 shadow-lg';
  toast.textContent =  "Max is "+howmany;


  document.body.append(toast)
  setTimeout(()=>{
    toast.classList.remove("opacity-0")
  },100)


  setTimeout(()=>{
    toast.remove()
  },2000)
  
}