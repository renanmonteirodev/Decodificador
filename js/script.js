document.addEventListener("DOMContentLoaded", function () {
	const encryptBtn = document.getElementById("criptografar");
	const decryptBtn = document.getElementById("descriptografar");
	const outputTextElement = document.getElementById("output");
	const elements = [
		document.getElementById("decorative-img"),
		document.getElementById("output-big-text"),
		document.getElementById("output-small-text"),
	];
	const copyBtn = document.getElementById("copiar");
	const inputText = document.getElementById("inputText");

	function cleanUpInput(event) {
		const inputTextValue = event.target.value;
		const cleanedUpInputValue = inputTextValue
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

		event.target.value = cleanedUpInputValue;
	}

	function updateOutputSection(text) {
		outputTextElement.innerText = text;
		outputTextElement.style.display = "block";
		copyBtn.style.display = "block";
		for (const element of elements) {
			element.style.display = "none";
		}
	}

	function showMessage(message, alertType) {
		var messageElement = document.createElement("div");
		messageElement.textContent = message;
		messageElement.classList.add("alert", alertType);
		messageElement.setAttribute("role", "alert");

		document.body.appendChild(messageElement);

		setTimeout(() => document.body.removeChild(messageElement), 1500);
	}

	function encrypt(text) {
		if (text) {
			text = text
				.replaceAll("e", "enter")
				.replaceAll("i", "ines")
				.replaceAll("a", "ai")
				.replaceAll("o", "ober")
				.replaceAll("u", "ufat");
			updateOutputSection(text);
		} else {
			showMessage("Não há texto para criptografar.", "alert-warning");
		}
	}

	function decrypt(text) {
		if (text) {
			text = text
				.replaceAll("ai", "a")
				.replaceAll("enter", "e")
				.replaceAll("ines", "i")
				.replaceAll("ober", "o")
				.replaceAll("ufat", "u");
			updateOutputSection(text);
		} else {
			showMessage("Não há texto para descriptografar.", "alert-warning");
		}
	}

	function copyToClipboard() {
		const outputText = outputTextElement.textContent.trim();
		if (outputText) {
			navigator.clipboard
				.writeText(outputText)
				.then(() => showMessage("Texto copiado com sucesso.", "alert-success"))
				.catch(() => showMessage("Erro ao copiar texto.", "alert-danger"));
		} else {
			showMessage("Não há texto a ser copiado.", "alert-danger");
		}
	}

	function handleClick(event) {
		switch (event.target.id) {
			case "criptografar":
				encrypt(inputText.value);
				break;
			case "descriptografar":
				decrypt(inputText.value);
				break;
			case "copiar":
				copyToClipboard();
				break;
			default:
				console.log("Unknow button clicked.");
				break;
		}
	}

	inputText.addEventListener("input", cleanUpInput);
	encryptBtn.addEventListener("click", handleClick);
	decryptBtn.addEventListener("click", handleClick);
	copyBtn.addEventListener("click", handleClick);
});