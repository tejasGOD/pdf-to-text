document
  .getElementById("upload-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("pdf-file");
    const file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
      await convertPdfToText(file);
    } else {
      displayMessage("Please select a valid PDF file.");
    }
  });

function displayMessage(message) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}

async function convertPdfToText(file) {
  displayMessage("Converting...");

  const reader = new FileReader();
  reader.onload = async function (event) {
    const arrayBuffer = event.target.result;
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let text = "";

    for (const page of pages) {
      const { textContent } = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(" ") + "\n";
    }

    document.getElementById("text-output").value = text;
    displayMessage("Text extracted successfully.");
  };
  reader.readAsArrayBuffer(file);
}
