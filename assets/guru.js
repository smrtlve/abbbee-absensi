// Dummy dataset (will be replaced by Firebase later)
const studentsData = [
  {id:"S001", name:"Adit", level:"SMP", records:[
    {date:"2025-09-01", time:"15:30", status:"Hadir", fee:50000},
    {date:"2025-09-05", time:"15:30", status:"Hadir", fee:50000}
  ]},
  {id:"S002", name:"Bella", level:"SD", records:[
    {date:"2025-08-15", time:"14:00", status:"Hadir", fee:50000},
    {date:"S002-02", name:"", level:"", records:[]}
  ]},
  {id:"S003", name:"Citra", level:"SMA", records:[
    {date:"2025-09-03", time:"16:00", status:"Hadir", fee:50000},
    {date:"2025-09-10", time:"16:00", status:"Hadir", fee:50000}
  ]}
];

const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const monthFilter = document.getElementById('monthFilter');
const yearFilter = document.getElementById('yearFilter');
const tableBody = document.getElementById('tableBody');
const totalSum = document.getElementById('totalSum');

function formatRp(n){ return 'Rp ' + n.toLocaleString(); }

function renderRowsForStudent(student){
  tableBody.innerHTML = '';
  let sum = 0;
  const monthVal = monthFilter.value;
  const yearVal = yearFilter.value;

  student.records.forEach(r=>{
    const [y,m] = r.date.split('-');
    if((!monthVal || m === monthVal) && (!yearVal || y === yearVal)){
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${student.name}</td><td>${student.level}</td><td>1x</td><td>${r.date}</td><td>${r.time}</td><td>${formatRp(r.fee)}</td>`;
      tableBody.appendChild(tr);
      sum += r.fee;
    }
  });

  totalSum.textContent = formatRp(sum);
}

searchInput.addEventListener('input', ()=>{
  const v = searchInput.value.trim().toLowerCase();
  suggestions.innerHTML = '';
  if(!v){ suggestions.style.display='none'; tableBody.innerHTML=''; totalSum.textContent='Rp 0'; return; }
  const filtered = studentsData.filter(s => s.name.toLowerCase().includes(v) || s.id.toLowerCase().includes(v));
  if(filtered.length){
    suggestions.style.display = 'block';
    filtered.forEach(s=>{
      const div = document.createElement('div');
      div.textContent = `${s.name} (${s.id}) - ${s.level}`;
      div.onclick = ()=>{ searchInput.value = `${s.name} (${s.id}) - ${s.level}`; suggestions.style.display='none'; renderRowsForStudent(s); };
      suggestions.appendChild(div);
    });
  } else {
    suggestions.style.display = 'none';
  }
});

[monthFilter, yearFilter].forEach(el=>{
  el.addEventListener('change', ()=>{
    const val = searchInput.value.trim().toLowerCase();
    if(!val) return;
    const student = studentsData.find(s=>`${s.name} (${s.id}) - ${s.level}`.toLowerCase() === val);
    if(student) renderRowsForStudent(student);
  });
});

// Export CSV function (for "Excel")
document.getElementById('csvBtn').addEventListener('click', ()=>{
  // create CSV from visible table rows
  const rows = Array.from(document.querySelectorAll('#reportTable tbody tr'));
  if(rows.length === 0){ alert('Tidak ada data untuk diexport. Silakan pilih siswa.'); return; }
  let csv = 'Nama,Jenjang,Hadir,Tgl Hadir,Jam Hadir,Total Bayar\n';
  rows.forEach(r=>{
    const cols = Array.from(r.querySelectorAll('td')).map(td => td.textContent.replace(/,/g,''));
    csv += cols.join(',') + '\n';
  });
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'laporan.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// Print (PDF)
document.getElementById('printBtn').addEventListener('click', ()=>window.print());
