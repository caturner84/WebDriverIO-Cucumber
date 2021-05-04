Feature: My store search validation
  This feature demonstrates how to validate the search functionality

  Scenario Outline: validate when the search returns no products
    Given I navigate to the home page
    When I search for a product using "<searchValue>" and the search button
    Then I should see a message showing there are no results

  @example
    Examples:
      | searchValue |
      | abc         |

  Scenario Outline: validate when the search returns products
    Given I navigate to the home page
    When I search for a product using "<searchValue>" and the search button
    Then I should navigate to the search results page

  @example
    Examples:
      | searchValue |
      | t-shirt     |
