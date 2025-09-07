// Dummy dataset (same structure as guru)
const studentsDataW = [
  {id:"S001", name:"Adit", level:"SMP", records:[
    {date:"2025-09-01", time:"15:30", status:"Hadir", fee:50000},
    {date:"2025-09-05", time:"15:30", status:"Hadir", fee:50000}
  ]},
  {id:"S002", name:"Bella", level:"SD", records:[
    {date:"2025-08-15", time:"14:00", status:"Hadir", fee:50000},
    {date:"2025-08-22", time:"14:00", status:"Hadir", fee:50000}
  ]},
  {id:"S003", name:"Citra", level:"SMA", records:[
    {date:"2025-09-03", time:"16:00", status:"Hadir", fee:50000},
    {date:"2025-09-10", time:"16:00", status:"Hadir", fee:50000}
  ]}
];

const searchInputW = document.getElementById('searchInputW');
const suggestionsW = document.getElementById('suggestionsW');
const monthFilterW = document.getElementById('monthFilterW');
const yearFilterW = document.getElementById('yearFilterW');
const tableBodyW = document.getElementById('tableBodyW');
const totalSumW = document.getElementById('totalSumW');

function formatRp(n){ return 'Rp ' + n.toLocaleString(); }

function renderRowsForStudentW(student){
  tableBodyW.innerHTML = '';
  let sum = 0;
  const monthVal = monthFilterW.value;
  const yearVal = yearFilterW.value;

  student.records.forEach(r=>{
    const [y,m] = r.date.split('-');
    if((!monthVal || m === monthVal) && (!yearVal || y === yearVal)){
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${student.name}</td><td>${student.level}</td><td>1x</td><td>${r.date}</td><td>${r.time}</td><td>${formatRp(r.fee)}</td>`;
      tableBodyW.appendChild(tr);
      sum += r.fee;
    }
  });

  totalSumW.textContent = formatRp(sum);
}

searchInputW.addEventListener('input', ()=>{
  const v = searchInputW.value.trim().toLowerCase();
  suggestionsW.innerHTML = '';
  if(!v){ suggestionsW.style.display='none'; tableBodyW.innerHTML=''; totalSumW.textContent='Rp 0'; return; }
  const filtered = studentsDataW.filter(s => s.name.toLowerCase().includes(v) || s.id.toLowerCase().includes(v));
  if(filtered.length){
    suggestionsW.style.display = 'block';
    filtered.forEach(s=>{
      const div = document.createElement('div');
      div.textContent = `${s.name} (${s.id}) - ${s.level}`;
      div.onclick = ()=>{ searchInputW.value = `${s.name} (${s.id}) - ${s.level}`; suggestionsW.style.display='none'; renderRowsForStudentW(s); };
      suggestionsW.appendChild(div);
    });
  } else {
    suggestionsW.style.display = 'none';
  }
});

[monthFilterW, yearFilterW].forEach(el=>{
  el.addEventListener('change', ()=>{
    const val = searchInputW.value.trim().toLowerCase();
    if(!val) return;
    const student = studentsDataW.find(s=>`${s.name} (${s.id}) - ${s.level}`.toLowerCase() === val);
    if(student) renderRowsForStudentW(student);
  });
});

document.getElementById('printBtnW').addEventListener('click', ()=>window.print());
