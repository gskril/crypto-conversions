document.addEventListener("DOMContentLoaded", async () => {
	function getCryptoData() {
		return axios
			.get('https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms=BTC,ETH,BNB,SOL,ADA,XRP,DOT,DOGE,SHIB,AVAX,LUNA,LTC,CRO,UNI,LINK,ALGO')
			.then((res) => {
				return res.data
		})
	}

	const data = await getCryptoData()
	const form = document.querySelector("form")
	const input = document.getElementById("input")
	const inputLabel = document.querySelector("label[for='input'")
	const output = document.getElementById("output")
	const outputLabel = document.querySelector("label[for='output'")
	const radio = document.getElementById("crypto")

	function updateNumbers() {
		const selected = radio.options[radio.selectedIndex].value

		if (selected === "wei") {
			inputLabel.innerHTML = "ETH"
			outputLabel.innerHTML = "Wei"
			output.value = input.value * 1000000000000000000
		} else if (selected === "gwei") {
			inputLabel.innerHTML = "ETH"
			outputLabel.innerHTML = "Gwei"
			output.value = input.value * 1000000000
		} else if (selected === "satoshi") {
			inputLabel.innerHTML = "BTC"
			outputLabel.innerHTML = "Satoshis"
			output.value = input.value * 100000000
		} else {
			inputLabel.innerHTML = selected
			outputLabel.innerHTML = "USD"
			output.value = (data[selected].USD * input.value).toFixed(2)
		}
	}

	form.addEventListener("change", updateNumbers)
	form.addEventListener("keyup", updateNumbers)
})
