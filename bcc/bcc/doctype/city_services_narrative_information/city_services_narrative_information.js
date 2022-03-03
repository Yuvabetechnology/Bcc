// Copyright (c) 2022, Yuvabe and contributors
// For license information, please see license.txt

frappe.ui.form.on('City Services Narrative Information', {

	setup(frm) {
//duplicate income source
	frm.contact_person_duplicate = function(frm,row,){
		
		frm.doc.contact_persons.forEach(d =>{
			if(row.person_name =='' || row.idx == d.idx){
				console.log("pass")

			}else{
				if(row.person_name == d.person_name){
					row.person_name = '';
					frappe.msgprint(`${d.person_name} already exists`);
					frm.refresh_field('contact_persons');
				}
			}
			});

	}

	},
	//refresh

	refresh: function(frm) {
		if (frm.is_new()) {
			frappe.call({
				method: "bcc.bcc.doctype.city_services_narrative_information.city_services_narrative_information.get_budget_application",
				callback: function(r) {
					console.log(r.message[0].name);
					frappe.set_route("Form", "City Services Narrative Information", r.message[0].name);
				}
			});
		}
	}
});



frappe.ui.form.on('Contact Persons', {
	person_name: function(frm, cdt, cdn) {
		
		let row = locals[cdt][cdn];
		frm.contact_person_duplicate(frm,row,row.person_name);
	},
	contact_number:function(frm, cdt, cdn){
		let row = locals[cdt][cdn];
		if(row.contact_number.length != 10){
			row.contact_number = '';
			frappe.msgprint(`${row.contact_number} is not a valid number`);
			frm.refresh_field('contact_persons');
		}
	},
	email:function(frm, cdt, cdn){
		let row = locals[cdt][cdn];
		if(!row.email.includes('@')){
			row.email = '';
			frappe.msgprint(`${row.email} is not a valid email`);
			frm.refresh_field('contact_persons');
		}
	}

})
// frappe.ui.form.on('City Services Narrative Information','organization_email', function(frm){

// 	if(!frm.doc.organization_email.includes('@')){
// 		frm.set_value("organization_email", '');
// 		frm.refresh_field('organization_email');
// 	}
// 	console.log(frm.doc.organization_email)
// })