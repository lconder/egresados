var qrcode = new QRCode("qrcode");
function makeQR(b){
	qrcode.clear();
	$('#myModal1').modal('toggle');
	qrcode.makeCode(b.id);
}

function deletePromotion(b){
	console.log(b);
}