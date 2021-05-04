Feature: My store account validation
  This feature demonstrates how to validate updating users personal information

  Scenario Outline: Validate user is able to update the personal information

    Given I navigate to the home page
    When I click on Sign In Link
    And I enter the "<userName>" and "<password>"
    Then I should login successfully
    When I click on my personal information
    And I update the first name as "<firstName>"
    And I update the current password "<password>" and new password "<newPassword>"
    And I click save button
    Then The update should be successful

  @example
    Examples:
      | userName                      | password | newPassword | firstName |
      | chris_adam_turner@hotmail.com | testing  | testing     | user      |

  Scenario Outline: Validate user is able to update their addresses

    Given I navigate to the home page
    When I click on Sign In Link
    And I enter the "<userName>" and "<password>"
    Then I should login successfully
    When I click on my addresses
    And I click on update button
    And I update the city as "<city>"
    And I click save button
    Then The address should be updated

  @example
    Examples:
      | userName                      | password | city           |
      | chris_adam_turner@hotmail.com | testing  | Haywards Heath |
