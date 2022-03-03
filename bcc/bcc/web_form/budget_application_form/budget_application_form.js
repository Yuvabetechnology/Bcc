frappe.ready(function() {
	// bind events here

    frappe.web_form.after_load = () => {

        // init script here
	
        // validate email
        frappe.web_form.on('organization_email', (field, value)=>{
          if (!value.includes('@')){
            frappe.throw(__('Invalid Email'))
          }
        });
        // end

        // general validation
        frappe.web_form.validate = () => {
            let data = frappe.web_form.get_values();
            if(!data.email.includes('@')){
              frappe.msgprint("Please enter a valid email");
              return false;
            }
            return true;
        };
        // end
    }
})
