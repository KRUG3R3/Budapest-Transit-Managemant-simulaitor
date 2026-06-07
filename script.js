
let map,money=100000000,satisfaction=80,date=new Date(2025,0,1,6,0);
let vehicles=[],activeEvent=null;

function start(){
 menu.style.display='none'; game.style.display='block';
 player.textContent='👤 '+(name.value||'Player');
 map=L.map('map').setView([47.4979,19.0402],12);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

 addVehicle('🚌','Busz 7',[ [47.49,19.03],[47.50,19.05],[47.51,19.08] ]);
 addVehicle('🚋','4-6 Villamos',[ [47.50,19.02],[47.505,19.04],[47.49,19.06] ]);

 setInterval(tick,1000);
 setInterval(spawnEvent,30000);
}

function addVehicle(icon,name,route){
 let marker=L.marker(route[0],{icon:L.divIcon({html:'<div style="font-size:24px">'+icon+'</div>',className:''})}).addTo(map);
 let v={marker,name,route,seg:0,t:0,condition:100,passengers:Math.floor(Math.random()*120)};
 marker.on('click',()=>vehicleInfo.innerHTML=`<b>${name}</b><br>Állapot: ${v.condition}%<br>Utasok: ${v.passengers}`);
 vehicles.push(v);
}

function tick(){
 date.setSeconds(date.getSeconds()+144);
 money+=120000;
 profit.textContent='📈 Profit: '+money.toLocaleString('hu-HU')+' Ft';
 clock.textContent=date.toLocaleString('hu-HU');
 moneyEl.textContent='';
 moneySpan=money.toLocaleString('hu-HU');
 document.getElementById('money').textContent='💰 '+moneySpan;

 vehicles.forEach(v=>{
   v.t+=0.03;
   if(v.t>=1){v.t=0;v.seg=(v.seg+1)%(v.route.length-1);v.passengers=Math.floor(Math.random()*120);v.condition-=0.1;}
   let a=v.route[v.seg], b=v.route[v.seg+1];
   v.marker.setLatLng([a[0]+(b[0]-a[0])*v.t,a[1]+(b[1]-a[1])*v.t]);
 });

 events.innerHTML=`👥 Utasáramlás: ${Math.floor(500+Math.random()*800)}<br>
😀 Elégedettség: ${satisfaction}%<br>
🔧 Karbantartás szükséges: ${vehicles.filter(v=>v.condition<80).length}`;
}

function spawnEvent(){
 activeEvent='M3 meghibásodás';
 eventTitle.textContent='🚨 '+activeEvent;
 eventModal.style.display='flex';
}

function resolveEvent(type){
 if(type==='fast'){money-=5000000;satisfaction+=1;}
 if(type==='cheap'){money-=1000000;satisfaction-=2;}
 eventModal.style.display='none';
 activeEvent=null;
}

function saveSlot(n){
 localStorage.setItem('btm_slot_'+n, JSON.stringify({money,satisfaction,date}));
 alert('Mentve Slot '+n);
}
