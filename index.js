window.onload = function() {
	function toggle() {
		var active = this.getAttribute("data-active");
		var paragraph = this.parentElement.nextSibling.nextSibling;
		console.log(active);
		this.setAttribute("data-active", active ? "" : "true");
		paragraph.style = active ? "display:none" : "display:block";
	}
	var plus = document.getElementsByClassName("plus");
	for(i = 0; i < plus.length; i++) {
		plus[i].onclick = toggle;
	}
}