Feature: To validate recipient user journeys

  Scenario Outline: User can pay a recipient from the Recipient Details page
    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should navigate to home page
    When I click on create payment menu item
    Then I should navigate to create payment page using pin "<pinOrPassword>"
    When I click on Add a New Recipient
    Then I should navigate to the Create Recipient page
    When I fill in the form and create a recipient "<recipientName>"
    Then I should navigate to create payment page using pin "<pinOrPassword>"
    And The recipient search dropdown will be populated with "<recipientName>"
    And I can delete the recipient "<recipientName>"

  @e1
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | tdim489965 | 1111          | flower1234 | EndToEnd Test |

  @e2DailyExecution
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | aren693716 | 1111          | flower1234 | EndToEnd Test |

  @e2PaymentDomain
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | aren241435 | 1111          | flower1234 | EndToEnd Test |

  @e2PricingDomain
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | aren534439 | 1111          | flower1234 | EndToEnd Test |

  @e2FundingDomain
    Examples:
      | userName | pinOrPassword | password   | recipientName |
      | ar302048 | 1111          | flower1234 | EndToEnd Test |

  @e2ClientDomain
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | Aren102689 | 1111          | flower1234 | EndToEnd Test |

  @e2RecipientDomain
    Examples:
      | userName  | pinOrPassword | password   | recipientName |
      | cbp685707 | 1111          | flower1234 | EndToEnd Test |

  @e2SettlementDomain
    Examples:
      | userName  | pinOrPassword | password   | recipientName |
      | cbp495213 | 1111          | flower1234 | EndToEnd Test |

  @e2TradingDomain
    Examples:
      | userName   | pinOrPassword | password   | recipientName |
      | aren230597 | 1111          | flower1234 | EndToEnd Test |
