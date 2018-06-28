let cleanBranches,
	name_iput = $('#name'),
	created_at_input = $('#created_at'),
	expired_at_input = $('#expired_at'),
    description_input = $('#description') ;

let edit_promo = () => {

	let name = name_iput.val();
	let created_at = formatDate(created_at_input.val());
	let expired_at = formatDate(expired_at_input.val());
	let description= description_input.val();
	let branches = cleanBranches;
	let promo = {name, created_at, expired_at, description, branches};

    $.ajax({
        method: 'PUT',
        url : `/promotion/${id_promo}`,
        data: JSON.stringify(promo),
        success: () => {
			showSuccess();
        },
        error: () => {
			showError();
        },
        dataType: 'json',
        contentType: 'application/json'

    });

};


$(document).ready( function() {
	cleanBranchesArray();
});

$('.toggle-switch').change((e) =>{


    let id = Number(e.target.id);
    let active = e.target.checked;

    cleanBranches.forEach( (branch) => {
        if(branch.id==id){
            branch.active = active;
        }
    });

	console.log(cleanBranches);
});


function cleanBranchesArray(){
    //cleanBranches = branches.filter( b => b.active==true);
    cleanBranches = branches.map( b => {
        return { active: b.active, id: b.id }
    });
}

function validateBranches(){
	if(cleanBranches.length<=0)
		swal('Selecciona al menos una sucursal');
	else
		edit_promo();
}

function validateDates(){

    let created = new Date(formatDate(created_at_input.val()));
    let expired = new Date(formatDate(expired_at_input.val()));

    let diff_days = moment(expired).diff(created, 'days');

    if(diff_days<=0){
		swal('Verifica que tus fechas sean correctas');
	}else{
        validateBranches();
	}


}

function showError() {
    swal({
        type: 'error',
        title:'Error'
    });
}

function showSuccess() {
    swal({
        type: 'success',
        title: 'Éxito'
    });
}

function formatDate(date){
	let array_date = date.split('/');
	return `${array_date[2]}/${array_date[1]}/${array_date[0]}`;
}


$.validate({
    form: '#form_promotion',
    lang: 'es',
    onError: () => {
        return false;
    },
    onSuccess: () => {
    	validateDates();
        return false;
    }
});