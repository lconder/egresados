var map, latitude, longitude;
let name_input = $('#name');
let address_input = $('#address_d');

let edit_branch = () => {

    let name = name_input.val();
    let address = address_input.val();

    let editData = {name, address, latitude, longitude};

    $.ajax({
        method: 'PUT',
        url : `/branch/${id_branch}`,
        data: JSON.stringify(editData),
        success: () => {
            showSuccess();
        },
        error: () => {
            showError()
        },
        dataType: 'json',
        contentType: 'application/json'

    });

};

var get_branch = (id) => {

    $.ajax({
        method: 'GET',
        url: `/branch/${id}`,
        beforeSend: () => {

        },
        success: (data) => {
            renderInputsText(data.branch);
            renderMap(data.branch);
        },
        error: () => {
            showError();
        },
        dataType: 'json',
        contentType: 'application/json'
    });

};

var getAddressReverse = (lat, lng) => {

    let coordinates = {lat, lng};
    $.ajax({
        method: 'POST',
        url: '/branch/address/',
        data: JSON.stringify(coordinates),
        beforeSend: () => {
        },
        success: (data) => {
            address_input.val(data.address);
        },
        error: () => {
            showError();
        },
        dataType: 'json',
        contentType: 'application/json'
    });
};


$( document ).ready( () => {
    get_branch(id_branch);
});

address_input.change( () => getAddress(address_input.val()));

function renderInputsText(branch) {

    name_input.val(branch.name);
    name_input.focus();
    address_input.val(branch.address);
}

function renderMap(branch) {

    latitude = branch.latitude;
    longitude = branch.longitude;

    map = new GMaps({
        div: '#map',
        zoom: 15,
        lat: branch.latitude,
        lng: branch.longitude
    });

    addDraggableMarker(branch.latitude, branch.longitude);
}

function addDraggableMarker(lat, lng) {

    map.addMarker({
        lat: lat,
        lng: lng,
        icon: '/images/marker.png',
        draggable: true,
        dragend: (event) => {
            latitude =  event.latLng.lat();
            longitude =  event.latLng.lng();
            getAddressReverse(latitude, longitude);
        }
    })

}

function loadMap() {
    map = new GMaps({
        div: '#map'
    });
}

function getAddress(address){
    loadMap();
    GMaps.geocode({
        address: address,
        callback: (results, status) => {
            if(status == 'OK') {
                let latlng = results[0].geometry.location;
                latitude = latlng.lat();
                longitude = latlng.lng();
                map.setCenter(latlng.lat(), latlng.lng());
                addDraggableMarker(latlng.lat(), latlng.lng());
            } else {

            }
        }
    })
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

$.validate({
    form: '#form_branch',
    lang: 'es',
    onError: () => {
        return false;
    },
    onSuccess: () => {
        edit_branch();
        return false;
    }
});