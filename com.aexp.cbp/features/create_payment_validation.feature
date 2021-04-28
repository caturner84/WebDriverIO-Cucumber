Feature: Create payment validation
  This feature is to demonstrate how to validate the create payment end to end journey

  Scenario Outline: Validate create payment end to end journey

    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should navigate to home page
    When I click on create payment menu item
    Then I should navigate to create payment page using pin "<pinOrPassword>"
    When I select the recipient "<recipientName>"
    Then Pricing module should be rendered
    When I select funding account
    And I enter the quote request details as below to generate a quote
      | paymentAmount   | fundingAmount   |
      | <paymentAmount> | <fundingAmount> |
    Then I should get the successful quote summary
    And Payment module should be rendered
    When I enter "<paymentNotes>" and "<customerNotes>"
    And I click on accept payment button
    Then I should navigate to payment confirmation page
    When I navigate to the payment history page
    And I click to expand a payment
    Then I should see a summary of the payment details on payment history
    When I click on see payment details for the selected payment on payment history
    Then I can view the payment details
    And I should see a payment status as "<paymentStatus>"

  @e1
    Examples:
      | userName  | password   | pinOrPassword | recipientName | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | ncl523752 | flower1234 | 1111          | Vega-SIT      | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2DailyExecution
    Examples:
      | userName   | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | aren693716 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2PaymentDomain
    Examples:
      | userName   | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | aren241435 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2PricingDomain
    Examples:
      | userName   | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | aren534439 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2FundingDomain
    Examples:
      | userName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | ar302048 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2ClientDomain
    Examples:
      | userName   | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | Aren102689 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2RecipientDomain
    Examples:
      | userName  | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | cbp685707 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2SettlementDomain
    Examples:
      | userName  | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | cbp495213 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |

  @e2TradingDomain
    Examples:
      | userName   | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | paymentStatus |
      | aren230597 | flower1234 | 1111          | End to End Recipient | 1000.00       |               | This is for recipient information | This is for customer information | Processing    |
