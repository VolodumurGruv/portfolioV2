const selectedLang = document.querySelector("select");
const flags = document.querySelectorAll(".lang .icon");
const allLang = ["uk", "en", "ru"];

document.addEventListener("DOMContentLoaded", () => {
	const lang = navigator.language;
	document.querySelectorAll("html [data-key]").forEach((item) => {
		const key = item.getAttribute("data-key");
		const key1 = key.split("-")[0];
		if (allLang.includes(lang)) {
			if (Object.keys(langData["lg"][lang]).includes(key1)) {
				item.textContent = langData["lg"][lang][key1][key];
			}
		}
	});
	if (allLang.includes(lang)) {
		changeFlag(lang);
		changeSelector(lang);
	}
	changeUrlPath();
	changeLang();
});

selectedLang.addEventListener("change", () => {
	changeUrlPath();
	changeLang();
});

function changeUrlPath() {
	// will add #lang to url
	const lang = selectedLang.value;
	location.href = `${window.location.pathname}#${lang}`;
}

function changeLang() {
	const hash = window.location.hash.substr(1);

	if (!allLang.includes(hash)) {
		location.href = `${window.location.pathname}/#en`;
		location.reload();
	}
	selectedLang.value = hash;
	document.querySelector("title").innerHTML = langData["lg"][hash]["title"];
	document.querySelectorAll("html [data-key]").forEach((item) => {
		const key = item.getAttribute("data-key");
		const key1 = key.split("-")[0];

		if (Object.keys(langData["lg"][hash]).includes(key1)) {
			item.textContent = langData["lg"][hash][key1][key];
		}
	});
	changeFlag(hash);
}

function changeFlag(lang) {
	flags.forEach((item) => {
		if (item.classList[0].substr(0, 2) === lang) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
}

function changeSelector(lang) {
	for (let i = 0; i < selectedLang.options.length; i++) {
		if (selectedLang.options[i].value === lang) {
			selectedLang.options[i].attributes.setNamedItem(
				document.createAttribute("selected")
			);
		}
	}
}
