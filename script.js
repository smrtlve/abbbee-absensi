function markAttendance() {
  let studentId = document.getElementById("studentId").value;
  let status = document.getElementById("status");

  if (studentId.trim() === "") {
    status.innerText = "⚠️ Masukkan ID siswa dulu!";
    status.style.color = "red";
  } else {
    status.innerText = "✅ Absensi berhasil untuk ID: " + studentId;
    status.style.color = "green";
  }
}
