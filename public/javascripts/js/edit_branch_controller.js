var map, latitude, longitude;

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
        error: (err) => {
            console.error(err);
        }
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
            $('#address_d').val(data.address);
        },
        error: (err) => {
            console.error(err);
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}


$( document ).ready( () => {
    get_branch(35);
});

$('#address_d').change( () => {

    getAddress($('#address_d').val());
});

function renderInputsText(branch) {

    $('#name').val(branch.name);
    $('#name').focus();
    $('#address_d').val(branch.address);
}

function renderMap(branch) {

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
        draggable: true,
        dragend: (event) => {
            latitude =  event.latLng.lat();
            longitude =  event.latLng.lng();
            getAddressReverse(latitude, longitude)
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
                map.setCenter(latlng.lat(), latlng.lng());
            } else {

            }
        }
    })
}

