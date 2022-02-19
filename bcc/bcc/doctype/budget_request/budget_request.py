# Copyright (c) 2022, Yuvabe and contributors
# For license information, please see license.txt
import frappe
from frappe.utils import now
from frappe.website.website_generator import WebsiteGenerator

class BudgetRequest(WebsiteGenerator):
	def validate(self):
		if not self.request_owner:
			frappe.msgprint("Please select the request owner")
			self.request_owner = frappe.session.user
			self.created_on = now()
		else:
			frappe.msgprint("Document Updated Successfully")
			self.modified_on = now()
			self.modified_by = frappe.session.user
	
			


		
	

@frappe.whitelist(allow_guest=True)
def get_application():
	print("****")
	print(frappe.session.user)	
	applications = frappe.get_all("City Services Narrative Information", filters={"owner": frappe.session.user}, fields=["applicant_name"])
	return applications
