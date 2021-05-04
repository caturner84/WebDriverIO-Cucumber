Feature: My store checkout validation
  This feature demonstrates how to validate the checkout product journey

  Scenario Outline: Validate that user is able to order product

    Given I navigate to the home page
    When I click on Sign In Link
    And I enter the "<userName>" and "<password>"
    Then I should login successfully
    When I search for a product using "<productName>" and the search button
    Then I should navigate to the search results page
    When I add the product to cart
    And I click on proceed to check out
    Then I should navigate to the cart summary page
    When I proceed to checkout the product
    Then I should be able to order the product successfully
    When I click on back to orders
    Then The order history should be displayed
#   And validate order reference is displayed in order history

  @example
    Examples:
      | userName                      | password | productName |
      | chris_adam_turner@hotmail.com | testing  | t-shirt     |
