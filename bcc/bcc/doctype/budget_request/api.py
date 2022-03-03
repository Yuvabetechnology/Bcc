import frappe

@frappe.whitelist(allow_guest=True)
def get_budget_settings():
    budget_settings = frappe.get_doc("Budget Settings")
    return budget_settings.as_dict()
    
@frappe.whitelist(allow_guest=True)
def get_application_catagory(doc_name):
    application_catagory = frappe.get_doc("City Services Narrative Information", doc_name, fields=['category'])
    return application_catagory.as_dict()