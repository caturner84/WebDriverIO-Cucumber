Feature: FIS Sierra Configuration 2 validation
  This feature is to demonstrate how to validate the FIS Sierra configuration screens

  Background:
    Given I launch the sierra login page
    When I login to sierra using username and password
      | userName | password |
      | Caturner | P@$$W0rd |
    Then I should navigate to sierra home page

  Scenario Outline: Validate currency tab

    When I click on currencies menu item
    Then I should see the correct number of currencies "<noOfCurrencies>"
    And The table should contain available currencies

  @fise0 @fise1 @fise2
    Examples:
      | noOfCurrencies |
      | 12             |

  Scenario Outline: Validate currency pairs tab

    When I click on currencies menu item
    And I click on currency pairs menu item
    Then I should see the correct number of currency pairs "<noOfCurrencyPairs>"
    And The table should contain available currency pairs

  @fise0
    Examples:
      | noOfCurrencyPairs |
      | 12                |

  @fise1 @fise2
    Examples:
      | noOfCurrencyPairs |
      | 11                |

  Scenario Outline: Validate currency pair groups tab

    When I click on currencies menu item
    And I click on currency pair groups menu item
    Then I should see all options in currency pair groups name dropdown
    And I should see the correct number of pair groups "<noOfCurrencyPairGroups>"
    And The table should contain available pair groups

  @fise0 @fise1 @fise2
    Examples:
      | noOfCurrencyPairGroups |
      | 11                     |

  Scenario Outline: Validate currency group tab

    When I click on currencies menu item
    And I click on currency group menu item
    Then I should see all options in currency group name dropdown
    And I should see the correct number of currency groups "<noOfCurrencyGroups>"
    And The table should contain available currency groups

  @fise0 @fise1 @fise2
    Examples:
      | noOfCurrencyGroups |
      | 12                 |
