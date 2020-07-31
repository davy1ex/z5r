function create_access_settings_div() {
    settings_access = get_settings_access()
    
    if (settings_access[0].mode == "1") {
        $('#option-one').prop("checked", 1);        
    }

    if (settings_access[0].mode == "2") {
        $('#option-two').prop("checked", 1);        
    }

    if (settings_access[0].mode == "3") {
        $('#option-three').prop("checked", 1);        
    }

    if (settings_access[0].mode == "4") {
        $('#option-four').prop("checked", 1);        
    }

    let tab1 = document.getElementById("tab1");
    let tab2 = document.getElementById("tab2");
    let tab3 = document.getElementById("tab3");
    let tab4 = document.getElementById("tab4");

    let content_h2_1 = document.getElementsByClassName("content_h2_1")[0];
    let content_h2_2= document.getElementsByClassName("content_h2_2")[0];
    let content_h2_3 = document.getElementsByClassName("content_h2_3")[0];
    let content_h2_4 = document.getElementsByClassName("content_h2_4")[0];

    if (settings_access[0].point_type == "1") {
        $('#option-one-door').prop("checked", 1);
        tab1.setAttribute('checked','test13');
        tab1.removeAttribute("disabled");

        tab2.removeAttribute("checked");
        tab3.removeAttribute("checked");
        tab4.removeAttribute("checked");
        tab2.setAttribute('disabled','test1');
        tab3.setAttribute('disabled','test2');
        tab4.setAttribute('disabled','test3');

        content_h2_2.style.display = "none";
        content_h2_3.style.display = "none";
        content_h2_4.style.display = "none";
        content_h2_1.style.display = "block";
    }
    if (settings_access[0].point_type == "2") {
        $('#option-two-door').prop("checked", 1);
        tab2.setAttribute('checked','test14');
        tab2.removeAttribute("disabled");

        tab3.removeAttribute("checked");
        tab1.removeAttribute("checked");
        tab4.removeAttribute("checked");
        tab1.setAttribute('disabled','test4');
        tab3.setAttribute('disabled','test5');
        tab4.setAttribute('disabled','test6');

        content_h2_1.style.display = "none";
        content_h2_3.style.display = "none";
        content_h2_4.style.display = "none";
        content_h2_2.style.display = "block";
    }
    if (settings_access[0].point_type == "3") {
        $('#option-three-tab').prop("checked", 1);     
        
        tab3.setAttribute('checked','test15');
        tab3.removeAttribute("disabled");

        tab2.removeAttribute("checked");
        tab1.removeAttribute("checked");
        tab4.removeAttribute("checked");
        tab2.setAttribute('disabled','test7');
        tab1.setAttribute('disabled','test8');
        tab4.setAttribute('disabled','test9');

        content_h2_2.style.display = "none";
        content_h2_1.style.display = "none";
        content_h2_4.style.display = "none";
        content_h2_3.style.display = "block";   
    }
    if (settings_access[0].point_type == "4") {
        $('#option-four-tab').prop("checked", 1);        

        tab4.setAttribute('checked','test16');
		tab4.removeAttribute("disabled");

		tab2.removeAttribute("checked");
		tab1.removeAttribute("checked");
		tab3.removeAttribute("checked");
		tab2.setAttribute('disabled','test10');
		tab3.setAttribute('disabled','test11');
		tab1.setAttribute('disabled','test12');


		content_h2_2.style.display = "none";
		content_h2_1.style.display = "none";
		content_h2_3.style.display = "none";
		content_h2_4.style.display = "block";
    }




    if (settings_access[0].server_sync == "0") {
        $('#set_active').prop("checked", 0);        
    }
    if (settings_access[0].server_sync == "1") {
        $('#set_active').prop("checked", 1);        
    }

}