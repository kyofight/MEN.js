@libraries=customers, common
Feature: Customers

  Scenario: Get customer by id
    When customers - I try to get a customer with id "58242673400d450e25f933f1"
    Then common - I should get "positive" response

