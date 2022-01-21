from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in bcc/__init__.py
from bcc import __version__ as version

setup(
	name="bcc",
	version=version,
	description="Budget Coordination Committee",
	author="Yuvabe",
	author_email="tech@yuvabe.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
