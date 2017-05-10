var qrcode = new QRCode("qrcode");
$(document).ready(function(){
	console.log(id_encrypt);
	qrcode.clear();
	qrcode.makeCode(id_encrypt);
});