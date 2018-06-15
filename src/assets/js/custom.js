$(document).ready(function () {
   
    $(".required").after("<span class='red'>*</span>");

    // $('input').on('ifChecked', function (event) {
    $('input').on('click', function (event) {       
        var radioValue = $("input[name='rdoUserInfo']:checked").val();
        /*if (radioValue == "owner") {
            $('#owner_form').show();
            $('#rera_id').hide();
        }
        else if(radioValue == "builder"){
            $('#owner_form').hide();
            $('#rera_id').show();
        }
        else{
            $('#owner_form').hide();
            $('#rera_id').hide();
        }*/
        console.log("rdoUserInfo",radioValue);
        var optservice = $("input[name='optservice']:checked").val();
        console.log("optservice", optservice);
        if (optservice == "select_date") {
            $('.select_date').show();
        }
        else {
            $('.select_date').hide();
        }
        var radioValueforPropInfo = $("input[name='propfor']:checked").val();
        console.log("radioValueforPropInfo",radioValueforPropInfo);
        //radioValueforPropInfo = "sdfsd";
        if (radioValueforPropInfo == "3") {
            
            $('#propertyInfo').append($("<option>", { value: 'Paying Guest', html: 'Paying Guest' }));
            $('#propertyInfo').val('Paying Guest');         
            $('#propertyInfo').prop('disabled', 'disabled');
            /*$("#residential_plot").hide();
            $('#paying_guest').show();
            $("#commercial_office").hide();
            $('#Multistorey_apt').hide();
            $("#Builder_floor_apt").hide();
            $("#Residential_house").hide();
            $('#Villa').hide();
            $('#Penthouse').hide();
            $('#StudioApartment').hide();
            $('#commercial_shop').hide();
            $('#commercial_showroom').hide();
            $('#commercial_land').hide();
            $('#warehouse_godown').hide();
            $('#Industrial_land').hide();
            $('#Industrial_building').hide();
            $('#Industrial_shed').hide();
            $('#IT_Park_SEZ').hide();
            $('#Agricultural_land').hide();
            $('#Farm_house').hide();
            $('#service_apt').hide();
            $('#Hostel').hide();
            $('#Co-working_space').hide();*/
        }
        else if(radioValueforPropInfo == "2"){
            //alert("rent");
            //$('#propertyInfo optgroup[label="ALL RESIDENTIAL"]').append($("<option>",{value:'Service Apartment', html:'Service Apartment'}));
            if ($('#propertyInfo option[value="service_apt"]').length == 0) {
                $('#propertyInfo option[value="Villa"]').after($("<option>", { value: 'service_apt', html: 'Service Apartment' }));
            }
            if($('#propertyInfo option[value="Hostel"]').length == 0){
                $('#propertyInfo option[value="Studio Apartment"]').after($("<option>",{value:'Hostel', html:'Hostel'}));
            }
            if($('#propertyInfo option[value="Co-working Space"]').length == 0){
                $('#propertyInfo option[value="IT_Park_SEZ"]').after($("<option>", { value: 'Co-working Space', html: 'Co-working Space' }));
            }           
            $('#propertyInfo option[value="Residential Plot"]').remove();           
            $('#propertyInfo option[value="Paying Guest"]').remove();                       
            $('#propertyInfo').prop('disabled', false);
            /*$('#paying_guest').hide();*/
        }
        else if(radioValueforPropInfo == "1"){
            $('#propertyInfo option[value="Service Apartment"]').remove();
            $('#propertyInfo option[value="Hostel"]').remove();
            $('#propertyInfo option[value="Co-working Space"]').remove();
            console.log($('#propertyInfo option[value="Residential Plot"]').length);
            if($('#propertyInfo option[value="Residential Plot"]').length == 0){
                $('#propertyInfo option[value="Villa"]').after($("<option>",{value:'Residential Plot', html:'Residential Plot'}));
            }           
            $('#propertyInfo option[value="Paying Guest"]').remove();                       
            $('#propertyInfo').prop('disabled', false);
            /*$('#paying_guest').hide();*/
        }       
    });

    $('input').on('click', function (event) {
        var radioValueforPossesion = $("input[name='possession_status']:checked").val();
        
        if(radioValueforPossesion  == "ready_to_move"){
            $('.age_of_const').show();
            $('.Available_From').hide();
        }
        else if(radioValueforPossesion  == "under_const"){
            $('.age_of_const').hide();
            $('.Available_From').show();
        }
    });

    /*$("#locality").on('input', function (e) {        
        console.log($('#enter_locality').val());
        // var userText = $(this).val();
        // $("#locality").find("option").each(function () {
            // if ($(this).val() == userText) {
                $('#project_name').show();
                $('#area').show();
                $('#address').show();
            // }            
        // })
    });*/

    $('select').on('change', function () {
        var proptype = $("#propertyInfo option:selected").text();
        console.log("proptype", proptype);
        proptype = "sdfsdf";
        //if (proptype == "Residential Plot") {
        //    $("#residential_plot").show();
        //}
        //else {
        //    $("#residential_plot").hide();
        //}
        switch(proptype){
            case "5":
                $("#residential_plot").show();
                $("#commercial_office").hide();
                $('#Multistorey_apt').hide();
                $("#Builder_floor_apt").hide();
                $("#Residential_house").hide();
                $('#paying_guest').hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                    break;
            case "8":
                $("#commercial_office").show();
                $("#residential_plot").hide();
                $('#Multistorey_apt').hide();
                $("#Builder_floor_apt").hide();
                $("#Residential_house").hide();
                $('#paying_guest').hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "1":
                $('#Multistorey_apt').show();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $("#Builder_floor_apt").hide();
                $("#Residential_house").hide();
                $('#paying_guest').hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "2":
                $("#Builder_floor_apt").show();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $("#Residential_house").hide();
                $('#paying_guest').hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "3":
                $("#Residential_house").show();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#paying_guest').hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "Paying Guest":
                $('#paying_guest').show();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Villa').hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "4":
                $('#Villa').show();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Penthouse').hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "6":
                $('#Penthouse').show();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#StudioApartment').hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "7":
                $('#StudioApartment').show();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#commercial_shop').hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "10":
                $('#commercial_shop').show();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#commercial_showroom').hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "11":
                $('#commercial_showroom').show();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#commercial_land').hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "12":
                $('#commercial_land').show();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#warehouse_godown').hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "13":
                $('#warehouse_godown').show();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Industrial_land').hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "14":
                $('#Industrial_land').show();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Industrial_building').hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "15":
                $('#Industrial_building').show();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Industrial_shed').hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "16":
                $('#Industrial_shed').show();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#IT_Park_SEZ').hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "9":
                $('#IT_Park_SEZ').show();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Agricultural_land').hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "17":
                $('#Agricultural_land').show();
                $('#IT_Park_SEZ').hide();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Farm_house').hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "18":
                $('#Farm_house').show();
                $('#Agricultural_land').hide();
                $('#IT_Park_SEZ').hide();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#service_apt').hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "Service Apartment":
                $('#service_apt').show();
                $('#Farm_house').hide();
                $('#Agricultural_land').hide();
                $('#IT_Park_SEZ').hide();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Hostel').hide();
                $('#Co-working_space').hide();
                break;
            case "Hostel":
                $('#Hostel').show();
                $('#service_apt').hide();
                $('#Farm_house').hide();
                $('#Agricultural_land').hide();
                $('#IT_Park_SEZ').hide();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                $('#Co-working_space').hide();
                break;
            case "Co-working Space":
                $('#Co-working_space').show();
                $('#Hostel').hide();
                $('#service_apt').hide();
                $('#Farm_house').hide();
                $('#Agricultural_land').hide();
                $('#IT_Park_SEZ').hide();
                $('#Industrial_shed').hide();
                $('#Industrial_building').hide();
                $('#Industrial_land').hide();
                $('#warehouse_godown').hide();
                $('#commercial_land').hide();
                $('#commercial_showroom').hide();
                $('#commercial_shop').hide();
                $('#StudioApartment').hide();
                $('#Penthouse').hide();
                $('#Villa').hide();
                $('#paying_guest').hide();
                $("#Residential_house").hide();
                $("#Builder_floor_apt").hide();
                $('#Multistorey_apt').hide();
                $("#residential_plot").hide();
                $("#commercial_office").hide();
                break;
        }
    })
    
});


