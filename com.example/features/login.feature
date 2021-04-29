Feature: validation

  @exampless
  Scenario: validation
    Given I navigate to the home page
    When I get the page title
    Then The page title should be matched
    When I click on the dresses link
