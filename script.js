let list = document.getElementById("list");
let isEditing = false;

list.innerHTML = localStorage.getItem("focuses");

function getAmountOfFocuses() {
  return document.getElementsByClassName("todo").length;
}
function getAmountOfNextFocusTI() {
  const lis = document.querySelectorAll("li.todo");
  const usedIndexes = Array.from(lis).map(li => parseInt(li.tabIndex));

  let i = 1;
  while (usedIndexes.includes(i)) {
    i++;
  }
  return i;
}


function addFocus() {
  if(getAmountOfFocuses() < 8) {
  const content = `<li class="todo" tabindex="${getAmountOfNextFocusTI()}">
          <button style="border: none; background: transparent;" tabindex="${getAmountOfNextFocusTI()}" id="editBTN" onclick="editFocus(this);"><img class="editIcon" src="./assets/imgs/pen.png" alt="Edit"></button>
           <span class="name">Neuer Focus ${getAmountOfNextFocusTI()}</span>
          <button style="border: none; background: transparent;" tabindex="${getAmountOfNextFocusTI()}" id="deleteBTN" onclick="deleteFocus(this);"><img class="deleteIcon" src="./assets/imgs/bin.png" alt="Remove"></button>
        </li>`;
  list.innerHTML += content;
  
  } else {
    alert("Du kannst maximal 8 Focuses hinzufügen.");
  }
}
function deleteFocus(thisBTN) {
  let tiB = thisBTN.tabIndex;
  let tiL = list.querySelector(`li[tabindex="${tiB}"]`);
  tiL.remove();
}
function editFocus(thisBTN) {
  let tiB = thisBTN.tabIndex;
  let tiL = list.querySelector(`li[tabindex="${tiB}"] .name`);
  let tiI = list.querySelector(`li[tabindex="${tiB}"] img.editIcon`);

  if(!isEditing) {
  tiL.contentEditable = "true";
  tiL.focus();
  tiI.src = "./assets/imgs/correct.png";
  isEditing = true;
  } else {
    saveFocus(tiL, tiI)
  }
}
function saveFocus(tiL, tiI) {
  tiL.contentEditable = "false";
  tiL.blur();
  tiI.src = "./assets/imgs/pen.png";
  isEditing = false;
}
setInterval(() => { 
  if(getAmountOfFocuses() === 0) {
    list.innerHTML = `<p class="empty">Du hast noch keine Focuses. Klicke auf das Plus-Symbol um einen neuen Focus hinzuzufügen.</p>`;
  }
}, 50);
setInterval(() => { 
  if(getAmountOfFocuses() > 0) {
    list.querySelector(".empty")?.remove();
  }
}, 50);
setInterval(() => { 
  document.getElementById("counter").innerText = getAmountOfFocuses();
}, 100);
setInterval(() => { 
  localStorage.setItem("focuses", list.innerHTML);
}, 1000);