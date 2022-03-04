# Copyright (c) 2022, Yuvabe and contributors
# For license information, please see license.txt
import frappe
from frappe.utils import now
from frappe.website.website_generator import WebsiteGenerator

class BudgetRequest(WebsiteGenerator):
	def validate(self):
		if not self.request_owner:
			
			self.owner = self.get_doc_owner(self.budget_application)
			self.request_owner = self.get_doc_owner(self.budget_application)
			self.created_on = now()
		else:
			frappe.msgprint("Document Updated Successfully")
			self.modified_on = now()
			self.owner = self.get_doc_owner(self.budget_application)
			self.modified_by = frappe.session.user
	
			
	def get_doc_owner(self, doctype):
		data = frappe.get_doc("City Services Narrative Information", doctype)
		frappe.msgprint(data.owner)
		return data.owner

		
	

@frappe.whitelist(allow_guest=True)
def get_application():
	print("****")
	print(frappe.session.user)	
	applications = frappe.get_all("City Services Narrative Information", filters={"owner": frappe.session.user}, fields=["applicant_name"])
	return applications
@frappe.whitelist(allow_guest=True)
def av_maintenance_costing():
	costing = frappe.getSingle('Budget Settings')
	return costing.av_maintenance_costing