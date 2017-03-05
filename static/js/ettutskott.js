var utskott = subpageinfo

_(".utskottheader").style.backgroundColor = utskott.color

_('.phonelinks').style.backgroundColor = blendColors(utskott.color, "#000000", 0.2)
if(utskott.color !== "#00000"){
	_(".phonelinks").className += " whitelinks"
}

_(".arbete").innerHTML = utskott.arbete
if(utskott.hjalp !== ""){
	_(".hjalp").innerHTML = utskott.hjalp
}else{
	_(".hjalp").style.margin = "0px"
}

if(utskott.arbete == '' && utskott.hjalp == ''){
	_(".arbete").innerHTML = 'Det finns tyvärr ingen information om detta utskott för närvarande.<br><br>Om du är medlem i detta utskott får du gärna skicka en text lik texterna för de andra utskotten till någon i Kommunikationutskottet.'
	_(".arbete").className += ' ingentext'
	_('.utskotttextfalt').style.margin = '0px'
}	

bild = document.createElement('div')
bild.className ="utskottbildbottom"

if (window.matchMedia("(max-width: 500px)").matches) {

	_(".center-header").style.backgroundColor = utskott.color
	if (api.currentUser){
		var object = _('.logged-in')
		object.querySelector('.title').style.color = blendColors(utskott.color, "#ffffff", 0.9)
	}else{
		var object = _('.log')
	}
	object.style.backgroundColor = blendColors(utskott.color, "#ffffff", 0.1)

	link = document.createElement('div')
	link.className ="kommittelink"
	link.style.backgroundColor = utskott.color
	link.style.minHeight = "20px"
	_('.center').appendChild(link)

	_(".menubutton").style.filter = "invert(100%)"
	_(".logga").style.filter = "invert(100%)"
}

bild.style.backgroundColor = utskott.color
bild.style.webkitMaskBoxImage = "url('/images/" + utskott.name + ".png')"

_('.loggacenter').appendChild(bild)

if(utskott.arbete == ''){
	_('.arbeterubrik').style.display = "none"
}else{
	_('.arbeterubrik').style.color = blendColors(utskott.color, "#000000", 0.3)
}

if(utskott.hjalp == ''){
	_('.hjalprubrik').style.display = "none"
}else{
	_('.hjalprubrik').style.color = blendColors(utskott.color, "#000000", 0.3)
}

if("#{utskott}".localeCompare("kommunikation") ===  0 || "#{utskott}".localeCompare("tradition") === 0){
	if (window.matchMedia("(max-width: 500px)").matches) {
		_('.utskottheadtext').innerText = "#{utskott}"
	}else{
		_('.utskottheadtext').innerText = "#{utskott}"
	}
}