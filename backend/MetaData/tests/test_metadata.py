from unittest import skip
from rest_framework import status
from rest_framework.test import APITestCase

from MetaData.tests.mixins import MetadataMixin
from Users.tests import UserMixing

class MetadataApiTest(APITestCase, MetadataMixin, UserMixing):

	def setUp(self):
		self.user = self.create_user()
		self.base_url = '/api/metadata/'

	def tearDown(self) -> None:
		self.client.credentials() # Reset credentials
		return super().tearDown()

	def test_get_metadata(self):
		self.populate_metadata(3)
		res = self.client.get(self.base_url)
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data), 3)
	
	def test_get_metadata_paginated(self):
		self.populate_metadata(3)
		res = self.client.get(self.base_url+'?page=1&page_size=10')
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data['results']), 3)
	
	def test_get_metadata_empty_if_not_approved(self):
		self.populate_metadata(3, False)
		res = self.client.get(self.base_url)
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data), 0)

	def test_search_metadata(self):
		self.populate_metadata(15)
		res = self.client.get(self.base_url+'?search=1&page=1&page_size=20')
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data['results']), 7)

	def test_create_metadata_valid_user(self):
		iptc = self.ensure_iptc()
		auth = self.login_user()
		self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth.data['token'])
		res = self.client.post(self.base_url, [{
            "value": "This is not a title",
            "metadata": iptc.id,
        }])
		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
	
	def test_create_metadata_as_guest(self):
		iptc = self.ensure_iptc()
		copy_data = self.user_data.copy()
		copy_data["email"] = "user2@leit.cl"
		guest = self.create_guest(copy_data)
		auth = self.get_auth_token(guest)
		self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth)
		res = self.client.post(self.base_url, [{
            "value": "This is not a title",
            "metadata": iptc.id,
        }])
		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
	
	def test_create_metadata_rejected(self):
		iptc = self.ensure_iptc()
		res = self.client.post(self.base_url, [{
            "value": "This is not a title",
            "metadata": iptc.id,
        }])
		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
	
	@skip('Not yet tested')
	def test_get_one_metadata(self):
		pass

	@skip('Not yet tested')
	def test_merge_metadata(self):
		pass

	@skip('Not yet tested')
	def test_get_metadata_batch(self):
		pass

	@skip('Not yet tested')
	def test_edit_metadata(self):
		pass
	

