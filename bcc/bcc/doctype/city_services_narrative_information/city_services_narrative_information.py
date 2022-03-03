# Copyright (c) 2022, Yuvabe and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.utils import now
from frappe.website.website_generator import WebsiteGenerator

class CityServicesNarrativeInformation(WebsiteGenerator):
	def validate(self):
		self.created_by = frappe.session.user
		self.created_on = now()

@frappe.whitelist()
def get_budget_application():
	budget_application = frappe.get_list("City Services Narrative Information", filters={'docstatus': '0'})
	return budget_application