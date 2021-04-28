Feature: FIS Sierra Configuration 1 validation
  This feature is to demonstrate how to validate the FIS Sierra configuration screens

  Background:
    Given I launch the sierra login page
    When I login to sierra using username and password
      | userName | password |
      | Caturner | P@$$W0rd |
    Then I should navigate to sierra home page

  @fise0 @fise1 @fise2
  Scenario: Validate rates set

    When I click on rates set menu item

  Scenario Outline: Validate CFE Type Definition

    When I click on CFE Types Definition menu item
    Then I should see the correct number of CFE Type Definitions "<noOfCfeTypeDefinitions>"
    And The table should contain available CFE Type Definitions

  @fise0 @fise1 @fise2
    Examples:
      | noOfCfeTypeDefinitions |
      | 2                      |

  Scenario Outline: Validate Entity Definition

    When I click on Entity Definition menu item
    Then I should see the correct number of Entity Definitions "<noOfEntityDefinitions>"
    And The table should contain available Entity Definitions

  @fise0
    Examples:
      | noOfEntityDefinitions |
      | 22                    |

  @fise1
    Examples:
      | noOfEntityDefinitions |
      | 10                    |

  @fise2
    Examples:
      | noOfEntityDefinitions |
      | 9                     |

  Scenario Outline: Validate Settlement Instructions

    When I click on Settlement Instructions menu item
    Then I should see the correct number of Settlement Instructions "<noOfSettlementInstructions>"
    And The table should contain available Settlement Instructions

  @fise0
    Examples:
      | noOfSettlementInstructions |
      | 33                         |

  @fise1
    Examples:
      | noOfSettlementInstructions |
      | 30                         |

  @fise2
    Examples:
      | noOfSettlementInstructions |
      | 30                         |

  Scenario Outline: Validate Purpose Code

    When I click on Purpose Code menu item
    Then I should see the correct number of Purpose Code "<noOfPurposeCode>"
    And The table should contain available Purpose Code

  @fise0
    Examples:
      | noOfPurposeCode |
      | 11              |

  @fise1
    Examples:
      | noOfPurposeCode |
      | 6               |

  @fise2
    Examples:
      | noOfPurposeCode |
      | 7               |

  Scenario Outline: Validate Book Definition

    When I click on Book Definition menu item
    Then I should see the correct number of Book Definition "<noOfBookDefinition>"
    And The table should contain available Book Definition
    And I should see the correct number of Desk "<noOfDesk>"
    And The table should contain available Desk

  @fise0
    Examples:
      | noOfBookDefinition | noOfDesk |
      | 12                 | 12       |

  @fise1
    Examples:
      | noOfBookDefinition | noOfDesk |
      | 2                  | 2        |

  @fise2
    Examples:
      | noOfBookDefinition | noOfDesk |
      | 4                  | 4        |

  Scenario Outline: Validate Accounting Entry Setup

    When I click on Accounting Entry Setup menu item
    Then I should see the correct number of Accounting Entry Setup "<noOfAccountingEntrySetup>"
    And The table should contain available Accounting Entry Setup

  @fise0
    Examples:
      | noOfAccountingEntrySetup |
      | 18                       |

  @fise1
    Examples:
      | noOfAccountingEntrySetup |
      | 15                       |

  @fise2
    Examples:
      | noOfAccountingEntrySetup |
      | 15                       |

  Scenario Outline: Validate Accounting Code Definition

    When I click on Accounting Code Definition menu item
    And I select Account Number Mapping checkbox
    Then I should see the correct number of Account Number Mappings "<noOfAccountNumberMappings>" "<totalCount>"

  @fise0 @fise1
    Examples:
      | noOfAccountNumberMappings | totalCount          |
      | 100                       | View 1 - 100 of 145 |

  @fise2
    Examples:
      | noOfAccountNumberMappings | totalCount          |
      | 100                       | View 1 - 100 of 156 |
