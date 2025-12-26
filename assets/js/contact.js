(() => {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form || !note) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // demo: giả lập gửi thành công
    note.textContent = "Đã gửi! Templexa sẽ phản hồi trong 24–48h.";
    note.style.color = "var(--success)";

    // reset nhẹ sau khi gửi
    setTimeout(() => {
      form.reset();
    }, 800);
  });

  form.addEventListener("reset", () => {
    note.textContent = "";
    note.style.color = "var(--muted)";
  });
})();
