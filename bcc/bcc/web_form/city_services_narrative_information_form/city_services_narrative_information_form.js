frappe.ready(function() {
	frappe.web_form.add_button_to_header(" Sumbit","",function () {
	if(!frappe.web_form.doc.name){
		frappe.msgprint(" You Must save the Docment Before Submit")
	}else{
		console.log(frappe.web_form)
		frappe.msgprint(frappe.web_form.doc.name)
		frappe.call({
			"method": "frappe.client.submit",
			"args": {
				  "doc": frappe.web_form.doc,
				  
			}
		})
	}


	});
// application from filter 
frappe.web_form.set_query("budget_application", function() {
	return {
		filters: {
			"Status":"Submitted"
		}
			
		
	};
});
	  
})