Feature: Cancel payment validation
  This feature is to demonstrate how to validate the payment cancellation flow on servicing portal
  Creates a payment with sanctions data to hit bridger so that payment holds at Accepted status
  Payment cancellation is not possible when payment status is Delivered or Cancelled
  This feature also validates payment listing and payment details pages

  Scenario Outline: Validate cancel payment journey

    Given I launch the myca login page
    When I login to myca using username "<clientUserName>" and password "<password>" using pin "<pinOrPassword>"
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
    When I launch the servicing portal login page using "<url>" with "<opsUserName>" and "<opsPassword>"
    And I login to servicing portal using username "<opsUserName>" and password "<opsPassword>"
    And I click on payment listing button
    Then I should navigate to payment listing page
    When I search for the payment
    Then I select a payment by clicking on payment reference from list
    And Position covered and Sanction cleared events should be received
    When I click on cancel payment button
    And Select a reason for cancellation "<reasonForCancellation>"
    And I click on submit cancel payment button
    Then I should see "The payment has been successfully canceled." message and status as "Canceled"

  @e1
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                  |
      | ncl523752      | flower1234 | 1111          | Vega-SIT      | 1000.00       |               | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-dev.aexp.com/hub |

  @e2DailyExecution
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | aren693716     | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2PaymentDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | aren241435     | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2PricingDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | aren534439     | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2FundingDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | ar302048       | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2ClientDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | Aren102689     | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2RecipientDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | cbp685707      | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2SettlementDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | cbp495213      | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |

  @e2TradingDomain
    Examples:
      | clientUserName | password   | pinOrPassword | recipientName        | paymentAmount | fundingAmount | paymentNotes                      | customerNotes                    | reasonForCancellation | opsUserName          | opsPassword | url                                 |
      | aren230597     | flower1234 | 1111          | End to End Recipient |               | 10.00         | This is for recipient information | This is for customer information | Fraud                 | cbpservicingtestuser | P@$$W0rd    | https://crossborder-qa.aexp.com/hub |
