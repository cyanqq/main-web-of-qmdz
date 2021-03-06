function openGallery(img, id){
	$('#largeImage').attr('src', img);
	$('.prod_img02 a').overlay().load();
	$(".overlay_thumbs_scrolable li img").animate({opacity: "0.4"}, 200);
	$('#thumb' + id).addClass('active');
	$('#thumb' + id).find("img").animate({opacity: "1"}, 200);
}
function loadImage(node, img){
	node = node.parentNode;
  $(".overlay_thumbs_scrolable li").removeClass('active');
	$(node).addClass('active');
	$(node.firstChild.firstChild).animate({opacity: "1"}, 200);
	$('#largeImage').attr('src', img);

	$(".overlay_thumbs_scrolable li:not(.active) img").animate({opacity: "0.4"}, 200);
}
//Domready
$(document).ready(function(){

//banner
//$("#bannerTop").scrollable({ size: '1', loop: 'true', next: ".btn_next", prev: ".btn_prev", effect: 'fade', fadeOutSpeed: "slow" }).navigator({ navi:'ul.bannerThumbs' }).autoscroll(3000);

$("ul.bannerThumbs").tabs(".items > li", {

	// enable "cross-fading" effect
	effect: 'fade',
	fadeOutSpeed: "slow",

	// start from the beginning after the last tab
	rotate: true,
	autoplay: true,
	clickable: false

}).slideshow({autoplay:true, interval:'6000'});

//Tabs
$("ul.tabControls").tabs("div.tabsBody > div.tabBox");

var galleryPopup =	$(".prod_img02 a").overlay({
				oneInstance: false,
				api: true,
				expose: {
				color: '#333',
				loadSpeed: 'fast',
				closeSpeed:'fast',
				opacity: 0.9
			}
	});

$("div.overlay_thumbs_scrolable").scrollable({
		vertical: true,
		size:2,
		items: '.overlay_thumbs'
});

$(".overlay_thumbs_scrolable li img").animate({opacity: "0.4"});

//Comanda rapida overlay
$("a.btn_comanda_rapida[rel]").overlay({
			expose: {
			color: '#333',
			loadSpeed: 'fast',
			closeSpeed:'fast',
			opacity: 0.9
		}
});

//Tooltip
$(".have_tooltip").tooltip({tip: '.tooltip_box', effect: 'slide'});

}); //Domready end

function checkEmail(email){
	var regex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,3}$/
	if (!regex.test(email)) return false;
	return true;
}

function BRD_ValCredit(DurataCredite, ValoareProdus1, Avans) {
	//var chdosar;
	var cs;
	var comision;
	var com;
	var vc;

	if (DurataCredite <= 24) {
		if (ValoareProdus1 > 6000) {
			comision = 0.05;
		} else {
			comision = 0.05;
		}
	} else {
		comision = 0.05;
	}

	cs = ValoareProdus1 - Avans;
	com = comision * cs;

	if ((com < 25) && (comision != 0)) {
		vc = cs + 25;
	} else {
		vc = cs * (1 + comision);
	}

	if (ValoareProdus1 != 0) {
		return vc;
	} else {
		return 0;
	}
}

function BRD_Discount(DurataCredite, ValoareCredite) {
	var a = 0;
	/*
	if ((DurataCredite >= 6) && (DurataCredite <= 24) && (ValoareCredite > 6000) {
		a = 0.109;
	} else if ((DurataCredite >= 6) && (DurataCredite <= 24) && (ValoareCredite <= 6000)) {
		a = 0.109;
	} else if ((DurataCredite >= 25) && (DurataCredite <= 36)) {
		a = 0.109;
	} else if (DurataCredite > 36) {
		a = 0.109;
	}
	*/

	return a;
}

function BRD_CalcRataComSold(ValoareCredite, Dobanda, DurataCredite, ComisionGestiune) {
	var t;
	var c;

	t = (Dobanda + ComisionGestiune * 12) / 12;
	c = ValoareCredite * ComisionGestiune;

	if ((DurataCredite != 0) && (ValoareCredite != 0)) {
		a = (ValoareCredite * t) / (1 - Math.pow(1 / (1 + t), DurataCredite));
	}

	return a;
}

function CalculRata(Suma, Area) {
	var ComisionGestiune = 0.022;
	var Avans = 0;
	var DurataCredite = 12;

	var ValoareCredite = BRD_ValCredit(DurataCredite, Suma, Avans);

	if (ValoareCredite > 4000) {
		$('#rata_produs').val("0");
		$('#eroare_rata').show();
		if (Area==1) $('#parent_rata').hide();
	} else {
		$('#eroare_rata').hide();
		var Dobanda = BRD_Discount(DurataCredite, ValoareCredite);
		var Rata = Math.round(BRD_CalcRataComSold(ValoareCredite, Dobanda, DurataCredite, ComisionGestiune) * 100) / 100;
		if (Area==1) $('#rata_lunara').html(Rata);
		$('#rata_produs').val(Rata);
	}
}

/////////////////////////////////////////////////////////////////
function validare_recomanda(frm){
	if (frm.email_vizitator.value==""){
		alert("Introduceti adresa dumneavoastra de email.");
		frm.email_vizitator.focus();
		return false;
	}else if (!checkEmail(frm.email_vizitator.value)){
		alert('Adresa de email este invalida!');
		frm.email_vizitator.select();
		return false;
	}else if (frm.email_prieten.value==""){
		alert("Introduceti adresa de email.");
		frm.email_prieten.focus();
		return false;
	}else if (!checkEmail(frm.email_prieten.value)){
		alert('Adresa de email este invalida!');
		frm.email_prieten.select();
		return false;
	}
	return true;
}

/////////////////////////////////////////////////////////////////
function validare_parere(frm,n){
	for (i=1; i<=n; i++){
		id_criteriu = getElem("id_"+i).value;
		suma = 0;
		for (j=0; j<5; j++) suma += frm.elements[id_criteriu][j].checked;
		if (suma==0){
			alert("Selectati o nota pentru fiecare criteriu!");
			return false;
		}
	}

	if (frm.nume.value == ""){
		alert('Introduceti numele !');
		frm.nume.focus();
		return false;
	}else if (frm.email.value != "" && !checkEmail(frm.email.value)){
		alert('Adresa de email este invalida !');
		frm.email.select();
		return false;
	}else if (frm.parere.value == ""){
		alert('Scrieti parerea dumneavoastra !');
		frm.parere.select();
		return false;
	}

	return true;
}

function open_compara(IDProdus){
    var root = $('base').attr('href');
	window.open(root+'compara.php?IDProdus='+IDProdus,'compara','scrollbars=yes,height=600,width=800,resizable=yes');
}

/////////////////////////////////////////////////////////////////
function validate_news(frm){
	if (frm.email_news.value == "" || frm.email_news.value == "adresa de email"){
		alert('Introduceti adresa de email !');
		frm.email_news.focus();
		return false;
	}else if (!checkEmail(frm.email_news.value)){
		alert('Adresa de email este invalida!');
		frm.email_news.select();
		return false;
	}
    return true;
}

/////////////////////////////////////////////////////////////
function validate_cautare(frm){
	if (frm.key.value == ""){
		alert("Introduceti cuvantul de cautare!");
		frm.key.focus();
		return false;
	}
    return true;
}
