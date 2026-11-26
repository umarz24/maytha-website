const products = [];
let bag = [];
const bagCount = document.getElementById("bagCount");
const bagOverlay = document.getElementById("bagOverlay");
const bagItems = document.getElementById("bagItems");
const bagTotal = document.getElementById("bagTotal");
const bagItemsLabel = document.getElementById("bagItemsLabel");
const toast = document.getElementById("toast");

function money(value){ return `SAR ${value.toFixed(0)}`; }
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(()=>toast.classList.remove("show"),2200);
}
function renderBag(){
  const count = bag.reduce((sum,item)=>sum+item.qty,0);
  const total = bag.reduce((sum,item)=>sum+item.price*item.qty,0);
  bagCount.textContent = count;
  bagItemsLabel.textContent = `(${count})`;
  bagTotal.textContent = money(total);
  if(!bag.length){
    bagItems.innerHTML = '<p class="empty-bag">Your bag is taking a little pause.</p>';
    return;
  }
  bagItems.innerHTML = bag.map((item,index)=>`
    <div class="bag-item">
      <div><strong>${item.name}</strong><small>${item.qty} × ${money(item.price)}</small></div>
      <div><strong>${money(item.price*item.qty)}</strong><br><button class="remove-item" data-remove="${index}">REMOVE</button></div>
    </div>`).join("");
}
function openBag(){ bagOverlay.hidden=false; document.body.style.overflow="hidden"; }
function closeBag(){ bagOverlay.hidden=true; document.body.style.overflow=""; }
document.querySelectorAll(".add-button").forEach(button=>{
  button.addEventListener("click",()=>{
    const name=button.dataset.product, price=Number(button.dataset.price);
    const existing=bag.find(item=>item.name===name);
    if(existing) existing.qty++;
    else bag.push({name,price,qty:1});
    renderBag(); showToast(`${name.toUpperCase()} ADDED TO YOUR BAG`);
  });
});
document.getElementById("openBag").addEventListener("click",openBag);
document.getElementById("closeBag").addEventListener("click",closeBag);
document.getElementById("closeBagX").addEventListener("click",closeBag);
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeBag();});
bagItems.addEventListener("click",event=>{
  const button=event.target.closest("[data-remove]");
  if(!button)return;
  bag.splice(Number(button.dataset.remove),1); renderBag();
});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  showToast("CHECKOUT IS A DEMO — NO PAYMENT HAS BEEN TAKEN.");
});
document.querySelectorAll(".filter").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card=>{
      card.hidden=filter!=="all" && card.dataset.category!==filter;
    });
  });
});
const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");
}));
document.getElementById("newsletterForm").addEventListener("submit",event=>{
  event.preventDefault();
  const email=document.getElementById("email").value.trim();
  if(email){
    document.getElementById("newsletterMessage").textContent="THANK YOU — THIS DEMO FORM IS NOT CONNECTED TO A MAILING LIST.";
    event.target.reset();
  }
});
renderBag();
