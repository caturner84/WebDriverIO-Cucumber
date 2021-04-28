Feature: Creat Payment integration validation on CAP page
  This feature is to demonstrate how to validate the integration for each domain represented on the cap page

  Scenario Outline: Validate Client domain journey

    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should navigate to home page
    When I click on create payment menu item
    Then I should navigate to create payment page using pin "<pinOrPassword>"

  @ClientDomain
    Examples:
      | userName  | password   | pinOrPassword |
      | ncl523752 | flower1234 |               |

  Scenario Outline: Validate Recipient domain journey

    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should navigate to home page
    When I click on create payment menu item
    Then I should navigate to create payment page using pin "<pinOrPassword>"
    When I select the recipient "<recipientName>"
    Then Pricing module should be rendered

  @RecipientDomain
    Examples:
      | userName  | password   | pinOrPassword | recipientName |
      | ncl523752 | flower1234 |               | Vega-SIT      |

  Scenario Outline: Validate Funding domain journey

    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should navigate to home page
    When I click on create payment menu item
    Then I should navigate to create payment page using pin "<pinOrPassword>"
    When I select the recipient "<recipientName>"
    Then Pricing module should be rendered
    And I select funding account

  @FundingDomain
    Examples:
      | userName  | password   | pinOrPassword | recipientName |
      | ncl523752 | flower1234 |               | Vega-SIT      |

  Scenario Outline: Validate pricing domain journey

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

  @PricingDomain
    Examples:
      | userName  | password   | pinOrPassword | recipientName | paymentAmount | fundingAmount |
      | ncl523752 | flower1234 |               | Vega-SIT      | 1000.00       |               |
